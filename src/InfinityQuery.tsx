import { useQueryClient } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import classNames from "classnames";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "./Button";
import { todoService } from "./services";

export const limit = 10;

export function InfinityQuery() {
  const { data, hasNextPage, isFetchingNextPage, isFetching, fetchNextPage } =
    todoService.infiniteList.useInfiniteQuery();

  const queryClient = useQueryClient();
  const parentRef = useRef<HTMLDivElement | null>(null);

  const allRows = data ? data.pages.flatMap((page) => page.data) : [];

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 42,
  });

  const { ref: fetchNextRef } = useInView({
    onChange: (fetchNextInView) => {
      if (fetchNextInView && !isFetching) {
        fetchNextPage();
      }
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="relative h-80 overflow-auto" ref={parentRef}>
        <div style={{ height: rowVirtualizer.getTotalSize() }}>
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const isLoaderRow = virtualRow.index > allRows.length - 1;
            const todo = allRows[virtualRow.index];
            return (
              <div
                key={virtualRow.key}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className={classNames(
                  "flex flex-row items-center justify-center",
                  "rounded-md",
                  "overflow-hidden",
                  "bg-gray-100 hover:bg-gray-200"
                )}
              >
                {isLoaderRow ? (
                  <Button
                    ref={fetchNextRef}
                    disabled={!hasNextPage}
                    loading={isFetchingNextPage}
                  >
                    Next
                  </Button>
                ) : (
                  <span>
                    {virtualRow.index}: {todo.title}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Button
        onClick={() => {
          queryClient.refetchQueries({
            queryKey: todoService.infiniteList.getKey(),
          });
        }}
        loading={isFetching}
      >
        Refetch
      </Button>
    </div>
  );
}
