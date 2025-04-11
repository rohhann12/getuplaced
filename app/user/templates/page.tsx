"use client";

import TemplateInput from "@/components/input/templateinput";

export default function TemplatesPage() {
  return (
    <div className="flex flex-col items-center justify-start w-full">
      <h2 className="text-2xl font-bold mb-4 text-white text-center px-4">
        Email Templates
      </h2>
      <p className="text-gray-200 mb-8 text-center max-w-2xl text-base px-4">
        Select a template type to configure your email templates for different roles.
      </p>
      <TemplateInput />
    </div>
  );
}
