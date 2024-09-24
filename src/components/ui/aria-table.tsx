import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Cell as CellComp,
  Column as ColumnComp,
  Row as RowComp,
  Table as TableComp,
  TableBody as TableBodyComp,
  TableHeader as TableHeaderComp,
} from "react-aria-components";

const Table = ({
  className,
  children,
  ...props
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}>) => (
  <div className="relative w-full overflow-auto">
    <TableComp className={cn("w-full caption-bottom text-sm", className)} {...props}>
      {children}
    </TableComp>
  </div>
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
}>) => (
  <TableBodyComp className={cn("[&_tr:last-child]:border-0", className)} {...props}>
    {children}
  </TableBodyComp>
);

const Column = ({
  className,
  children,
  ...props
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}>) => (
  <ColumnComp className={`${className}`} {...props}>
    {children}
  </ColumnComp>
);

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
}>) => <CellComp className={cn("p-4 align-middle ", className)} {...props} > {children} </CellComp>

const Caption = ({
  className,
  children,
  ...props
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}>) => <caption className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />;
export { Table, TableHeader, TableBody, TableHead, Row, Cell, Caption, Column };

