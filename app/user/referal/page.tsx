// TO-DO ADD ZOD SO TAHT WE ONLY TAKE 4 DIGIT CODE
"use client";
import { useEffect, useState } from "react";
import AppSidebar from "@/components/sidebar/sidebar";

export default function ReferralDashboard() {
  const [referralCode, setReferralCode] = useState<number | null>(null);
  const [inputCode, setInputCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const res = await fetch("/api/users/referal");
        const data = await res.json();
        console.log("data is",)
        setReferralCode(data.finder.referalCode);
      } catch (err) {
        console.error("Failed to fetch referral code:", err);
      }
    };

    fetchCode();
  }, []);

  // Handle submitting a referral code
  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/users/referal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: parseInt(inputCode, 10) }),
      });

      const result = await res.json();
      // console.log(result)
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
    <div className="flex flex-row h-screen w-full bg-black text-white">
    {/* Sidebar on the left */}
    <AppSidebar />
  
    {/* Main content on the right */}
    <main className="flex flex-col flex-1">
      {/* Upper Half */}
      <div className="flex flex-col items-center justify-center flex-1 border-b border-gray-300">
        <h1 className="text-2xl font-bold mb-4">Your Referral Code</h1>
        <div className="bg-gray-100 px-4 py-2 rounded-md text-lg font-italics text-black">
          {referralCode || "Loading..."}
        </div>
      </div>
  
      {/* Lower Half */}
      <div className="flex flex-col items-center justify-center flex-1">
        <h2 className="text-xl mb-2">Got a Referral Code?</h2>
        <input
          type="text"
          className=" text-whtie border border-gray-400 px-3 py-2 rounded-md mb-3"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          placeholder="Enter referral code"
        />
        <button
          onClick={handleSubmit}
          className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-800"
        >
          Submit Code
        </button>
        {message && <p className="mt-3 text-sm text-gray-600">{message}</p>}
      </div>
    </main>
  </div>
  );
}
