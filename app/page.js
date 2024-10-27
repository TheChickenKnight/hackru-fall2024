"use client"
import Image from 'next/image';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function App() {
  useEffect(() => {
    document.body.style.backgroundColor = '#f0f4f8'; // Light background color
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 sm:p-20 font-sans">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="mb-8"
      >
        <Image src="/logo.png" alt="Logo" width={300} height={300} />
      </motion.div>
      <h1 className="text-6xl sm:text-8xl text-gray-800 font-bold mb-8">
        Alzheimer&apos;s and Dyslexia: AlzAid
      </h1>
      <div className="text-gray-700 flex gap-4 items-center flex-col sm:flex-row">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Get Started
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
          Learn More
        </button>
      </div>
    </div>
  );
}