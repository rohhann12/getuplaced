"use client";

import React, { useState } from "react";
import { signOut } from "next-auth/react";

function Page() {
  const [loggedOut, setLoggedOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handlePermissionRequest = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/permission');
      const data = await response.json();
      
      if (data.redirectUrl) {
        // Redirect the user to Google's consent page
        window.location.href = data.redirectUrl;
      } else if (data.error) {
        console.error("Error:", data.error);
        // Optionally handle errors with a state for displaying messages
      }
    } catch (error) {
      console.error("Failed to request permissions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex">
      {/* Main content */}
      <div className="flex-1 p-4">
        <header className="flex justify-between items-center">
          <div className="flex gap-4">
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:bg-blue-300"
                onClick={handlePermissionRequest}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Grant Email Permission"}
              </button>
            </div>
            <button
              className="bg-black text-white text-lg p-2 rounded"
              onClick={() => {
                signOut({ callbackUrl: "/" });
                setLoggedOut(true);
              }}
            >
              Logout
            </button>
          </div>
        </header>

        {loggedOut && (
          <p className="mt-4 text-red-500">You have been logged out.</p>
        )}
      </div>
    </div>
  );
}

export default Page;