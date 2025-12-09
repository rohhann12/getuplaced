"use client";

import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, 
  FaRocket, 
  FaUsers, 
  FaChartLine, 
  FaClock, 
  FaMagic 
} from 'react-icons/fa';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

const features: Feature[] = [
  {
    icon: <FaEnvelope size={28} />,
    title: 'Email Template Builder',
    description: 'Create stunning, professional email templates with our easy-to-use builder. No coding required.',
    gradient: 'from-[#1DB954] to-[#1ed760]'
  },
  {
    icon: <FaRocket size={28} />,
    title: 'Bulk Email Sending',
    description: 'Send thousands of personalized cold emails in minutes. Reach more prospects, faster.',
    gradient: 'from-black to-gray-800'
  },
  // {
  //   icon: <FaMagic size={28} />,
  //   title: 'AI Personalization',
  //   description: 'Leverage AI to personalize each email at scale. Increase response rates significantly.',
  //   gradient: 'from-[#1DB954] to-[#1ed760]'
  // },
  {
    icon: <FaChartLine size={28} />,
    title: 'Analytics & Tracking',
    description: 'Track opens, clicks, and responses in real-time. Make data-driven decisions.',
    gradient: 'from-black to-gray-800'
  },
  // {
  //   icon: <FaUsers size={28} />,
  //   title: 'Contact Management',
  //   description: 'Organize and segment your contacts efficiently. Keep your outreach targeted and relevant.',
  //   gradient: 'from-[#1DB954] to-[#1ed760]'
  // },
  // {
  //   icon: <FaClock size={28} />,
  //   title: 'Time-Saving Automation',
  //   description: 'Automate your outreach workflow. Focus on closing deals, not sending emails.',
  //   gradient: 'from-black to-gray-800'
  // }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export const Features: FC = () => {
  return (
    <section id="features" className="py-20 px-4 bg-black">
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
            Powerful Features for
            <span className="text-[#1DB954]">
              {" "}Cold Email Success
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Everything you need to run successful cold email campaigns and land your dream opportunities.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-zinc-900/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-zinc-800 hover:border-[#1DB954]/50 group"
            >
              {/* Icon with gradient background */}
              <div className={`w-16 h-16 bg-black rounded-xl flex items-center justify-center text-[#1DB954] mb-6 shadow-md border border-zinc-800 group-hover:border-[#1DB954]/50 transition-colors`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
