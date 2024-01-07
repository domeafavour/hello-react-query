import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "./api";
import { useState } from "react";

export function AddTodo() {
  const queryClient = useQueryClient();
  const [text, setText] = useState("");
  const mutation = useMutation({
    mutationKey: ["addTodo"],
    mutationFn: createTodo,
    onSuccess: () => {
      console.log("onSuccess");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
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
