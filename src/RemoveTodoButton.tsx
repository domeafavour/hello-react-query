import { useIsMutating } from "@tanstack/react-query";
import { todoService } from "./services";
import { useRevalidateTodoList } from "./useRevalidateTodoList";

interface Props {
  todoId: number;
}

export type RemoveTodoButtonProps = Props;

export function RemoveTodoButton({ todoId }: Props) {
  const revalidate = useRevalidateTodoList();

  const removeMutation = todoService.remove.useMutation({
    onSuccess: () => {
      revalidate();
    },
  });

  const isMutating = useIsMutating({
    mutationKey: todoService.toggle.getKey(),
  });

  const loading = isMutating > 0 || removeMutation.isPending;

  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => removeMutation.mutate(todoId)}
    >
      x
    </button>
  );
}
