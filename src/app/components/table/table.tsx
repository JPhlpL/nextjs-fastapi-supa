"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState<Record<string, boolean>>({})
  const [globalFilter, setGlobalFilter] = React.useState("")

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  })

  const allRowsSelected =
    table.getRowModel().rows.length > 0 && Object.keys(rowSelection).length === table.getRowModel().rows.length

  const handleSelectAll = () => {
    table.toggleAllPageRowsSelected(!allRowsSelected)
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search all columns..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-8 bg-white"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-1 bg-white shadow-sm border-gray-200 hover:bg-gray-50"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>View</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value: boolean) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Badge variant="outline" className="bg-white shadow-sm border-gray-200">
            {table.getFilteredRowModel().rows.length} Records
          </Badge>
        </div>
      </div>
      <div className="rounded-md border border-gray-200 overflow-hidden bg-white shadow-sm">
        <Table>
          <TableHeader>
            {/* Header row with column titles and sorting */}
            <TableRow>
              <TableHead className="w-[40px] text-center bg-gray-900 text-white">
                <Checkbox
                  checked={allRowsSelected}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all rows"
                  className="border-white data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
              </TableHead>
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="bg-gray-900 text-white font-semibold"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div
                      className={cn(
                        "flex items-center gap-1 cursor-pointer select-none",
                        header.column.getCanSort() && "hover:text-blue-200",
                      )}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: " ↑",
                        desc: " ↓",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </TableHead>
                )),
              )}
            </TableRow>

            {/* Filter row with per-column search */}
            <TableRow>
              <TableHead className="bg-gray-800 text-white" />
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="bg-gray-800 p-2">
                    {header.column.getCanFilter() ? (
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-3 w-3 text-gray-400" />
                        <Input
                          placeholder={`Search ${header.column.id}...`}
                          value={(header.column.getFilterValue() as string) ?? ""}
                          onChange={(event) => header.column.setFilterValue(event.target.value)}
                          className="max-w-full h-8 text-xs pl-7 pr-2  border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    ) : null}
                  </TableHead>
                )),
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row, i) => (
                <TableRow
                  key={row.id}
                  className={cn(
                    "hover:bg-gray-50",
                    row.getIsSelected() && "bg-blue-50/50 hover:bg-blue-50/70",
                    i % 2 === 1 && "bg-gray-50/50",
                  )}
                >
                  <TableCell className="text-center p-2">
                    <Checkbox
                      checked={row.getIsSelected()}
                      onCheckedChange={() => row.toggleSelected()}
                      aria-label={`Select row ${row.id}`}
                    />
                  </TableCell>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Badge
            variant={table.getFilteredSelectedRowModel().rows.length > 0 ? "default" : "outline"}
            className="font-normal"
          >
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
            selected
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="bg-white shadow-sm border-gray-200 hover:bg-gray-50"
          >
            {"<<"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="bg-white shadow-sm border-gray-200 hover:bg-gray-50"
          >
            {"<"}
          </Button>
          <span className="text-sm font-medium">
            Page <span className="font-bold">{table.getState().pagination.pageIndex + 1}</span> of{" "}
            <span className="font-bold">{table.getPageCount()}</span>
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="bg-white shadow-sm border-gray-200 hover:bg-gray-50"
          >
            {">"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="bg-white shadow-sm border-gray-200 hover:bg-gray-50"
          >
            {">>"}
          </Button>
        </div>
      </div>
    </div>
  )
}

