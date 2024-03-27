import { useQuery } from '@tanstack/react-query';

function useHelloQuery() {
  return useQuery({
    queryKey: ['helloQuery'],
    queryFn: async () => {
      console.log('query');
      return 'hello';
    },
  });
}

function HelloQuery() {
  const { isLoading, data } = useHelloQuery();

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
