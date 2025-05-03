"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useWindowSize } from 'react-use';
import ConfettiComponent from './ConfettiComponent';

interface PinballGameProps {
  className?: string;
}

const PinballGame: React.FC<PinballGameProps> = ({ className }) => {
  // Game state
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [ballInPlay, setBallInPlay] = useState(false);
  const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });
  const [leftFlipperActive, setLeftFlipperActive] = useState(false);
  const [rightFlipperActive, setRightFlipperActive] = useState(false);
  const [highScore, setHighScore] = useState(0);
  
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const gameBoardRef = useRef<HTMLDivElement>(null);
  const leftFlipperRef = useRef<HTMLDivElement>(null);
  const rightFlipperRef = useRef<HTMLDivElement>(null);
  
  // Animations
  const ballAnimation = useAnimation();
  const leftFlipperAnimation = useAnimation();
  const rightFlipperAnimation = useAnimation();
  
  // Window size for responsive design
  const { width } = useWindowSize();
  const gameWidth = Math.min(500, width - 40);
  const gameHeight = gameWidth * 1.6;
  
  // Sound effects
  const flipperSoundRef = useRef<HTMLAudioElement | null>(null);
  const bumperSoundRef = useRef<HTMLAudioElement | null>(null);
  const pointSoundRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio
  useEffect(() => {
    // We're creating "virtual" audio instances without actual files yet
    flipperSoundRef.current = new Audio();
    bumperSoundRef.current = new Audio();
    pointSoundRef.current = new Audio();
    
    return () => {
      flipperSoundRef.current = null;
      bumperSoundRef.current = null;
      pointSoundRef.current = null;
    };
  }, []);
  
  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameActive) return;
      
      if (e.key === 'z' || e.key === 'ArrowLeft') {
        setLeftFlipperActive(true);
        // Left flipper goes from 10 deg (down) to -20 deg (up)
        leftFlipperAnimation.start({ rotate: -20, transition: { type: 'spring', stiffness: 500 } });
        playFlipperSound();
      }
      
      if (e.key === 'm' || e.key === 'ArrowRight') {
        setRightFlipperActive(true);
        // Right flipper goes from -10 deg (down) to 20 deg (up)
        rightFlipperAnimation.start({ rotate: 20, transition: { type: 'spring', stiffness: 500 } });
        playFlipperSound();
      }
      
      // Space to launch ball
      if (e.key === ' ' && gameActive && !ballInPlay) {
        launchBall();
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'z' || e.key === 'ArrowLeft') {
        setLeftFlipperActive(false);
        // Return to resting position
        leftFlipperAnimation.start({ rotate: 10, transition: { type: 'spring', stiffness: 300 } });
      }
      
      if (e.key === 'm' || e.key === 'ArrowRight') {
        setRightFlipperActive(false);
        // Return to resting position
        rightFlipperAnimation.start({ rotate: -10, transition: { type: 'spring', stiffness: 300 } });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameActive, ballInPlay, leftFlipperAnimation, rightFlipperAnimation]);
  
  // Play sound effects
  const playFlipperSound = () => {
    if (flipperSoundRef.current) {
      flipperSoundRef.current.currentTime = 0;
      flipperSoundRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };
  
  const playBumperSound = () => {
    if (bumperSoundRef.current) {
      bumperSoundRef.current.currentTime = 0;
      bumperSoundRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };
  
  const playPointSound = () => {
    if (pointSoundRef.current) {
      pointSoundRef.current.currentTime = 0;
      pointSoundRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };
  
  // Game logic
  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setShowConfetti(false);
    setBallInPlay(false);
    
    // Position ball in the launch lane
    setBallPosition({ x: gameWidth - 25, y: gameHeight - 50 });
  };
  
  const launchBall = () => {
    if (!gameActive || ballInPlay) return;
    
    // Play launch sound
    playBumperSound();
    
    // Set initial ball position in the launch lane
    const launchX = gameWidth - 25;
    const launchY = gameHeight - 50;
    setBallPosition({ x: launchX, y: launchY });
    
    // Add a slight delay before launching to make the ball visible in the launch position
    setTimeout(() => {
      setBallInPlay(true);
      
      // Animate the ball being launched with stronger, more visible initial velocity
      const initialVelocity = -18 - Math.random() * 5; // Stronger upward velocity
      
      // Set up a simple physics animation
      let velocity = { x: (Math.random() - 0.5) * 2, y: initialVelocity };
      let position = { x: launchX, y: launchY };
      let lastTime = Date.now();
      
      // Visual indication of launch with ball animation
      ballAnimation.start({
        scale: [1, 1.2, 1],
        transition: { duration: 0.3 }
      });
      
      const updateBallPosition = () => {
        if (!gameActive || !ballInPlay) return;
        
        const now = Date.now();
        const deltaTime = (now - lastTime) / 16; // Normalize to ~60fps
        lastTime = now;
        
        // Apply gravity
        velocity.y += 0.2 * deltaTime;
        
        // Update position
        position.x += velocity.x * deltaTime;
        position.y += velocity.y * deltaTime;
        
        // Boundary collisions
        if (position.x < 0) {
          position.x = 0;
          velocity.x = Math.abs(velocity.x) * 0.8; // Bounce with damping
          playBumperSound();
        }
        
        if (position.x > gameWidth - 30) {
          position.x = gameWidth - 30;
          velocity.x = -Math.abs(velocity.x) * 0.8; // Bounce with damping
          playBumperSound();
        }
        
        if (position.y < 0) {
          position.y = 0;
          velocity.y = Math.abs(velocity.y) * 0.8; // Bounce with damping
          playBumperSound();
          
          // Add points when hitting the top
          addPoints(50);
        }
        
        // Check for flipper collisions
        if (leftFlipperActive && 
            position.x < gameWidth * 0.4 && 
            position.y > gameHeight - 100 && 
            position.y < gameHeight - 50) {
          velocity.y = -Math.abs(velocity.y) * 1.2; // Strong bounce up
          velocity.x += 2; // Push right (since the pivot is now on the left)
          playFlipperSound();
          addPoints(10);
        }
        
        if (rightFlipperActive && 
            position.x > gameWidth * 0.6 - 30 && 
            position.y > gameHeight - 100 && 
            position.y < gameHeight - 50) {
          velocity.y = -Math.abs(velocity.y) * 1.2; // Strong bounce up
          velocity.x -= 2; // Push left (since the pivot is now on the right)
          playFlipperSound();
          addPoints(10);
        }
        
        // Ball lost (fell through bottom)
        if (position.y > gameHeight) {
          endGame();
          return;
        }
        
        // Check for bumper collisions (3 circle bumpers)
        const bumpers = [
          { x: gameWidth * 0.3, y: gameHeight * 0.3, radius: 20 },
          { x: gameWidth * 0.7, y: gameHeight * 0.2, radius: 20 },
          { x: gameWidth * 0.5, y: gameHeight * 0.5, radius: 20 },
        ];
        
        for (const bumper of bumpers) {
          const dx = position.x + 15 - bumper.x;
          const dy = position.y + 15 - bumper.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < bumper.radius + 15) { // Ball radius is 15
            // Normalize the collision vector
            const nx = dx / distance;
            const ny = dy / distance;
            
            // Reflect velocity vector
            const dotProduct = velocity.x * nx + velocity.y * ny;
            velocity.x = velocity.x - 2 * dotProduct * nx;
            velocity.y = velocity.y - 2 * dotProduct * ny;
            
            // Add some energy and move ball outside the bumper
            const bounceFactor = 1.2;
            velocity.x *= bounceFactor;
            velocity.y *= bounceFactor;
            
            position.x = bumper.x - nx * (bumper.radius + 15);
            position.y = bumper.y - ny * (bumper.radius + 15);
            
            playBumperSound();
            addPoints(100);
            break;
          }
        }
        
        // Update ball position
        setBallPosition(position);
        
        // Continue animation
        requestAnimationFrame(updateBallPosition);
      };
      
      requestAnimationFrame(updateBallPosition);
    }, 500); // Half second delay to see the ball in launch position
  };
  
  const addPoints = (points: number) => {
    setScore(prevScore => prevScore + points);
    playPointSound();
  };
  
  const endGame = () => {
    setBallInPlay(false);
    
    // Check for high score
    if (score > highScore) {
      setHighScore(score);
      setShowConfetti(true);
    }
  };
  
  return (
    <div ref={containerRef} className={`flex flex-col items-center ${className}`}>
      {/* Confetti effect for high score */}
      {showConfetti && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          <ConfettiComponent autoFire={true} hideButton={true} />
        </div>
      )}
      
      {/* Acadiana Pinball Link */}
      <a 
        href="https://acadianapinball.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group mb-4 inline-flex items-center px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300"
      >
        <span className="mr-2 text-lg">🎮</span>
        Visit Acadiana Pinball
        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
        </svg>
      </a>
      
      {/* Game controls */}
      <div className="mb-4 flex items-center gap-4">
        <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
          <span className="font-bold text-lg">Score: {score}</span>
        </div>
        
        <motion.button
          onClick={startGame}
          disabled={gameActive && ballInPlay}
          className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-md disabled:opacity-70 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {gameActive ? (ballInPlay ? 'Ball in Play' : 'Launch Ball') : 'Start Game'}
        </motion.button>
        
        <div className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-900 rounded-lg shadow-sm">
          <span className="font-bold">High Score: {highScore}</span>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="mb-4 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-lg text-sm">
        <p><strong>Controls:</strong> Use Z/Left and M/Right arrow keys for flippers. Space to launch ball.</p>
      </div>
      
      {/* Game board */}
      <div 
        ref={gameBoardRef}
        className="relative bg-gradient-to-b from-purple-900 to-indigo-800 rounded-t-3xl overflow-hidden shadow-xl border-4 border-t-0 border-gray-800"
        style={{ 
          width: `${gameWidth}px`, 
          height: `${gameHeight}px`,
        }}
      >
        {/* Ball */}
        {gameActive && (
          <motion.div
            ref={ballRef}
            className="absolute rounded-full shadow-lg bg-gradient-to-r from-silver-300 to-gray-100"
            style={{
              width: '30px',
              height: '30px',
              left: ballPosition.x,
              top: ballPosition.y,
              zIndex: 20,
            }}
            animate={ballAnimation}
          />
        )}
        
        {/* Snail Shell Bumpers with improved number visibility */}
        <div 
          className="absolute rounded-full bg-gradient-to-r from-amber-300 to-amber-500 shadow-lg flex items-center justify-center border-2 border-amber-600 overflow-hidden"
          style={{ 
            width: '50px', 
            height: '50px',
            left: `${gameWidth * 0.3 - 25}px`,
            top: `${gameHeight * 0.3 - 25}px`,
          }}
        >
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 45 45" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="transform rotate-45"
          >
            <path d="M40 20C40 30 30 40 20 40C10 40 0 30 0 20C0 10 10 0 20 0C30 0 40 10 40 20Z" fill="#FFB347" />
            <path d="M37 18C37 26 29 34 21 34C13 34 5 26 5 18C5 10 13 2 21 2C29 2 37 10 37 18Z" fill="#FFCC66" />
          </svg>
          <div className="absolute w-full h-full flex items-center justify-center">
            <div className="bg-purple-900 rounded-full w-5/12 h-5/12 flex items-center justify-center shadow-md border border-white">
              <span className="text-white text-xs font-bold">100</span>
            </div>
          </div>
        </div>
        
        <div 
          className="absolute rounded-full bg-gradient-to-r from-amber-300 to-amber-500 shadow-lg flex items-center justify-center border-2 border-amber-600 overflow-hidden"
          style={{ 
            width: '50px', 
            height: '50px',
            left: `${gameWidth * 0.7 - 25}px`,
            top: `${gameHeight * 0.2 - 25}px`,
          }}
        >
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 45 45" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="transform -rotate-45"
          >
            <path d="M40 20C40 30 30 40 20 40C10 40 0 30 0 20C0 10 10 0 20 0C30 0 40 10 40 20Z" fill="#FFB347" />
            <path d="M37 18C37 26 29 34 21 34C13 34 5 26 5 18C5 10 13 2 21 2C29 2 37 10 37 18Z" fill="#FFCC66" />
          </svg>
          <div className="absolute w-full h-full flex items-center justify-center">
            <div className="bg-purple-900 rounded-full w-5/12 h-5/12 flex items-center justify-center shadow-md border border-white">
              <span className="text-white text-xs font-bold">100</span>
            </div>
          </div>
        </div>
        
        <div 
          className="absolute rounded-full bg-gradient-to-r from-amber-300 to-amber-500 shadow-lg flex items-center justify-center border-2 border-amber-600 overflow-hidden"
          style={{ 
            width: '50px', 
            height: '50px',
            left: `${gameWidth * 0.5 - 25}px`,
            top: `${gameHeight * 0.5 - 25}px`,
          }}
        >
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 45 45" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M40 20C40 30 30 40 20 40C10 40 0 30 0 20C0 10 10 0 20 0C30 0 40 10 40 20Z" fill="#FFB347" />
            <path d="M37 18C37 26 29 34 21 34C13 34 5 26 5 18C5 10 13 2 21 2C29 2 37 10 37 18Z" fill="#FFCC66" />
          </svg>
          <div className="absolute w-full h-full flex items-center justify-center">
            <div className="bg-purple-900 rounded-full w-5/12 h-5/12 flex items-center justify-center shadow-md border border-white">
              <span className="text-white text-xs font-bold">100</span>
            </div>
          </div>
        </div>
        
        {/* Flippers - redesigned to look more realistic */}
        <motion.div
          ref={leftFlipperRef}
          className="absolute bg-gradient-to-r from-orange-400 to-orange-600 origin-left shadow-lg"
          style={{ 
            width: '100px', 
            height: '25px',
            left: `${gameWidth * 0.15}px`,
            top: `${gameHeight - 70}px`,
            transformOrigin: 'left center',
            zIndex: 10,
            borderRadius: '25px 5px 5px 25px',
            transform: 'rotate(10deg)', // Initial downward angle
          }}
          animate={leftFlipperAnimation}
          onTapStart={() => {
            setLeftFlipperActive(true);
            leftFlipperAnimation.start({ rotate: -20, transition: { type: 'spring', stiffness: 500 } });
            playFlipperSound();
          }}
          onTapEnd={() => {
            setLeftFlipperActive(false);
            leftFlipperAnimation.start({ rotate: 10, transition: { type: 'spring', stiffness: 300 } });
          }}
        />
        
        <motion.div
          ref={rightFlipperRef}
          className="absolute bg-gradient-to-r from-orange-400 to-orange-600 origin-right shadow-lg"
          style={{ 
            width: '100px', 
            height: '25px',
            left: `${gameWidth * 0.85 - 100}px`,
            top: `${gameHeight - 70}px`,
            transformOrigin: 'right center',
            zIndex: 10,
            borderRadius: '5px 25px 25px 5px',
            transform: 'rotate(-10deg)', // Initial downward angle
          }}
          animate={rightFlipperAnimation}
          onTapStart={() => {
            setRightFlipperActive(true);
            rightFlipperAnimation.start({ rotate: 20, transition: { type: 'spring', stiffness: 500 } });
            playFlipperSound();
          }}
          onTapEnd={() => {
            setRightFlipperActive(false);
            rightFlipperAnimation.start({ rotate: -10, transition: { type: 'spring', stiffness: 300 } });
          }}
        />
        
        {/* Launch area with plunger mechanism */}
        <div 
          className="absolute rounded-lg bg-gradient-to-b from-gray-700 to-gray-900"
          style={{ 
            width: '30px', 
            height: '150px',
            right: '10px',
            bottom: '20px',
          }}
        >
          {/* Plunger mechanism */}
          <div className="absolute left-0 bottom-0 w-full flex flex-col items-center">
            <div className="w-6 h-16 bg-gradient-to-b from-gray-600 to-gray-800 rounded-t-md border border-gray-700 border-b-0 relative overflow-hidden">
              {/* Plunger spring */}
              <div className="absolute left-0 bottom-0 w-full">
                <div className="w-full h-1 bg-gray-500 mb-0.5"></div>
                <div className="w-full h-1 bg-gray-500 mb-0.5"></div>
                <div className="w-full h-1 bg-gray-500 mb-0.5"></div>
                <div className="w-full h-1 bg-gray-500 mb-0.5"></div>
              </div>
              
              {/* Plunger handle */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full border-2 border-red-700"></div>
            </div>
            
            {/* Launch guide line */}
            <div className="h-20 w-0.5 bg-gray-400/30"></div>
          </div>
        </div>
        
        {/* Ball launch effect - appears when ball is launching */}
        {ballInPlay && (
          <motion.div
            className="absolute right-[25px] bottom-[170px] w-2 bg-yellow-400/50"
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: [0, 100, 0], 
              opacity: [0, 1, 0],
              y: [0, -50, -100]
            }}
            transition={{ duration: 0.5 }}
          />
        )}
        
        {/* Game guides/walls */}
        <div 
          className="absolute bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg"
          style={{ 
            width: '10px', 
            height: `${gameHeight * 0.7}px`,
            left: '0px',
            top: '0px',
          }}
        />
        
        <div 
          className="absolute bg-gradient-to-r from-gray-800 to-gray-600 rounded-lg"
          style={{ 
            width: '10px', 
            height: `${gameHeight * 0.7}px`,
            right: '0px',
            top: '0px',
          }}
        />
        
        {/* Bottom curves for flippers */}
        <div 
          className="absolute bg-gradient-to-b from-gray-700 to-gray-900 rounded-full"
          style={{ 
            width: `${gameWidth * 0.3}px`, 
            height: `${gameWidth * 0.3}px`,
            left: '0px',
            bottom: `-${gameWidth * 0.15}px`,
          }}
        />
        
        <div 
          className="absolute bg-gradient-to-b from-gray-700 to-gray-900 rounded-full"
          style={{ 
            width: `${gameWidth * 0.3}px`, 
            height: `${gameWidth * 0.3}px`,
            right: '0px',
            bottom: `-${gameWidth * 0.15}px`,
          }}
        />
        
        {/* Game title */}
        <div 
          className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white font-bold text-center"
        >
          <h3 className="text-xl mb-1 glow">EAGER SNAIL</h3>
          <p className="text-sm glow">PINBALL</p>
        </div>
        
        {!gameActive && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white z-30">
            <h2 className="text-2xl mb-2 glow">Eager Snail Pinball</h2>
            <p className="mb-4">Click Start Game to play!</p>
            <motion.button
              onClick={startGame}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold rounded-full shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Game
            </motion.button>
          </div>
        )}
        
        {gameActive && !ballInPlay && (
          <motion.button
            onClick={launchBall}
            className="absolute bottom-24 right-16 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-full shadow-lg z-30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Launch Ball
          </motion.button>
        )}
      </div>
      
      {/* Additional information */}
      <div className="mt-6 text-center max-w-md">
        <h3 className="text-lg font-bold mb-2">About Acadiana Pinball</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Acadiana Pinball is a community dedicated to the preservation and enjoyment of pinball machines in Lafayette, Louisiana and surrounding areas.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Visit their website for events, locations, and to connect with other pinball enthusiasts!
        </p>
      </div>
    </div>
  );
};

export default PinballGame;