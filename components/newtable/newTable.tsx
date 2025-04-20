"use client"
// axios
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import React, { useEffect } from "react"
import { Button } from "@/components/ui/button"
import axios from "axios"
// import { useRouter } from "next/router"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const navigate = useRouter()
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })
  async function emailSender() {
  
    const selectedRows = table.getSelectedRowModel().rows
    const selectedData = selectedRows.map(row => row.original)
  
    try {
      const passwordChecker = await axios.get("http://localhost:3000/api/users/gmailPassChecker")
  
      if (passwordChecker.data.success) {  
        const sendEmail = await axios.post("http://localhost:3000/api/users/emails/sender", {
          data: JSON.stringify(selectedData),
        })
        toast.success("Emails Sent",{
          duration: 3000,
        })
        console.log('Email sent:', sendEmail.data)
      } else {
        toast.success("No Gmail app password. Redirecting to settings...",{
          duration: 3000,
        })
        navigate.push("/user/settings")
      }
    } catch (error) {
      console.error("Error during email sending:", error)
    }
  }

  const selectedRows = table.getSelectedRowModel().rows

  return (
    <div className="rounded-md border !bg-white !text-black p-4">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
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
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Button that is disabled until a row is selected */}
      <div className="mt-4 flex  justify-center">
        <Button disabled={selectedRows.length === 0}
        onClick={emailSender}
        >
         Send Email
        </Button>
      </div>
    </div>
  )
}
