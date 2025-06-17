"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function DialogDemo() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/users/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: prompt }),
      });

      if (!res.ok) throw new Error("Failed to generate content");

      const data = await res.json();
      setOutput(data.output || "No content returned.");
    } catch (err) {
      setOutput("Error generating content.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Dialog>
      <form onSubmit={handleGenerate}>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-white text-black cursor-pointer">
            Generate With AI
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Generate Template</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="ai-prompt">Describe the job/person you want to reach out to</Label>
              <Textarea
                id="ai-prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Write an email to a recruiter for a frontend role"
              />
            </div>

            {loading ? (
              <p className="text-sm text-gray-500">Generating...</p>
            ) : output ? (
              <div className="mt-2 p-2 border rounded text-sm whitespace-pre-wrap">
                {output}
              </div>
            ) : null}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit"
            onClick={handleGenerate}
            >
              Generate Content
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
