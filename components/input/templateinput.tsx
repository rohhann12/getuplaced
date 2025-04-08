"use client";

import { useEffect, useState } from "react";

export default function TemplateInput() {
  const [template, setTemplate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTemplate = async () => {
      const res = await fetch("/api/users/template");
      const data = await res.json();
      setTemplate(data.template || "");
    };
    fetchTemplate();
  }, []);

  const updateTemplate = async () => {
    setLoading(true);
    await fetch("/api/users/template", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ template }),
    });
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-black text-white shadow-lg rounded-xl border">
      <h1 className="text-2xl font-semibold mb-4 text-white">✉️ Email Template Editor</h1>

      <div className="bg-gray-100 border border-gray-300 rounded-md overflow-hidden">
        <textarea
          className="w-full h-60 p-4 bg-black text-white font-mono resize-none outline-none"
          placeholder="Write your email template here..."
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
        />
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={updateTemplate}
          disabled={loading}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {loading ? "Updating..." : "Update Template"}
        </button>
      </div>
    </div>
  );
}
