"use client";
import Image from "next/image";
import codeImage from "../../public/main.png";
import { useRouter } from "next/navigation";
export function Hero() {
  const route=useRouter()
  const handleClick=()=>{
    route.push("/login")
  }
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Hero Section */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        {/* Background Blur Layer */}
        <div className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-md z-0" />

        {/* Main Content */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-black text-white px-4 py-2 rounded-xl">
              Cold Emailing
            </span>{" "}
            Made Effortless
          </h1>
          <p className="text-base md:text-lg text-gray-700 mb-6">
            Launch high-converting cold email campaigns in minutes. Automate
            outreach, personalize at scale, and connect with the right leads —
            faster.
          </p>
          <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition mb-6"
          onClick={handleClick}
          >
            Start Sending →
          </button>

          {/* Rounded Image */}
          <div className="mt-4">
          <Image
              src={codeImage}
              alt="Email Illustration"
              className="rounded-2xl shadow-md mx-auto"
              width={600}
              height={400}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white text-center py-4 border-t">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} ColdMailer. All rights reserved. | Follow us on{" "}
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Twitter
          </a>
        </p>
      </footer>
    </div>
  );
}
