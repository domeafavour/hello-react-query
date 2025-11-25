import { useIsMutating } from "@tanstack/react-query";
import { todoService } from "./services";

interface Props {
  todoId: number;
}

export type RemoveTodoButtonProps = Props;

export function RemoveTodoButton({ todoId }: Props) {
  const removeMutation = todoService.remove.useMutation();

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
