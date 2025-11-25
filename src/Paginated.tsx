import { useState } from "react";
import { AddTodo } from "./AddTodo";
import { Button } from "./Button";
import { todoService } from "./services";

export function Paginated() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = todoService.paginated.useQuery({
    variables: { page, limit: 5 },
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* 
        After adding a new todo, 
        the current page will be invalidated automatically by `invalidatesTags` provided 
      */}
      <AddTodo />
      <table className="[&_td]:border-collapse [&_td]:border [&_td]:p-2 [&_th]:border-collapse [&_th]:border">
        <thead>
          <tr>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((todo) => (
            <tr key={todo.id}>
              <td>
                <div className="line-clamp-1">{todo.title}</div>
              </td>
              <td>
                <div className="line-clamp-1">{todo.body}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul>
        <li>
          <Button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
        </li>
        <li>Current Page: {page}</li>
        <li>
          <Button
            disabled={page * 5 >= (data?.total || 0)}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </li>
      </ul>
    </div>
  );
}
