"use client";
import Image from "next/image";
import codeImage from "../../public/main.png";
import { useRouter } from "next/navigation";

export function Hero() {
  const route = useRouter();

  const handleClick = () => {
    route.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center relative px-4 md:px-8">
        {/* Background Blur Layer */}
        <div className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-md z-0" />

        {/* Main Content */}
        <div className="z-10 text-center max-w-5xl w-full mx-auto">
          <h1 className="text-2xl md:text-5xl font-bold mb-4">
            <span className="bg-black text-white px-4 py-2 rounded-xl">
              Cold Emailing
            </span>{" "}
            Made Effortless
          </h1>
          <p className="text-base md:text-lg text-gray-700 mb-6 px- p-2">
            Send cold email in minutes. Automate outreach,
            personalize at scale, and connect with the right founder — faster.
          </p>
          <button
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition mb-6"
            onClick={handleClick}
          >
            Start Sending →
          </button>

          {/* Responsive Image */}
          <div className="mt-4">
            <Image
              src={codeImage}
              alt="Email Illustration"
              className="rounded-2xl shadow-md mx-auto w-full max-w-[90%] md:max-w-[700px] lg:max-w-[900px] h-auto"
              width={1200}
              height={600}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
