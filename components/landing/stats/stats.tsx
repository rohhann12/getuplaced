"use client";

import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  duration: number;
}

const stats: Stat[] = [
  {
    value: 50000,
    suffix: '+',
    label: 'Emails Sent',
    duration: 2000
  },
  {
    value: 500,
    suffix: '+',
    label: 'Students Placed',
    duration: 1800
  },
  {
    value: 85,
    suffix: '%',
    label: 'Success Rate',
    duration: 1500
  },
  {
    value: 10,
    suffix: 'x',
    label: 'Time Saved',
    duration: 1600
  }
];

const useCounter = (end: number, duration: number, inView: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, inView]);

  return count;
};

const StatCard: FC<{ stat: Stat; index: number }> = ({ stat, index }) => {
  const [inView, setInView] = useState(false);
  const count = useCounter(stat.value, stat.duration, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onViewportEnter={() => setInView(true)}
      className="text-center"
    >
      <div className="mb-2">
        <span className="text-5xl md:text-6xl font-bold text-[#1DB954]">
          {count.toLocaleString()}
        </span>
        <span className="text-4xl md:text-5xl font-bold text-[#1DB954]">
          {stat.suffix}
        </span>
      </div>
      <p className="text-gray-600 font-medium text-lg">
        {stat.label}
      </p>
    </motion.div>
  );
};

export const Stats: FC = () => {
  return (
    <section className="py-20 px-4 bg-black border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Students Worldwide
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Join thousands of successful students who have landed their dream jobs through cold emailing.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
