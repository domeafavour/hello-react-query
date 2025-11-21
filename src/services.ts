import { router } from "react-query-kit";
import {
  createTodo,
  fetchPaginatedTodos,
  fetchTodos,
  removeTodo,
  toggleTodo,
} from "./api";

export const limit = 10;

export const todoService = router("todos", {
  list: router.query({
    fetcher: fetchTodos,
  }),
  infiniteList: router.infiniteQuery({
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
    fetcher: async (_variables, ctx) => {
      const response = await fetchPaginatedTodos(ctx.pageParam, limit);
      return {
        total: response.total,
        page: ctx.pageParam,
        data: response.data,
        hasMore: ctx.pageParam * limit < response.total,
      };
    },
  }),
  add: router.mutation({
    mutationFn: createTodo,
  }),
  remove: router.mutation({ mutationFn: removeTodo }),
  toggle: router.mutation({ mutationFn: toggleTodo }),
});
