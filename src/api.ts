export type TodoType = {
  id: number;
  text: string;
  done: boolean;
};

function wait<V>(value: V) {
  return new Promise<V>((resolve) => {
    setTimeout(() => resolve(value), 500);
  });
}

let id = 0;

let todos: TodoType[] = [];

export function fetchTodos() {
  return wait(todos);
}

export async function createTodo(text: string) {
  const newTodo = await wait({ id: ++id, text, done: false } as TodoType);
  todos = [...todos, newTodo];
  return newTodo;
}

export async function toggleTodo(id: number) {
  await wait(true);
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, done: !todo.done } : todo
  );
  return true;
}

export async function removeTodo(id: number) {
  await wait(true);
  todos = todos.filter((todo) => todo.id !== id);
  return true;
}

export async function updateTodoText(id: number, text: string) {
  await wait(true);
  todos = todos.map((todo) => (todo.id === id ? { ...todo, text } : todo));
  return true;
}
