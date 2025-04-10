"use client";

import { useEffect, useState } from "react";

export default function TemplateInput() {
  const [template, setTemplate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await fetch("/api/users/template");
        const data = await res.json();
        setTemplate(data.template || "");
      } catch (error) {
        console.error("Error fetching template:", error);
        setMessage("Failed to load template. Please try again.");
      }
    };
    fetchTemplate();
  }, []);

  const updateTemplate = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/users/template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template }),
      });
      
      if (res.ok) {
        setMessage("Template updated successfully!");
      } else {
        setMessage("Failed to update template. Please try again.");
      }
    } catch (error) {
      console.error("Error updating template:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white text-black p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">✉️ Email Template Editor</h1>

      <div className="mb-6">
        <label htmlFor="template" className="block text-sm font-medium text-gray-700 mb-2">
          Your Email Template
        </label>
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <textarea
            id="template"
            className="w-full h-60 p-4 bg-white text-black font-mono resize-none outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
            placeholder="Write your email template here..."
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
          />
        </div>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-lg text-center text-sm ${
          message.includes('successfully') 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={updateTemplate}
          disabled={loading}
          className="px-6 py-3 rounded-lg bg-black text-white font-medium transition-all duration-300 hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Updating..." : "Update Template"}
        </button>
      </div>
    </div>
  );
}
