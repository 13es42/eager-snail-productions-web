"use client";

import React from 'react';
import Navbar from '../../components/Navbar';
import { motion } from 'framer-motion';

export default function ContactPage() {
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
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-500 to-blue-600 text-transparent bg-clip-text">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            We'd love to hear from you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12">
          {/* Contact Page Content */}
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
                        {/* Envelope icon */}
                        <rect x="50" y="80" width="200" height="140" fill="none" stroke="#2563eb" strokeWidth="3" />
                        <path d="M50,80 L150,160 L250,80" fill="none" stroke="#2563eb" strokeWidth="3" />
                        <path d="M50,220 L120,160" fill="none" stroke="#2563eb" strokeWidth="3" />
                        <path d="M250,220 L180,160" fill="none" stroke="#2563eb" strokeWidth="3" />
                        <text x="150" y="140" textAnchor="middle" fontSize="20" fill="#2563eb" fontFamily="'Comic Sans MS', cursive">COMING</text>
                        <text x="150" y="165" textAnchor="middle" fontSize="20" fill="#2563eb" fontFamily="'Comic Sans MS', cursive">SOON</text>
                        <text x="150" y="190" textAnchor="middle" fontSize="14" fill="#2563eb" fontFamily="'Comic Sans MS', cursive">📨</text>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold mb-4 font-['Comic_Sans_MS']">Contact Form Under Construction</h2>
                <p className="text-gray-600 dark:text-gray-300 font-['Comic_Sans_MS']">
                  We're building our contact page to make sure we can efficiently receive your messages and inquiries.
                  In the meantime, please check back soon for our contact details and messaging system.
                  We can't wait to connect with you!
                </p>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}