import { useQueryClient } from "@tanstack/react-query";
import { todoService } from "./services";

export function useRevalidateTodoList() {
  const queryClient = useQueryClient();
  function revalidate() {
    queryClient.invalidateQueries({
      type: "active",
      queryKey: todoService.list.getKey(),
    });
  }
  return revalidate;
}
