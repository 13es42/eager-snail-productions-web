"use client";

import React from 'react';
import Navbar from '../../components/Navbar';
import { motion } from 'framer-motion';

export default function ProjectsPage() {
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
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-500 to-yellow-400 text-transparent bg-clip-text">
            Eager Snail Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Explore our creative endeavors and innovations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12">
          {/* Projects Page Content */}
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
                      <div className="relative w-full h-full">
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                          <svg viewBox="0 0 200 200" className="w-full h-full">
                            <polygon 
                              points="100,10 40,180 190,60 10,60 160,180" 
                              fill="none"
                              stroke="#eab308"
                              strokeWidth="3"
                              strokeLinejoin="round"
                            />
                            <text x="100" y="85" textAnchor="middle" fontSize="14" fill="#eab308" fontFamily="'Trebuchet MS', sans-serif">COMING</text>
                            <text x="100" y="105" textAnchor="middle" fontSize="14" fill="#eab308" fontFamily="'Trebuchet MS', sans-serif">SOON</text>
                            <text x="100" y="125" textAnchor="middle" fontSize="10" fill="#eab308" fontFamily="'Trebuchet MS', sans-serif">STAY TUNED!</text>
                          </svg>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center animate-spin-slow">
                          <div className="w-12 h-12 rounded-full border-4 border-yellow-400 border-t-transparent"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold mb-4 font-['Trebuchet_MS']">Project Showcase Loading...</h2>
                <p className="text-gray-600 dark:text-gray-300 font-['Arial_Rounded_MT_Bold']">
                  Our project portfolio is under construction. We're gathering our best work to share with you.
                  Check back soon to see the amazing projects we've been working on!
                </p>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}