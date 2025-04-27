"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; 

export default function TemplateForm({}) {
  const router = useRouter();
  const [templateData, setTemplateData] = useState({
    templateName: "",
    subject: "",
    body: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTemplateData({
      ...templateData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBack = () => {
    router.push("/user/templates");
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/api/users/template/update", templateData);
      router.push("/user/templates"); // redirect after submit
    } catch (error) {
      console.error("Error submitting template", error);
    }
  };


  return (
    <div className="flex justify-center items-center min-h-[30vw]">
      <div className="max-w-md w-full bg-white text-black p-4 border rounded-lg shadow-md">
        <div className="mb-3">
          <h2 className="text-2xl font-bold text-center">Add New Template</h2>
        </div>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="templateName">Template Name</Label>
            <Input
              id="templateName"
              name="templateName"
              value={templateData.templateName}
              onChange={handleChange}
              placeholder="Enter template name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              value={templateData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="body">Template</Label>
            <Textarea
              id="body"
              name="body"
              value={templateData.body}
              onChange={handleChange}
              placeholder="Paste your template here..."
              rows={3}
            />
          </div>
          <div className="flex justify-between">
            <Button onClick={handleBack}>Back</Button>
            <Button onClick={handleSubmit}>Submit All</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
