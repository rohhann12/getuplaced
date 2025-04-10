"use client";

import TemplateInput from "@/components/input/templateinput";

export default function TemplatesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full">
      {/* <div className="w-full max-w-4xl bg-gray-900 text-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl border w-full border-gray-700"> */}
        <h2 className="text-2xl font-bold mb-6  text-white">Email Templates</h2>
        <TemplateInput />
      {/* </div> */}
    </div>
  );
}
