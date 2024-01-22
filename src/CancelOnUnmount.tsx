import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";

export function CancelOnUnmount() {
  const { data, isFetching } = useQuery({
    placeholderData: [],
    queryKey: ["posts"],
    queryFn: async ({ signal }) => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        { signal }
      );
      return response.json() as Promise<
        { userId: number; id: number; title: string; body: string }[]
      >;
    },
    refetchOnWindowFocus: false,
  });
  return (
    <pre
      className={classNames("text-xs", {
        ["text-gray-300"]: isFetching,
      })}
    >
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
