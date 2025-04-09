"use client";
import { useEffect, useState } from "react";
import AppSidebar from "@/components/sidebar/sidebar";

export default function ReferralDashboard() {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [inputCode, setInputCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  // Fetch referral code on mount
  useEffect(() => {
    const fetchCode = async () => {
      try {
        const res = await fetch("/api/referral");
        const data = await res.json();
        setReferralCode(data.code);
      } catch (err) {
        console.error("Failed to fetch referral code:", err);
      }
    };

    fetchCode();
  }, []);

  // Handle submitting a referral code
  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: inputCode }),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage(`Success! Updated hits: ${result.updatedHits}`);
      } else {
        setMessage(result.error || "Something went wrong.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-black text-white">
      <AppSidebar />

      <div className="flex flex-col flex-1">
        {/* Upper Half */}
        <div className="flex flex-col items-center text-white justify-center h-1/2 border-b border-gray-700">
          <h1 className="text-2xl font-bold mb-4">Your Referral Code</h1>
          <div className="bg-white text-black px-4 py-2 rounded-md text-lg font-mono">
            {referralCode || "Loading..."}
          </div>
        </div>

        {/* Lower Half */}
        <div className="flex flex-col items-center justify-center h-1/2">
          <h2 className="text-xl mb-2">Got a Referral Code?</h2>
          <input
            type="text"
            className="text-black px-3 py-2 rounded-md mb-3"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Enter referral code"
          />
          <button
            onClick={handleSubmit}
            className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-300"
          >
            Submit Code
          </button>
          {message && <p className="mt-3 text-sm text-gray-400">{message}</p>}
        </div>
      </div>
    </div>
  );
}
