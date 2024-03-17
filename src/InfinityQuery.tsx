import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from './Button';
import { fetchPaginatedTodos } from './api';

const limit = 10;

export function InfinityQuery() {
  const {
    data,
    hasNextPage,
    hasPreviousPage,
    isFetchingPreviousPage,
    isFetchingNextPage,
    isFetching,
    fetchNextPage,
    fetchPreviousPage,
  } = useInfiniteQuery({
    queryKey: ['infinity-query'],
    initialPageParam: { page: 2, limit },
    staleTime: 1000 * 60 * 5,
    queryFn: async (ctx) => {
      const response = await fetchPaginatedTodos(
        ctx.pageParam.page,
        ctx.pageParam.limit
      );
      return {
        total: response.total,
        previousPage: ctx.pageParam.page - 1,
        page: ctx.pageParam.page,
        nextPage: ctx.pageParam.page + 1,
        data: response.data,
        hasMore: ctx.pageParam.page * limit < response.total,
      };
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? { page: lastPage.nextPage, limit } : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      const done = firstPage.previousPage < 1;
      return done ? undefined : { page: firstPage.previousPage, limit };
    },
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1 h-80 overflow-auto">
        <Button
          disabled={!hasPreviousPage}
          loading={isFetchingPreviousPage}
          onClick={() => {
            fetchPreviousPage();
          }}
        >
          Prev
        </Button>

        {data.pages
          .flatMap((page) => page.data)
          .map((todo) => (
            <div
              key={todo.id}
              className="border border-black p-2 rounded-md bg-gray-100  hover:bg-gray-200"
            >
              {todo.title}
            </div>
          ))}
        <Button
          disabled={!hasNextPage}
          loading={isFetchingNextPage}
          onClick={() => {
            fetchNextPage();
          }}
        >
          Next
        </Button>
      </div>
      <Button
        onClick={() => {
          queryClient.refetchQueries({
            queryKey: ['infinity-query'],
          });
        }}
        loading={isFetching}
      >
        Refetch
      </Button>
    </div>
  );
}
