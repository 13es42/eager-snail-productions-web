"use client";

import React from 'react';
import Navbar from '../../components/Navbar';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-teal-500 text-transparent bg-clip-text">
            About Eager Snail Productions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Get to know the team behind the magic
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12">
          {/* About Page Content */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-8">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="relative mb-8">
                  <div className="w-64 h-64 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-full h-full rotate-12">
                        <path
                          d="M25,2 L75,2 A8,8 0 0,1 83,10 L83,90 A8,8 0 0,1 75,98 L25,98 A8,8 0 0,1 17,90 L17,10 A8,8 0 0,1 25,2 Z"
                          fill="none"
                          stroke="#f97316"
                          strokeWidth="2"
                        />
                        <text x="50" y="30" textAnchor="middle" fontSize="10" fill="#f97316" fontFamily="'Comic Sans MS', cursive" transform="rotate(15, 50, 50)">UNDER</text>
                        <text x="50" y="45" textAnchor="middle" fontSize="10" fill="#f97316" fontFamily="'Comic Sans MS', cursive" transform="rotate(15, 50, 50)">CONSTRUCTION</text>
                        <path d="M30,60 L70,60" stroke="#f97316" strokeWidth="2" strokeLinecap="round" transform="rotate(15, 50, 50)" />
                        <path d="M30,70 L70,70" stroke="#f97316" strokeWidth="2" strokeLinecap="round" transform="rotate(15, 50, 50)" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold mb-4 font-['Comic_Sans_MS']">Our Story Coming Soon!</h2>
                <p className="text-gray-600 dark:text-gray-300 font-['Courier_New']">
                  We're hard at work crafting our company story. Check back soon to learn about our journey,
                  mission, values, and the amazing people behind Eager Snail Productions!
                </p>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}