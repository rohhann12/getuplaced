"use client";
import { useEffect, useState } from "react";

export default function ReferralPage() {
  const [referralCode, setReferralCode] = useState<number | null>(null);
  const [inputCode, setInputCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCode = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/users/referal");
        const data = await res.json();
        setReferralCode(data.finder.referalCode);
      } catch (err) {
        console.error("Failed to fetch referral code:", err);
        setMessage("Failed to load your referral code. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCode();
  }, []);

  // Handle submitting a referral code
  const handleSubmit = async () => {
    if (!inputCode.trim()) {
      setMessage("Please enter a referral code.");
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage(null);
      
      const res = await fetch("/api/users/referal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: parseInt(inputCode, 10) }),
      });

      const result = await res.json();
      
      if (res.ok) {
        setMessage(`Success! Updated hits: ${result.updatedHits}`);
        setInputCode(""); // Clear input on success
      } else {
        setMessage(result.error || "Something went wrong.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full">
      <div className="w-full max-w-md bg-white text-black p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Referral Program</h2>
        
        {/* Your Referral Code Section */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium mb-3 text-center text-black">Your Referral Code</h3>
          {isLoading ? (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-400"></div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-3xl font-bold text-black">{referralCode || "N/A"}</div>
              <p className="text-sm text-gray-600 mt-2">Share this code with friends to earn more hits!</p>
            </div>
          )}
        </div>
        
        {/* Enter Referral Code Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3 text-center text-black">Got a Referral Code?</h3>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 text-black"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Enter referral code"
              maxLength={4}
            />
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !inputCode.trim()}
            className="w-full bg-black text-white p-3 rounded-lg font-medium transition-all duration-300 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit Code"}
          </button>
        </div>
        
        {message && (
          <div className={`p-3 rounded-lg text-center text-sm ${
            message.includes('Success') 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
