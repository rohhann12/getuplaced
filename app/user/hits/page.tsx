"use client";
import { useEffect, useState } from "react";

export default function HitsPage() {
  const [hits, setHits] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHits = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/users/hits");
        const data = await res.json();
        setHits(data.hits);
      } catch (error) {
        console.error("Error fetching hits:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchHits();
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full">
      <div className="w-full max-w-md bg-white text-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Your Remaining Hits</h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-400"></div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-5xl font-bold mb-2 text-black">{hits}</div>
            <p className="text-gray-900">hits remaining</p>
          </div>
        )}
        
        <div className="mt-6 text-center text-sm text-black">
          <p>Hits are used when sending emails to your contacts.</p>
          <p className="mt-2">Need more hits? Consider upgrading your plan.</p>
        </div>
      </div>
    </div>
  );
}
