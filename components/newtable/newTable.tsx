"use client"
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

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import axios from "axios"
// import { useRouter } from "next/router"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}
interface TemplateProp{
  id:string,
  name:string,
  subject:string,
  template:string, //template means body
}
interface Identifiable {
  id: string;
  email: string; // Add this line
}
export function DataTable<TData extends Identifiable, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [templates,setTemplate]=useState<TemplateProp[]>([])
  const navigate = useRouter()
  const [rowSelection, setRowSelection] = React.useState({})
  const [selectedTemplateIds, setSelectedTemplateIds] = useState<Record<string, string>>({})
  let sendReq=[]
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })
  
useEffect(() => {
  const templateFetcher = async () => {
    const request = await axios.get("http://localhost:3000/api/users/template")
    setTemplate(request.data)
  }
  templateFetcher()
}, [])
async function emailSender() {
  const selectedRows = table.getSelectedRowModel().rows
  const selectedData = selectedRows.map((row) => {
    const original = row.original
    const templateId = selectedTemplateIds[original.id]
    if (!templateId) {
      throw new Error(`Template not selected for ${original.id}`)
    }
    return {
      email: original.email,
      templateId: templateId,
    }
  })

  try {
    alert("his")
    const passwordChecker = await axios.get("http://localhost:3000/api/users/gmailPassChecker")
    console.log("pass",passwordChecker)
    if (!passwordChecker.data.success) {
      toast.error("No Gmail app password. Redirecting to settings...", {
        duration: 3000,
      })
      navigate.push("/user/profile")
      return
    }

    const response = await axios.post("http://localhost:3000/api/users/emails/sender", selectedData)

    if (response.status === 200) {
      toast.success("Emails sent successfully", { duration: 3000 })
    } else {
      toast.error("Failed to send some or all emails", { duration: 3000 })
    }
  } catch (error) {
    console.error("Error during email sending:", error)
    toast.error("An error occurred while sending emails", { duration: 3000 })
  }
}

  const selectedRows = table.getSelectedRowModel().rows

  return (
    <div className="rounded-md border p-4 font-bold">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-white">

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
                className={row.getIsSelected() ? "bg-white text-black" : ""}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                {row.getIsSelected() && (
                  <Select
                    value={selectedTemplateIds[row.original.id] || ""}
                    onValueChange={(value) => {
                      setSelectedTemplateIds((prev) => ({
                        ...prev,
                        [row.original.id]: value,
                      }))
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Choose Template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

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
