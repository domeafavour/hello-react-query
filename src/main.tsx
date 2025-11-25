import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./router";

function matchInvalidateTags(queryTags: unknown, invalidateTag: string) {
  return Array.isArray(queryTags) && queryTags.includes(invalidateTag);
}

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      const invalidateTags = mutation.meta?.invalidateTags;
      if (!invalidateTags || !Array.isArray(invalidateTags)) {
        return;
      }
      invalidateTags.forEach((invalidateTag) => {
        queryClient
          .getQueryCache()
          .findAll({
            predicate: (q) => matchInvalidateTags(q.meta?.tags, invalidateTag),
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
  </QueryClientProvider>
);
