import { todoService } from "./services";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const { isLoading, data } = todoService.list.useQuery();
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
