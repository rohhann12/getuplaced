"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

interface TemplateData {
  id: string;     // Change _id to id based on your API response
  name: string;
  template: string;
  subject: string;
  userId: string;
}

export default function TemplateInput() {
  const router = useRouter();
  const [templates, setTemplates] = useState<TemplateData[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users/template");
        console.log(res.data);
        setTemplates(res.data || []);
      } catch (error) {
        console.error("Error fetching templates", error);
      }
    };

    fetchTemplates();
  }, []);

  async function handleNew() {
    const id = uuidv4(); // Generate new id
    try {
      const req = await axios.post("http://localhost:3000/api/users/template", {
        id: id,
  
      });
      router.push(`/user/templates/${id}`); // Redirect to new page
    } catch (error) {
      console.error("Error creating new template", error);
    }
  }

  return (
    <div className="p-6">
      <div className="rounded-xl p-4 flex flex-col justify-center text-black">
        <Button
          onClick={handleNew}
          className="flex flex-col bg-white p-20 w-8 text-black text-xl font-extrabold hover:bg-gray-400"
        >
          <Label>Add new</Label>
          +
        </Button>
      </div>

      {/* Table Section */}
      <div className="mt-10 overflow-x-auto rounded-md">
  {templates.length === 0 ? (
    <div className="text-center text-gray-500 text-xl mt-10">No templates found,try adding new ones</div>
  ) : (
    <table className="min-w-full border border-gray-300">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-6 py-3 text-left text-sm font-medium text-black">Template Name</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-black">Template ID</th>
        </tr>
      </thead>
      <tbody>
        {templates.map((template) => (
          <tr
            key={template.id}
            className="border-t border-gray-300 cursor-pointer "
            onClick={() => router.push(`/user/templates/${template.id}`)}
          >
            <td className="px-6 py-4 text-sm text-white ">{template.name}</td>
            <td className="px-6 py-4 text-sm text-white ">{template.id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

    </div>
  );
}
