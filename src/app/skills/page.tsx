"use client";

import React from 'react';
import Navbar from '../../components/Navbar';
import { motion } from 'framer-motion';

export default function SkillsPage() {
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
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
            Our Skills & Expertise
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            The tools and talents that make our projects shine
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12">
          {/* Skills Page Content */}
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
                      <svg viewBox="0 0 300 300" className="w-full h-full">
                        {/* Gear shape */}
                        <path
                          d="M150,30 L170,30 L175,60 C185,62 194,66 202,71 L230,55 L245,70 L229,98 C234,106 238,115 240,125 L270,130 L270,150 L240,155 C238,165 234,174 229,182 L245,210 L230,225 L202,209 C194,214 185,218 175,220 L170,250 L150,250 L145,220 C135,218 126,214 118,209 L90,225 L75,210 L91,182 C86,174 82,165 80,155 L50,150 L50,130 L80,125 C82,115 86,106 91,98 L75,70 L90,55 L118,71 C126,66 135,62 145,60 L150,30 Z"
                          fill="none"
                          stroke="#be185d"
                          strokeWidth="3"
                        />
                        <circle cx="150" cy="150" r="35" fill="none" stroke="#be185d" strokeWidth="3" />
                        <text x="150" y="135" textAnchor="middle" fontSize="16" fill="#be185d" fontFamily="'Impact', sans-serif">SKILLS</text>
                        <text x="150" y="155" textAnchor="middle" fontSize="16" fill="#be185d" fontFamily="'Impact', sans-serif">BEING</text>
                        <text x="150" y="175" textAnchor="middle" fontSize="16" fill="#be185d" fontFamily="'Impact', sans-serif">CRAFTED</text>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold mb-4 font-['Impact']">Skill Set Assembly in Progress</h2>
                <p className="text-gray-600 dark:text-gray-300 font-['Lucida_Console']">
                  We're currently compiling our expertise and specialties. Soon you'll find a comprehensive
                  breakdown of our technical abilities, creative talents, and industry knowledge.
                  This section is being engineered with care - check back soon!
                </p>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}