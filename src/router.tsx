import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App";
import { PersistMutating } from "./PersistMutating";
import { Todos } from "./Todos";
import { CancelOnUnmount } from "./CancelOnUnmount";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<p>Hello</p>} />
      <Route path="todos" element={<Todos />} />
      <Route path="persist-mutating" element={<PersistMutating />} />
      <Route path="cancel-on-unmount" element={<CancelOnUnmount />} />
    </Route>
  )
);
