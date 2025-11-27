import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./router";

function findQueriesByTag<T extends string = string>(
  tag: T,
  queryClient: QueryClient
) {
  return queryClient.getQueryCache().findAll({
    predicate: (q) => Array.isArray(q.meta?.tags) && q.meta.tags.includes(tag),
  });
}

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onSuccess: (_data, _variables, _result, context) => {
        const invalidatesTags = context.meta?.invalidatesTags;
        if (!invalidatesTags || !Array.isArray(invalidatesTags)) {
          return;
        }
        invalidatesTags.forEach((invalidatesTag) => {
          findQueriesByTag(invalidatesTag, queryClient).forEach((q) => {
            queryClient.invalidateQueries({
              queryKey: q.queryKey,
              type: "active",
            });
          });
        });
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
