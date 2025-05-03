"use client";

import React from 'react';
import Navbar from '../../components/Navbar';
import SnailRace from '../../components/SnailRace';
import PinballGame from '../../components/PinballGame';
import { motion } from 'framer-motion';

export default function GamesPage() {
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
            Eager Snail Games
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Enjoy our collection of fun and interactive games!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12">
          {/* Snail Race Game Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Snail Race</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Watch these colorful snails race to the finish line! Which one will be the champion?
              </p>
              
              {/* SnailRace Component Integration */}
              <SnailRace className="mb-4" />
            </div>
          </motion.section>
          
          {/* Pinball Game Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Eager Snail Pinball: Still In Progress...</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Test your skills with our virtual pinball game! Control the flippers, hit the bumpers, and connect with Acadiana Pinball enthusiasts!
              </p>
              
              {/* PinballGame Component Integration */}
              <PinballGame className="mb-4" />
            </div>
          </motion.section>
          
          {/* More Games Teaser */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden p-6"
          >
            <h2 className="text-2xl font-bold mb-4">More Games Coming Soon!</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We're working on more exciting games. Check back soon for updates!
            </p>
          </motion.section>
        </div>
      </div>
    </main>
  );
}