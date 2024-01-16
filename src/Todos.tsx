import { AddTodo } from './AddTodo';
import { TodoList } from './TodoList';

export function Todos() {
  return (
    <div className="flex flex-col gap-2 p-2 font-mono m-auto w-2/5">
      <AddTodo />
      <TodoList />
    </div>
  );
}
