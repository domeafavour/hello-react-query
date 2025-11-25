import { useState } from "react";
import { todoService } from "./services";

export function AddTodo() {
  const mutation = todoService.add.useMutation({});
  const [text, setText] = useState("");
  return (
    <div>
      <form
        className="flex flex-row"
        onSubmit={async (e) => {
          e.preventDefault();
          if (text.length) {
            await mutation.mutateAsync(text);
            setText("");
          }
        }}
      >
        <input
          className="p-2 text-sm border border-gray-300 focus:border-gray-400 outline-none rounded-l flex-1"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={mutation.isPending}
          placeholder="New Todo"
        />
        <button
          className="p-2 text-sm border border-blue-500 rounded-r bg-blue-500 hover:bg-blue-400 text-white"
          type="submit"
          disabled={mutation.isPending}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
