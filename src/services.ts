import { router } from "react-query-kit";
import {
  createTodo,
  fetchPaginatedTodos,
  fetchTodos,
  removeTodo,
  toggleTodo,
} from "./api";

export const limit = 10;

type InvalidatesTag = "TodoList" | "Paginated";

function defineTags(tags: InvalidatesTag[]) {
  return tags;
}

export const todoService = router("todos", {
  list: router.query({
    meta: {
      tags: defineTags(["TodoList"]),
    },
    fetcher: fetchTodos,
  }),
  paginated: router.query({
    meta: {
      tags: defineTags(["Paginated"]),
    },
    fetcher: async (variables: { page: number; limit: number }) =>
      await fetchPaginatedTodos(variables.page, variables.limit),
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
    meta: {
      invalidatesTags: defineTags(["TodoList", "Paginated"]),
    },
  }),
  remove: router.mutation({
    mutationFn: removeTodo,
    meta: {
      invalidatesTags: defineTags(["TodoList"]),
    },
  }),
  toggle: router.mutation({
    mutationFn: toggleTodo,
    meta: {
      invalidatesTags: defineTags(["TodoList"]),
    },
  }),
});

export const greeting = router(["greeting"], {
  hello: router.query({
    fetcher: async () => "hello",
  }),
});

export const posts = router(["posts"], {
  list: router.query({
    placeholderData: [],
    refetchOnWindowFocus: false,
    fetcher: async (_, { signal }) => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        { signal }
      );
      return response.json() as Promise<
        { userId: number; id: number; title: string; body: string }[]
      >;
    },
  }),
});
