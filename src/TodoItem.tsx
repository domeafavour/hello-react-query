import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { removeTodo, toggleTodo } from "./api";

type Props = {
  id: number;
  text: string;
  done: boolean;
};

export function TodoItem({ id, text, done }: Props) {
  const queryClient = useQueryClient();
  const toggleMutation = useMutation({
    mutationKey: ["toggleTodo", id],
    mutationFn: toggleTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const removeMutation = useMutation({
    mutationKey: ["removeTodo", id],
    mutationFn: removeTodo,
    // onMutate: () => {
    //   queryClient.setQueryData(["todos"], (prevData: TodoType[]) => {
    //     return prevData.filter((todo) => todo.id !== id);
    //   });
    // },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
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
