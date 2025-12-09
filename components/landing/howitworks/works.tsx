"use client";

import { FC } from 'react';
import { FaUserGraduate, FaRocket, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

const steps = [
  { icon: <FaUserGraduate size={32} />, title: 'Create Account', description: 'Sign up on GetYouPlaced and build your personalized student profile in minutes.' },
  { icon: <FaRocket size={32} />, title: 'Cold Email', description: 'Create stunning templates and start mass cold emailing with AI-powered personalization.' },
  { icon: <FaCheck size={32} />, title: 'Get Placed', description: 'Land your dream job with higher response rates and better opportunities!' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

const HowToUseGetYouPlaced: FC = () => {
  return (
    <section id="how-it-works" className="bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How to Use GetYouPlaced
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Start your placement journey with these three simple steps.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mb-16 relative"
        >
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-zinc-800 -z-10" style={{ width: '80%', left: '10%' }} />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative bg-zinc-900/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-zinc-800 hover:border-[#1DB954]"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#1DB954] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-black">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center text-[#1DB954] mb-6 mx-auto border border-zinc-800">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-3 text-center">
                {step.title}
              </h3>
              <p className="text-gray-400 text-center leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-white mb-3">
            Watch a Quick Overview
          </h3>
          <p className="text-gray-400 mb-8 text-lg">
            Learn more about how GetYouPlaced works in this video tutorial.
          </p>
          
          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-2xl shadow-2xl border border-zinc-700 bg-zinc-900">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/uoytlPVVqVw"
              title="GetYouPlaced Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToUseGetYouPlaced;

