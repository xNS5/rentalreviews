"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
  PaginationState,
  ColumnFiltersState,
  getFilteredRowModel,
  Row,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import styles from "./data-table.module.css";

const DEFAULT_PAGINATION_VALUE = 10;

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  initialState: { [key: string]: any };
  row?: Row<TData>;
  [key: string]: any;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  initialState,
  tableCaption,
  paginationValue,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>(initialState.sorting);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: paginationValue ?? DEFAULT_PAGINATION_VALUE,
  });

  const table = useReactTable({
    data,
    columns,
    initialState,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      pagination,
      columnFilters,
    },
  });

  const tableHeaderGroups = table.getHeaderGroups();
  const tableRowModel = table.getRowModel();

  console.log(tableHeaderGroups[0].headers);

  return (
    <div className="rounded-md border">
      <div className="flex items-center p-4 justify-end" role="presentation">
        <label className="flex text-md items-center">
          Search
          <Input
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm ml-2 shadow-lg"
          />
        </label>
      </div>

      <Table
        role="grid"
        aria-colcount={tableHeaderGroups?.length ?? 0}
        aria-rowcount={tableRowModel.rows?.length ?? 0}
      >
        <caption className="caption-top text-lg" aria-label={tableCaption}>
          {tableCaption}
        </caption>
        <TableHeader aria-label="Table Header">
          {tableHeaderGroups.map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const column = header.column;
                return (
                  <TableHead 
                  key={header.id} 
                  scope="col" 
                  role="columnheader"
                  aria-sort={
                    column.getIsSorted()
                      ? column.getIsSorted() == 'desc'
                        ? 'descending'
                        : 'ascending'
                      : 'none'
                  }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="table-auto">
          {tableRowModel.rows?.length ? (
            tableRowModel.rows.map((row, i: number) => {
              const tableVisibleCells = row.getVisibleCells();
              return (
                <TableRow
                  key={row.id}
                  className={`${styles.data_table_row}`}
                  role="rowgroup"
                >
                  {tableVisibleCells.map((cell, j: number) => (
                      <TableCell
                        key={cell.id}
                        aria-colindex={j}
                        role="cell"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    )
                  )}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {data.length > DEFAULT_PAGINATION_VALUE && (
        <>
          <div className="flex items-center gap-2 justify-center py-1">
            <button
              className={styles.data_table_nav_button}
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="First page"
            >
              {"<<"}
            </button>
            <button
              className={styles.data_table_nav_button}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="Previous page"
            >
              {"<"}
            </button>
            <button
              className={styles.data_table_nav_button}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              aria-label="Next page"
            >
              {">"}
            </button>
            <button
              className={styles.data_table_nav_button}
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
              aria-label="Last page"
            >
              {">>"}
            </button>
          </div>
          <span className="flex items-center gap-1 justify-center py-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount().toLocaleString()}
            </strong>
          </span>
        </>
      )}
    </div>
  );
}
