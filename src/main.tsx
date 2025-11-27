import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./router";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onSuccess: (_data, _variables, _context, mutation) => {
        const invalidatesTags = mutation.meta?.invalidatesTags;
        if (!invalidatesTags || !Array.isArray(invalidatesTags)) {
          return;
        }
        invalidatesTags.forEach((invalidatesTag) => {
          queryClient
            .getQueryCache()
            .findAll({
              predicate: (q) =>
                Array.isArray(q.meta?.tags) &&
                q.meta.tags.includes(invalidatesTag),
            })
            .forEach((q) => {
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
