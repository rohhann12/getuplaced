"use client";
import { ComboboxDemo } from "@/components/combobox/combo";
import AppSidebar from "@/components/sidebar/sidebar";
import { useState } from "react";

export default function Dashboard() {
  const companyType = [
    { value: "next.js", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
  ];
  const MailTemplate = [
    { value: "next.js", label: "Next.js" }
  ];
  return (
    <div className="flex h-screen w-full bg-black text-black">
  <AppSidebar />
  <div className="flex-1 flex items-start justify-end mt-10">
    <div className="flex flex-row items-center justify-end gap-8 text-xl font-extrabold ml-10">
      <div className="flex items-center justify-end gap-2">
        <p className="text-white">Company Domain:</p>
        <ComboboxDemo frameworks={companyType} />
      </div>
      <div className="flex items-center justify-end gap-2">
        <p className="text-white">Mail Template:</p>
        <ComboboxDemo frameworks={MailTemplate} />
      </div>
    </div>
  </div>
</div>
  );
}
