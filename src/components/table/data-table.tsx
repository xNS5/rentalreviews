"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  RowSelection,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
  PaginationState,
  ColumnFiltersState,
  getFilteredRowModel,
  Row,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,

} from "@/components/ui/table"


import { useState } from 'react';
import { Input } from "@/components/ui/input"

import styles from "./data-table.module.css"

const DEFAULT_PAGINATION_VALUE = 10;

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  initialState?: {[key: string]: any},
  onRowSelectProps?: {
    fn?: (a: any) => void,
    url?: string,
    target?: string
  },
  row?: Row<TData>,
  [key: string]: any
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowSelectProps,
  initialState = {},
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: DEFAULT_PAGINATION_VALUE,
  })

  const onRowSelectHandler = (row: Row<TData>) => {
    if(onRowSelectProps?.fn !== undefined){
      onRowSelectProps.fn(row)
    }
  }

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
      columnFilters
    }
  })

  return (
    <div className="rounded-md border">
      <div className="flex items-center p-4 justify-end">
        <label className="flex text-lg items-center">
          Search
          <Input
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm ml-2"
          />
        </label>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                <TableHead key={header.id} scope="col" role="columnheader">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="table-auto" role="rowgroup">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, i: number) => {
              const tableVisibleCells = row.getVisibleCells();

              return (              
              <TableRow
                key={row.id}
                className={`${styles.data_table_row} focusable`}
                aria-label={`Row ${i}: ${tableVisibleCells[0].getValue()}`}
                role="row"
              >
                {tableVisibleCells.map((cell, i: number) => (
                  <TableCell title={cell.getValue() as string} key={cell.id} tabIndex={0} className="focusable" role="cell">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
              )
            }
            )
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {
        data.length > DEFAULT_PAGINATION_VALUE &&
        <>
          <div className="flex items-center gap-2 justify-center py-1">
            <button
              className={styles.data_table_nav_button}
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {'<<'}
            </button>
            <button
              className={styles.data_table_nav_button}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {'<'}
            </button>
            <button
              className={styles.data_table_nav_button}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {'>'}
            </button>
            <button
              className={styles.data_table_nav_button}
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              {'>>'}
            </button>
          </div>
          <span className="flex items-center gap-1 justify-center py-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount().toLocaleString()}
            </strong>
          </span>
        </>
      }
    </div >
  )
}
