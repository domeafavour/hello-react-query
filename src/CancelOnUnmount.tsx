import classNames from "classnames";
import { posts } from "./services";

export function CancelOnUnmount() {
  const { data, isFetching } = posts.list.useQuery();
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
