"use client";

import React, { useState, useEffect } from 'react';
import ConfettiComponent from '../components/ConfettiComponent';
import Navbar from '../components/Navbar';
import TechCube from '../components/TechCube';
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [showContactOptions, setShowContactOptions] = useState(false);
  
  // Simple toggle function with console log for debugging
  const toggleContactOptions = () => {
    console.log("Toggle contact options:", !showContactOptions);
    setShowContactOptions(prevState => !prevState);
  };

  // Contact options data
  const contactOptions = [
    { 
      name: "Email Me", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      ),
      url: "mailto:russelltrahan1611@gmail.com",
      color: "from-blue-500 to-cyan-400" 
    },
    { 
      name: "Message Me On LinkedIn", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect width="4" height="12" x="2" y="9"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      ),
      url: "https://www.linkedin.com/messaging/compose/?recipient=russell-trahan-422504171&subject=Hello%20from%20your%20website",
      color: "from-blue-600 to-blue-400" 
    },
    { 
      name: "Add Me On Discord", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="12" r="1"/>
          <circle cx="15" cy="12" r="1"/>
          <path d="M7.5 7.5c3.5-1 5.5-1 9 0"/>
          <path d="M7 16.5c3.5 1 6.5 1 10 0"/>
          <path d="M15.5 17c0 1 1.5 3 2 3 1.5 0 2.833-1.667 3.5-3 .667-1.667.5-5.833-1.5-11.5-1.457-1.015-3-1.34-4.5-1.5l-1 2.5"/>
          <path d="M8.5 17c0 1-1.356 3-1.832 3-1.429 0-2.698-1.667-3.333-3-.635-1.667-.48-5.833 1.428-11.5C6.151 4.485 7.545 4.16 9 4l1 2.5"/>
        </svg>
      ),
      url: "https://discord.com/users/eagersnail",
      color: "from-indigo-600 to-indigo-400" 
    }
  ];

  return (
    <>
      <Navbar />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-6xl mx-auto w-full">
          <motion.div 
            className="w-full text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 mb-4">
              Eager Snail Productions
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Software engineering with a dash of fun and creativity
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
            <motion.div 
              className="flex flex-col gap-8 items-center md:items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold" id="about">About Me</h2>
              <p className="text-gray-600 dark:text-gray-300">
                I'm Russell, a software engineer passionate about building modern web applications 
                with the latest technologies. At Eager Snail Productions, I combine 
                professional expertise with creative flair.
              </p>
              
              <h2 className="text-2xl md:text-3xl font-bold mt-6" id="projects">Projects</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Check out my latest projects using Next.js, React, and other modern technologies.
                My work showcases responsive design, performance optimization, and creative UI/UX.
              </p>
              
              <div className="mt-8">
                <h3 className="text-xl font-medium mb-4">Let's Celebrate!</h3>
                <ConfettiComponent />
              </div>
            </motion.div>
            
            <motion.div 
              className="h-[400px] w-full bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              id="skills"
            >
              <div className="h-full w-full">
                <TechCube />
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="w-full mt-16 text-center relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            id="contact"
          >
            {/* Fixed height container to prevent layout shift when "Get In Touch" disappears */}
            <div className="relative h-20 mb-4"> 
              <AnimatePresence mode="wait">
                {!showContactOptions && (
                  <motion.h2 
                    className="text-2xl md:text-3xl font-bold absolute left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                  >
                    Get In Touch
                  </motion.h2>
                )}
              </AnimatePresence>
            </div>
            
            {/* Button container with fixed positioning */}
            <div className="flex justify-center gap-4 relative">
              {/* Contact options display container */}
              <AnimatePresence>
                {showContactOptions && (
                  <div 
                    className="absolute pointer-events-none" 
                    style={{ 
                      width: "300px", 
                      height: "200px", 
                      left: "42%", 
                      top: "50%", 
                      transform: "translate(-50%, -50%)"  // Center the container on the button
                    }}
                  >
                    {contactOptions.map((option, index) => {
                      // Position the buttons in a triangle around the center
                      let positionStyle;
                      
                      // Position each contact option precisely to avoid any overlap
                      if (index === 0) { // Email - Top position
                        positionStyle = {
                          left: "150px",  // Center horizontally
                          top: "0px",     // Position at the top
                        };
                      } else if (index === 1) { // LinkedIn - Bottom left
                        positionStyle = {
                          left: "50px",  // Left side
                          top: "150px",  // Bottom area
                        };
                      } else { // Discord - Bottom right
                        positionStyle = {
                          left: "250px", // Right side
                          top: "150px",  // Bottom area
                        };
                      }
                      
                      return (
                        <motion.a
                          key={option.name}
                          href={option.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`absolute p-3 rounded-full bg-gradient-to-r ${option.color} text-white font-medium hover:shadow-lg transition-all flex items-center justify-center group aspect-square w-10 h-10`}
                          style={{
                            ...positionStyle,
                            pointerEvents: "auto",
                            zIndex: 30
                          }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ 
                            opacity: 1, 
                            scale: 1,
                            transition: { 
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                              delay: index * 0.1
                            }
                          }}
                          exit={{ 
                            opacity: 0,
                            scale: 0.8,
                            transition: { duration: 0.2 }
                          }}
                          whileHover={{ 
                            scale: 1.2,
                            boxShadow: "0 0 15px rgba(123, 31, 162, 0.5)",
                            transition: { duration: 0.2 }
                          }}
                        >
                          {/* Icon only */}
                          {option.icon}
                          
                          {/* Funky Tooltip - Positioned based on button location */}
                          <motion.div 
                            className={`absolute whitespace-nowrap px-3 py-1.5 rounded-md bg-gradient-to-r ${option.color} text-white font-medium text-sm shadow-lg opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100`}
                            style={{
                              originX: 0.5,
                              originY: 1,
                              transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                              animation: "tooltipWobble 1.5s ease-in-out infinite alternate",
                              ...(() => {
                                // Position tooltips based on button position to avoid overlap
                                if (index === 0) {
                                  // Top button - tooltip above
                                  return {
                                    bottom: "calc(100% + 10px)",
                                    left: "50%",
                                    transform: "translateX(-50%)"
                                  };
                                } else if (index === 1) {
                                  // Bottom left button - tooltip to left
                                  return {
                                    right: "calc(100% + 10px)",
                                    top: "50%",
                                    transform: "translateY(-50%)"
                                  };
                                } else {
                                  // Bottom right button - tooltip to right
                                  return {
                                    left: "calc(100% + 10px)",
                                    top: "50%",
                                    transform: "translateY(-50%)"
                                  };
                                }
                              })()
                            }}
                          >
                            {option.name}
                            {/* Arrow pointing to button */}
                            <div 
                              className="absolute h-2 w-2 bg-gradient-to-r from-purple-500 to-pink-500 transform rotate-45"
                              style={{
                                ...(() => {
                                  if (index === 0) {
                                    // Top button - arrow at bottom
                                    return {
                                      bottom: "-4px",
                                      left: "50%",
                                      marginLeft: "-4px"
                                    };
                                  } else if (index === 1) {
                                    // Left button - arrow at right
                                    return {
                                      right: "-4px",
                                      top: "50%",
                                      marginTop: "-4px"
                                    };
                                  } else {
                                    // Right button - arrow at left
                                    return {
                                      left: "-4px",
                                      top: "50%",
                                      marginTop: "-4px"
                                    };
                                  }
                                })()
                              }}
                            ></div>
                          </motion.div>
                        </motion.a>
                      );
                    })}
                  </div>
                )}
              </AnimatePresence>

              {/* Contact Me / Close Options button */}
              <motion.button 
                id="contactButton"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center gap-2"
                style={{ zIndex: 20, position: "relative" }}
                onClick={toggleContactOptions}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showContactOptions ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m18 6-12 12"/>
                      <path d="m6 6 12 12"/>
                    </svg>
                    Close Options
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                    </svg>
                    Contact Me
                  </>
                )}
              </motion.button>
              
              <a
                className="px-6 py-3 rounded-full border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-medium hover:border-purple-500 hover:text-purple-500 transition-all flex items-center gap-2"
                href="https://github.com/13es42"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                  <path d="M9 18c-4.51 2-5-2-7-2"/>
                </svg>
                GitHub
              </a>
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
}