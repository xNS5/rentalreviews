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

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { useRef, useState, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import styles from "./data-table.module.css";
import { Company } from "@/app/reviews/columns";

const DEFAULT_PAGINATION_VALUE = 10;

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  initialState: { [key: string]: any };
  row?: Row<TData>;
  [key: string]: any;
}

export function DataTable<TData, TValue>({ columns, data, initialState, tableCaption, paginationValue }: DataTableProps<TData, TValue>) {
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
  const tableBodyRef = useRef<HTMLTableSectionElement>(null);

  const tableNavigationHandler = (event: KeyboardEvent, row: Row<TData>, index: number) => {
    event.stopPropagation();
    const isCtrlAlt = event.ctrlKey && event.altKey;

    if (!isCtrlAlt) return;

    const originalData: Company = row.original as Company;
    const currentRow = tableBodyRef.current?.children.namedItem(originalData.slug) as HTMLTableRowElement | null;

    if (!currentRow) return;

    const currentCell = currentRow.children[index];

    console.log(event.key);

    switch (event.key) {
      case "ArrowUp":
        if (isCtrlAlt) {
          const previousRow = currentRow.previousElementSibling as HTMLTableRowElement | null;
          if (previousRow) {
            const targetCell = previousRow.children[index] as HTMLElement | null;
            targetCell?.focus();
          }
        }
        break;
      case "ArrowDown":
        if (isCtrlAlt) {
          const nextRow = currentRow.nextElementSibling as HTMLTableRowElement | null;
          if (nextRow) {
            const targetCell = nextRow.children[index] as HTMLElement | null;
            targetCell?.focus();
          }
        }
        break;
      case "ArrowRight":
        const nextCell = currentCell.nextElementSibling as HTMLElement | null;
        if(nextCell){
          nextCell.focus();
        }
        break;
      case "ArrowLeft":
        const previousCell = currentCell.previousElementSibling as HTMLElement | null;
        if(previousCell){
          previousCell.focus();
        }
        break;
      default:
        break;
      
  };
}

  return (
    <div className="rounded-md border">
      <div className="flex items-center p-4 justify-end" role="presentation">
        <label className="flex text-md items-center">
          Search
          <Input
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
            className="max-w-sm ml-2 shadow-lg"
          />
        </label>
      </div>

      <Table role="grid" aria-colcount={tableHeaderGroups?.length ?? 0} aria-rowcount={tableRowModel.rows?.length ?? 0}>
        <caption className="caption-top text-lg" aria-label={tableCaption}>
          {tableCaption}
        </caption>
        <TableHeader aria-label="Table Header">
          {tableHeaderGroups.map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, i: number) => {
                const columnIsSorted = header.column.getIsSorted();
                return (
                  <TableHead
                    id={header.column.id}
                    key={header.id}
                    scope="col"
                    role="columnheader"
                    aria-sort={columnIsSorted ? (columnIsSorted == "desc" ? "descending" : "ascending") : "none"}
                    aria-colindex={i}
                    aria-rowindex={0}
                    tabIndex={-1}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="table-auto" ref={tableBodyRef}>
          {tableRowModel.rows?.length ? (
            tableRowModel.rows.map((row, i: number) => {
              const tableVisibleCells = row.getVisibleCells();
              return (
                <TableRow
                  id={(row.original as Company).slug}
                  key={i}
                  className={`${styles.data_table_row}`}
                  aria-rowindex={i + 1}
                  role="rowgroup"
                  tabIndex={-1}
                >
                  {tableVisibleCells.map((cell, j: number) => (
                    <TableCell
                      key={cell.id}
                      aria-rowindex={i + 1}
                      aria-colindex={j + 1}
                      tabIndex={-1}
                      aria-labelledby={cell.column.id}
                      className="focus:ring"
                      role="cell"
                      onKeyDown={(e) => tableNavigationHandler(e, row, j)}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center" tabIndex={-1}>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {data.length > DEFAULT_PAGINATION_VALUE && (
        <>
          <div className="flex items-center gap-2 justify-center py-1">
            <button className={styles.data_table_nav_button} onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()} aria-label="First page">
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
            <button className={styles.data_table_nav_button} onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} aria-label="Next page">
              {">"}
            </button>
            <button className={styles.data_table_nav_button} onClick={() => table.lastPage()} disabled={!table.getCanNextPage()} aria-label="Last page">
              {">>"}
            </button>
          </div>
          <span className="flex items-center gap-1 justify-center py-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of {table.getPageCount().toLocaleString()}
            </strong>
          </span>
        </>
      )}
    </div>
  );
}

