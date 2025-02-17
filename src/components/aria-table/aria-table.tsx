import * as React from "react";
import { cn } from "@/lib/serverUtils";
import {
  Cell as CellComp,
  Column as ColumnComp,
  Row as RowComp,
  Table as TableComp,
  TableBody as TableBodyComp,
  TableHeader as TableHeaderComp,
  Group as GroupComp,
  ColumnProps,
  TableProps,
  RowProps, CellProps
} from "react-aria-components";
import Icon from "@/components/icon/icon";
import {SortDescriptor} from "react-stately";
import {ReactNode} from "react";


const Table = ({
  className,
  children,
    sortDescriptor,
    onSortChange,
  ...rest
}: Readonly<{
  sortDescriptor: SortDescriptor,
  children: React.ReactNode,
  className?: string,
}> & TableProps) => (
  <TableComp className={cn("w-full caption-bottom text-sm", className)}  onSortChange={onSortChange} {...rest}>
    {children}
  </TableComp>
);

const TableBody = ({
  className,
  children,
  ...props
}: Readonly<{
  children: React.ReactNode,
  className?: string,
}>) => (
  <TableBodyComp className={cn("p-5", className)} {...props}>
    {children}
  </TableBodyComp>
);

const Column = ({
  id,
  className,
  children,
  sortDescriptor,
  textValue,
  ...rest
}: Readonly<{
  id: string,
  children: React.ReactNode,
  sortDescriptor: SortDescriptor,
  className?: string,
  textValue?: string
}> & ColumnProps) => {
  const { column, direction } = sortDescriptor;

  const sortDirection = direction && column === id ? direction : "disabled";

  return (
    <ColumnComp
      {...rest}
      className={cn(
        "sticky top-0 py-2 border-0 border-b border-solid border-slate-300 bg-slate-200 font-bold text-left cursor-default whitespace-nowrap ",
        className
      )}
      aria-sort={sortDirection}
    >
      {({ allowsSorting }) => {
        return (
          <div className="flex items-center py-1 px-2">
            <GroupComp
              role="presentation"
              tabIndex={-1}
              className="flex flex-1 justify-center text-center overflow-hidden outline-none focus-visible:ring-2 ring-slate-600 text-black"
            >
              <button className="flex flex-row justify-center items-center bg-slate-200 hover:text-white hover:bg-slate-500 basis-full text-black p-3 rounded-xl max-w-[300px] min-w-[139px] ">
                {allowsSorting ? (
                  <span className={`flex items-center justify-center`} aria-label={`${textValue} column sorted ${sortDirection}`}>
                    {children}
                    <span className={`mt-0.5 w-4 h-4`} aria-hidden={true}>
                      {sortDirection !== "disabled" ? (
                        <Icon type={`${direction === "ascending" ? "fas-arrow-up-short-wide" : "fas-arrow-down-wide-short"}`} className="ml-2 h-4 w-4" />
                      ) : (
                        <Icon type="fas-arrow-down-up-across-line" className="ml-2 h-4 w-4" />
                      )}
                    </span>
                  </span>
                ) : (
                  <span>{children}</span>
                )}
              </button>
            </GroupComp>
          </div>
        );
      }}
    </ColumnComp>
  );
};

const Row = ({
  className,
  children,
  ...rest
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) => (
  <RowComp className={cn("border-b transition-colors hover:bg-muted/50 text-center focus-visible:outline focus-visible:outline-2", className)} {...rest}>
    {children}
  </RowComp>
);

const TableHeader = ({
  className,
  children,
  ...props
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) => (
  <TableHeaderComp className={cn("h-12 px-4 text-left align-middle font-medium text-muted-foreground text-center", className)} {...props}>
    {children}
  </TableHeaderComp>
);

const Cell = ({
  className,
  children,
  ...rest
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}> & CellProps) => (
  <CellComp className={cn("p-4 align-middle text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-600 focus-visible:-outline-offset-4 group-selected:focus-visible:outline-white [&:not(:last-child)]:border-r", className)} {...rest}>
    {children}
  </CellComp>
);

const Caption = ({
  className,
  children,
  ...props
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) => (
  <caption className={cn("mt-4 text-sm text-muted-foreground", className)} {...props}>
    {children}
  </caption>
);
export { Table, TableHeader, TableBody, Row, Cell, Caption, Column };

