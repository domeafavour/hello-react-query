import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./router";

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      const invalidateTags = mutation.meta?.invalidatesTags;
      if (!invalidateTags || !Array.isArray(invalidateTags)) {
        return;
      }
      invalidateTags.forEach((invalidateTag) => {
        queryClient
          .getQueryCache()
          .findAll({
            predicate: (q) =>
              Array.isArray(q.meta?.tags) &&
              q.meta?.tags.includes(invalidateTag),
          })
          .forEach((q) => {
            queryClient.invalidateQueries({
              queryKey: q.queryKey,
              type: "active",
            });
          });
      });
    },
  }),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
