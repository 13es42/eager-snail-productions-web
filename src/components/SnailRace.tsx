"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfettiComponent from './ConfettiComponent';

// Snail character SVG component
const SnailIcon = ({ className }: { className?: string }) => (
  <svg 
    width="80" 
    height="60" 
    viewBox="0 0 80 60" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Shell */}
    <path d="M45 20C45 30 35 40 25 40C15 40 5 30 5 20C5 10 15 0 25 0C35 0 45 10 45 20Z" fill="#FFB347" />
    <path d="M42 18C42 26 34 34 26 34C18 34 10 26 10 18C10 10 18 2 26 2C34 2 42 10 42 18Z" fill="#FFCC66" />
    
    {/* Body */}
    <path d="M25 40C25 40 30 45 45 45C60 45 60 35 60 35C60 35 70 35 70 45C70 55 60 60 45 55C30 50 20 45 5 45" fill="#9ACD32" />
    
    {/* Eyes on stalks */}
    <path d="M5 45C5 45 0 40 0 35C0 30 5 30 5 30" stroke="#9ACD32" strokeWidth="3" />
    <path d="M10 45C10 45 5 35 5 30C5 25 10 25 10 25" stroke="#9ACD32" strokeWidth="3" />
    <circle cx="0" cy="30" r="2" fill="black" />
    <circle cx="5" cy="25" r="2" fill="black" />
  </svg>
);

interface SnailRaceProps {
  className?: string;
}

// SlimeTrail component for visual effects
const SlimeTrail = ({ x, color }: { x: number; color: string }) => (
  <div 
    className="absolute h-2 bottom-2 rounded-full opacity-50"
    style={{ 
      left: '10px', 
      width: `${Math.max(0, x - 10)}px`, 
      background: `linear-gradient(90deg, transparent, ${color}, transparent)` 
    }}
  />
);

const SnailRace: React.FC<SnailRaceProps> = ({ className }) => {
  const [isRacing, setIsRacing] = useState(false);
  const [finishPosition, setFinishPosition] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [snailPositions, setSnailPositions] = useState<{ [key: string]: number }>({});
  const [showConfetti, setShowConfetti] = useState(false);
  const startSoundRef = useRef<HTMLAudioElement | null>(null);
  const finishSoundRef = useRef<HTMLAudioElement | null>(null);
  const confettiRef = useRef<HTMLDivElement>(null);
  const trackContainerRef = useRef<HTMLDivElement>(null);
  
  // Determine the finish line position based on container width
  useEffect(() => {
    const handleResize = () => {
      if (trackContainerRef.current) {
        // Set finish line to 85% of the container width to ensure it's visible
        const containerWidth = trackContainerRef.current.clientWidth;
        setFinishPosition(containerWidth * 0.85 - 20); // Subtract padding/margin to ensure visibility
      }
    };
    
    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Initialize audio elements
  useEffect(() => {
    startSoundRef.current = new Audio('/sounds/race-start.mp3');
    finishSoundRef.current = new Audio('/sounds/race-finish.mp3');
    
    return () => {
      startSoundRef.current = null;
      finishSoundRef.current = null;
    };
  }, []);

  // Configure multiple snails for the race with more variety
  const snails = [
    { id: 'snail1', name: 'Zippy', color: '#FF5252', speed: 30, variability: 0.2 },
    { id: 'snail2', name: 'Turbo', color: '#4CAF50', speed: 28, variability: 0.3 },
    { id: 'snail3', name: 'Flash', color: '#2196F3', speed: 32, variability: 0.1 },
    { id: 'snail4', name: 'Speedy', color: '#9C27B0', speed: 29, variability: 0.25 },
  ];

  // Start the race with improved animation
  const startRace = () => {
    if (isRacing) return;
    
    // Reset states
    setShowConfetti(false);
    
    // Play start sound
    if (startSoundRef.current) {
      startSoundRef.current.currentTime = 0;
      startSoundRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    
    setIsRacing(true);
    setWinner(null);
    setSnailPositions({});
    
    // Calculate random finish times for each snail
    const finishTimes: { [key: string]: number } = {};
    let fastestTime = Infinity;
    let fastestSnail = null;
    
    snails.forEach(snail => {
      // Base time with randomness for more realistic racing
      const baseTime = 5000 - (snail.speed * 100);
      const randomFactor = 1 + ((Math.random() * 2 - 1) * snail.variability);
      const time = baseTime * randomFactor;
      
      finishTimes[snail.id] = time;
      
      if (time < fastestTime) {
        fastestTime = time;
        fastestSnail = snail;
      }
      
      // Update positions during race for slime trail
      const updateInterval = 50; // update every 50ms
      const steps = Math.floor(time / updateInterval);
      let currentStep = 0;
      
      const intervalId = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easedProgress = easeInOutCubic(progress);
        const position = 10 + easedProgress * (finishPosition - 70);
        
        setSnailPositions(prev => ({
          ...prev,
          [snail.id]: position
        }));
        
        if (currentStep >= steps) {
          clearInterval(intervalId);
        }
      }, updateInterval);
    });
    
    // Announce winner after race is done
    setTimeout(() => {
      if (fastestSnail) {
        setWinner(fastestSnail.name);
        
        // Play finish sound
        if (finishSoundRef.current) {
          finishSoundRef.current.currentTime = 0;
          finishSoundRef.current.play().catch(e => console.log("Audio play failed:", e));
        }
        
        // Trigger confetti celebration
        setShowConfetti(true);
      }
      
      setIsRacing(false);
    }, fastestTime + 500); // Add a small delay after fastest snail finishes
  };
  
  // Custom easing function for more realistic snail movement
  const easeInOutCubic = (x: number): number => {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  };

  return (
    <div ref={trackContainerRef} className={`relative w-full overflow-hidden ${className}`}>
      {/* Audio elements - hidden */}
      <div className="sr-only">
        <audio ref={startSoundRef} preload="auto" />
        <audio ref={finishSoundRef} preload="auto" />
      </div>
      
      {/* Race track */}
      <div className="relative w-full h-96 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-inner p-4">
        {/* Confetti celebration when a snail wins */}
        {showConfetti && <div className="absolute inset-0 z-50 pointer-events-none">
          <ConfettiComponent autoFire={true} hideButton={true} />
        </div>}
        
        {/* Track texture */}
        <div className="absolute inset-0 opacity-10" 
             style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'1\' fill=\'%23000\'/%3E%3C/svg%3E")'}} />
        
        {/* Starting line */}
        <div className="absolute top-0 left-10 h-full w-1 bg-white dark:bg-gray-600 z-10">
          <div className="absolute top-0 left-0 h-full w-4 flex items-center justify-center">
            <div className="h-full w-4 bg-white/30 dark:bg-gray-600/30 backdrop-blur-sm rounded flex items-center justify-center">
              <span className="text-sm font-bold text-gray-800 dark:text-white rotate-90 whitespace-nowrap">START</span>
            </div>
          </div>
        </div>
        
        {/* Finish line */}
        <div 
          className="absolute top-0 h-full w-1 bg-red-500 z-10"
          style={{ left: `${finishPosition}px` }}
        >
          <div className="absolute top-0 left-0 h-full w-4 flex items-center justify-center">
            <div className="h-full w-4 bg-red-500/30 backdrop-blur-sm rounded flex items-center justify-center">
              <span className="text-sm font-bold text-white rotate-90 whitespace-nowrap">FINISH</span>
            </div>
          </div>
          
          {/* Checkered finish flag pattern */}
          <div 
            className="absolute top-0 left-0 h-full w-6 overflow-hidden"
            style={{ 
              backgroundImage: `repeating-linear-gradient(
                0deg,
                #000000 0px,
                #000000 10px,
                #ffffff 10px,
                #ffffff 20px
              )`,
              left: '-3px'
            }}
          ></div>
          
          {/* Finish line animation effect */}
          <motion.div
            className="absolute top-0 left-0 w-1 h-full bg-yellow-300 opacity-80"
            animate={{
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop"
            }}
          ></motion.div>
          
          {/* Finish banner */}
          <div className="absolute top-4 -left-14 w-28 rounded-full bg-red-600 px-2 py-1 shadow-lg transform -rotate-12">
            <span className="text-white text-xs font-bold text-center block">FINISH LINE</span>
          </div>
        </div>
        
        {/* Snail lanes */}
        <div className="relative h-full flex flex-col justify-around">
          {snails.map((snail, index) => {
            const snailX = snailPositions[snail.id] || 10;
            
            return (
              <div key={snail.id} className="relative h-16 flex items-center">
                {/* Lane marker */}
                <div className="absolute top-0 left-0 w-full h-0.5 border-t border-dashed border-gray-300 dark:border-gray-700"></div>
                
                {/* Slime trail effect */}
                <SlimeTrail x={snailX} color={snail.color} />
                
                {/* Snail name tag - repositioned to be visible and not covered by start line */}
                <div className="absolute left-16 top-0 bg-white dark:bg-gray-900 px-2 -translate-y-1/2 text-xs font-medium rounded shadow-sm z-20">
                  {snail.name}
                </div>
                
                {/* Animated snail */}
                <motion.div
                  initial={{ x: 10 }}
                  animate={{ x: snailX }}
                  className="relative z-20 transform-gpu"
                >
                  <motion.div
                    animate={isRacing ? { 
                      rotateY: [0, 10, 0, -10, 0],
                      scale: [1, 1.05, 1, 0.95, 1]
                    } : {}}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2,
                      ease: "easeInOut" 
                    }}
                  >
                    <SnailIcon className="w-12 h-12" />
                    <div 
                      className="absolute inset-0 w-full h-full opacity-70 mix-blend-overlay"
                      style={{ backgroundColor: snail.color }}
                    ></div>
                  </motion.div>
                </motion.div>
                
                {/* Finish indicator */}
                {winner === snail.name && (
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute z-30"
                    style={{ left: `${finishPosition - 20}px` }}
                  >
                    <div className="bg-yellow-400 text-yellow-900 p-1 rounded-full shadow-lg">
                      🏆
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Confetti container for winner celebration */}
        <div ref={confettiRef} className="absolute inset-0 pointer-events-none z-40"></div>
        
        {/* Race controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3">
          <motion.button
            onClick={startRace}
            disabled={isRacing}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-full shadow-lg disabled:opacity-50 transition-all"
            whileHover={!isRacing ? { scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)" } : {}}
            whileTap={!isRacing ? { scale: 0.95 } : {}}
          >
            {isRacing ? 'Race in progress...' : 'Start Race!'}
          </motion.button>
          
          {/* Winner announcement */}
          <AnimatePresence>
            {winner && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center"
              >
                <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-yellow-900 rounded-full text-sm font-bold shadow-xl flex items-center">
                  <span className="mr-2">🎉</span>
                  {winner} wins the race!
                  <span className="ml-2">🎉</span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SnailRace;