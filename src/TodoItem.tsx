import classNames from "classnames";
import { RemoveTodoButton } from "./RemoveTodoButton";
import { todoService } from "./services";
import { useRevalidateTodoList } from "./useRevalidateTodoList";

type Props = {
  id: number;
  text: string;
  done: boolean;
};

export function TodoItem({ id, text, done }: Props) {
  const revalidate = useRevalidateTodoList();

  const toggleMutation = todoService.toggle.useMutation({
    onSuccess: () => {
      revalidate();
    },
  });

  const loading = toggleMutation.isPending;

  return (
    <li className={classNames("flex", "flex-row", "gap-1", "justify-between")}>
      <span className="flex flex-row gap-1">
        <input
          type="checkbox"
          checked={done}
          disabled={loading}
          onChange={() => {
            toggleMutation.mutateAsync(id);
          }}
        />
        <span className={classNames({ "line-through": done })}>{text}</span>
      </span>
      <RemoveTodoButton todoId={id} />
    </li>
  );
}
