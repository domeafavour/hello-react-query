import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "./api";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const { isLoading, data } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
  if (isLoading) {
    return <div className="text-black">loading...</div>;
  }
  if (!data) {
    return <div className="text-black">no data</div>;
  }
  return (
    <div className="text-left">
      <ul>
        {data.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
}
