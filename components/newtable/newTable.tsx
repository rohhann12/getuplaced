'use client'

import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export interface Identifiable {
  id: string;
  email: string;
}

interface TemplateProp {
  id: string;
  name: string;
  subject: string;
  template: string;
}

interface DataTableProps<TValue> {
  columns: ColumnDef<TValue>[];
}

export function DataTable<TValue extends Identifiable>({
  columns,
}: DataTableProps<TValue>) {
  const [templates, setTemplates] = useState<TemplateProp[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useRouter();
  const [rowSelection, setRowSelection] = useState({});
  const [selectedTemplateIds, setSelectedTemplateIds] = useState<Record<string, string>>({});

  const [data, setData] = useState<TValue[]>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [templateRes, dataRes] = await Promise.all([
          axios.get("/api/users/template"),
          axios.get("/api/users/emails/finder"),
        ]);

        setTemplates(templateRes.data);

        setData(dataRes.data.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching templates or user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const emailSender = async () => {
    const toastId = toast.loading("Sending emails...");

    const selectedRows = table.getSelectedRowModel().rows;
    const selectedData = selectedRows.map((row) => {
      const original = row.original;
      const templateId = selectedTemplateIds[original.id];
      if (!templateId) {
        throw new Error(`Template not selected for ${original.id}`);
      }
      return {
        email: original.email,
        templateId: templateId,
      };
    });

    try {
      const { data: passwordChecker } = await axios.get("/api/users/gmailPassChecker");

      if (!passwordChecker.success) {
        toast.error("No Gmail app password. Redirecting to settings...");
        navigate.push("/user/profile");
        return;
      }

      const response = await axios.post("/api/users/emails/sender", selectedData);

      if (response.status === 200) {
        toast.success("Emails sent successfully");
      } else {
        toast.error(`Unexpected response: ${response.status}`);
      }
    } catch (error: any) {
      console.error("Error during email sending:", error);
      if (error.response?.status === 402) {
        toast.error("🔒 You've already used your free email send! Upgrade to send more emails.", {
          duration: 5000,
        });
      } else if (error.response?.status === 535) {
        toast.error("Incorrect Gmail App Password. Check the demo for help.");
      } else if (error.response?.status === 400) {
        toast.error("Bad request. Please check the data you're sending.");
      } else {
        toast.error("An unexpected error occurred while sending emails.");
      }
    } finally {
      toast.dismiss(toastId);
    }
  };

  const selectedRows = table.getSelectedRowModel().rows;

  return (
    <div className="rounded-md border p-4 font-bold">
      {loading ? (
        <div className="flex justify-center items-center p-10">
          <Loader2 className="h-10 w-10 animate-spin text-grey-500" />
          <span className="ml-4 text-lg">Loading Data...</span>
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-white">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
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
                    <TableCell>
                      <Select
                        value={selectedTemplateIds[row.original.id] || ""}
                        onValueChange={(value) => {
                          setSelectedTemplateIds((prev) => ({
                            ...prev,
                            [row.original.id]: value,
                          }));
                        }}
                        disabled={!row.getIsSelected()}
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
                    </TableCell>
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

          <div className="mt-4 flex justify-center">
            <Button disabled={selectedRows.length === 0} onClick={emailSender}>
              Send Email
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
