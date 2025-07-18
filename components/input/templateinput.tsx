"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { Loader2 } from "lucide-react";
import { toast, Toaster } from "sonner"; 
interface TemplateData {
  id: string;
  name: string;
  template: string;
  subject: string;
  userId: string;
}

export default function TemplateInput() {
  const router = useRouter();
  const [templates, setTemplates] = useState<TemplateData[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await axios.get("/api/users/template");
        setTemplates(res.data || []);
      } catch (error) {
        console.error("Error fetching templates", error);
        toast.error("Failed to load templates.");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-gray-700" />
        <span className="ml-4 text-lg text-gray-600">Loading templates...</span>
      </div>
    );
  }

  async function handleNew() {
    setLoading(true);
    const id = uuidv4();
    try {
      await axios.post("/api/users/template", { id: id });
      toast.success("New template created successfully!");
      router.push(`/user/templates/${id}`);
    } catch (error) {
      console.error("Error creating new template", error);
      toast.error("Failed to create template.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
      <div className="rounded-xl p-4 flex flex-col justify-center text-black">
      <Button
          onClick={handleNew}
          className="flex flex-col items-center bg-white p-20 w-8 text-black text-xl font-extrabold hover:bg-gray-400"
        >
          {loading ? (
            <>
              <h1 className="" >
              creating new...
              </h1>
            </>
          ) : (
            <>
              <Label>Add new</Label>
              +
            </>
          )}
        </Button>
      </div>

      <div className="mt-10 overflow-x-auto rounded-md">
        {templates.length === 0 ? (
          <div className="text-center text-gray-500 text-xl mt-10">
            No templates found, try adding new ones
          </div>
        ) : (
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-black">Template Id</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-black">Template Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-black">Template subject</th>
              </tr>
            </thead>
            <tbody>
              {templates.map((template) => (
                <tr
                  key={template.id}
                  className="border-t border-gray-300 cursor-pointer"
                  onClick={() => router.push(`/user/templates/${template.id}`)}
                >
                  <td className="px-6 py-4 text-sm text-white">{template.id}</td>
                  <td className="px-6 py-4 text-sm text-white">{template.name}</td>
                  <td className="px-6 py-4 text-sm text-white">{template.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
