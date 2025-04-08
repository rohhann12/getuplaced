"use client";
import AppSidebar from "@/components/sidebar/sidebar";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [hits, setHits] = useState(null);

  useEffect(() => {
    const fetchHits = async () => {
      try {
        const res = await fetch("/api/users/hits");
        const data = await res.json();
        setHits(data.hits);
      } catch (error) {
        console.error("Error fetching hits:", error);
      }
    };
  
    fetchHits();
  }, []);
  

  if (hits === null) {
    return <p className="text-white">Loading...</p>;
  }

  return (
    <div className="flex h-screen bg-black">
      <AppSidebar />
      <div className="p-6 text-white text-xl">
        <p>Number of remaining hits: {hits}</p>
      </div>
    </div>
  );
}
