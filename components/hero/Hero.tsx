"use client";
import Image from "next/image";
import codeImage from "../../public/main.png";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaCheckCircle, FaRocket, FaClock } from "react-icons/fa";

export function Hero() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/login");
  };

  const handleLearnMore = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    { icon: <FaRocket />, text: "Send in minutes" },
    { icon: <FaClock />, text: "Save 10x time" },
    { icon: <FaCheckCircle />, text: "85% success rate" }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center bg-black pt-20 md:pt-24 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#1DB954] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-2000" />
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000" />

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center relative px-4 md:px-8 py-12">
        {/* Main Content */}
        <div className="z-10 text-center max-w-6xl w-full mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              🚀 Trusted by 500+ Students
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
          >
            <span className="text-white">
              Cold Emailing
            </span>
            <br />
            <span className="text-white">Made Effortless</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Send cold emails in minutes. Automate outreach, personalize at scale, 
            and connect with the right opportunities — faster than ever before.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="bg-[#1DB954] text-white px-8 py-4 rounded-xl text-lg font-bold shadow-2xl hover:bg-[#1ed760] hover:shadow-3xl transition-all duration-300 w-full sm:w-auto"
            >
              Start Sending for Free →
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLearnMore}
              className="bg-black text-white px-8 py-4 rounded-xl text-lg font-semibold border-2 border-zinc-800 hover:border-[#1DB954] transition-all duration-300 w-full sm:w-auto"
            >
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-300">
                <span className="text-[#1DB954]">{feature.icon}</span>
                <span className="font-medium">{feature.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-[#1DB954] rounded-3xl blur-2xl opacity-10" />
              <Image
                src={codeImage}
                alt="GetYouPlaced Platform Preview"
                className="rounded-2xl shadow-2xl mx-auto w-full max-w-[95%] md:max-w-[800px] lg:max-w-[1000px] h-auto relative border border-zinc-800"
                width={1200}
                height={600}
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
