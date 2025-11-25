import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App";
import { CancelOnUnmount } from "./CancelOnUnmount";
import { InfinityQuery } from "./InfinityQuery";
import { Paginated } from "./Paginated";
import { PersistMutating } from "./PersistMutating";
import { QueryNestedData } from "./QueryNestedData";
import { SameQueries } from "./SameQueries";
import { Todos } from "./Todos";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<p>Hello</p>} />
      <Route path="todos" element={<Todos />} />
      <Route path="persist-mutating" element={<PersistMutating />} />
      <Route path="cancel-on-unmount" element={<CancelOnUnmount />} />
      <Route path="query-nested-data" element={<QueryNestedData />} />
      <Route path="infinity-query" element={<InfinityQuery />} />
      <Route path="paginated" element={<Paginated />} />
      <Route path="same-queries" element={<SameQueries />} />
    </Route>
  )
);
