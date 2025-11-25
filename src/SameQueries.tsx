import { greeting } from "./services";

function HelloQuery() {
  const { isLoading, data } = greeting.hello.useQuery();

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (!data) {
    return <div>noe data</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
}

export function SameQueries() {
  return (
    <div>
      <HelloQuery />
      <HelloQuery />
    </div>
  );
}
