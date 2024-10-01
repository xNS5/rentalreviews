import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Cell as CellComp,
  Column as ColumnComp,
  Row as RowComp,
  Table as TableComp,
  TableBody as TableBodyComp,
  TableHeader as TableHeaderComp,
  Group as GroupComp,
} from "react-aria-components";
import type { CellProps, ColumnProps, RowProps, SortDescriptor } from "react-aria-components";
import Icon from "../icons/icon";

const Table = ({
  className,
  children,
  ...props
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}>) => (
  <TableComp className={cn("w-full caption-bottom text-sm", className)} {...props}>
    {children}
  </TableComp>
);

const TableHeader = ({
  className,
  children,
  ...props
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}>) => (
  <TableHeaderComp className={cn("[&_tr]:border-b", className)} {...props}>
    {children}
  </TableHeaderComp>
);

const TableBody = ({
  className,
  children,
  ...props
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}>) => <TableBodyComp className={cn("p-5", className)} {...props}>{children}</TableBodyComp>;

const Column = ({className, children, ...props} : Readonly<{
  className?: string,
  children: React.ReactNode,
  [key: string]: any
}>) => {
  const {column, direction} = props.sortDescriptor;

  return (
    <ColumnComp
      {...props}
      className="sticky top-0 py-2 border-0 border-b border-solid border-slate-300 bg-slate-200 font-bold text-left cursor-default first:rounded-tl-lg last:rounded-tr-lg whitespace-nowrap "
    >
      {({ allowsSorting }) => {
        return (
          <div className="flex items-center pl-4 py-1">
            <GroupComp
              role="presentation"
              tabIndex={-1}
              className="flex flex-1 items-center text-center overflow-hidden outline-none rounded focus-visible:ring-2 ring-slate-600"
            >
              <span className="flex-1 truncate">{children}</span>
              {allowsSorting && (
                <span className={`ml-1 w-4 h-4 px-8 flex items-center justify-center transition`} aria-hidden={true}>
                  {direction && column === props.id ? (
                    <Icon type={`${direction === "ascending" ? "fas-arrow-up-short-wide" : "fas-arrow-down-wide-short"}`} className="ml-2 h-4 w-4" />
                  ) : (
                    <Icon type="fas-arrow-down-up-across-line" className="ml-2 h-4 w-4" />
                  )}
                </span>
              )}
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
  ...props
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}>) => (
  <RowComp className={cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted text-center", className)} {...props}>
    {children}
  </RowComp>
);

const TableHead = ({
  className,
  children,
  ...props
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}>) => (
  <TableHeaderComp className={cn("h-12 px-4 text-left align-middle font-medium text-muted-foreground text-center", className)} {...props}>
    {children}
  </TableHeaderComp>
);

const Cell = ({
  className,
  children,
  ...props
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}>) => (
  <CellComp className={cn("p-4 align-middle ", className)} {...props}>
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
  [key: string]: any;
}>) => (
  <caption className={cn("mt-4 text-sm text-muted-foreground", className)} {...props}>
    {children}
  </caption>
);
export { Table, TableHeader, TableBody, TableHead, Row, Cell, Caption, Column };

