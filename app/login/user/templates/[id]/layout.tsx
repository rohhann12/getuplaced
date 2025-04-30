"use client";

export default function TemplatesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full">
      {children}
    </div>
  );
}
