import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPaginatedTodos } from './api';
import { limit } from './InfinityQuery';

export function useInfinityTodosQuery() {
  return useInfiniteQuery({
    queryKey: ['infinity-query'],
    initialPageParam: { page: 1, limit },
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
    refetchOnWindowFocus: false,
  });
}
