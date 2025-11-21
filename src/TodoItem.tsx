import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { todoService } from "./services";

type Props = {
  id: number;
  text: string;
  done: boolean;
};

export function TodoItem({ id, text, done }: Props) {
  const queryClient = useQueryClient();

  function revalidate() {
    queryClient.invalidateQueries({
      type: "active",
      queryKey: todoService.list.getKey(),
    });
  }

  const toggleMutation = todoService.toggle.useMutation({
    onSuccess: () => {
      revalidate();
    },
  });

  const removeMutation = todoService.remove.useMutation({
    onSuccess: () => {
      revalidate();
    },
  });

  const loading = toggleMutation.isPending || removeMutation.isPending;

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
      <button
        type="button"
        disabled={loading}
        onClick={() => removeMutation.mutate(id)}
      >
        x
      </button>
    </li>
  );
}
