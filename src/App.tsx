import { TodoList } from "./TodoList";
import { AddTodo } from "./AddTodo";

function App() {
  return (
    <div className="flex flex-col gap-2 p-2 font-mono m-auto w-2/5">
      <AddTodo />
      <TodoList />
    </div>
  );
}

export default App;
