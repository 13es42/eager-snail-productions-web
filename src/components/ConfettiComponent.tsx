"use client";

import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { motion } from 'framer-motion';

interface ConfettiComponentProps {
  autoFire?: boolean;
  hideButton?: boolean;
}

const ConfettiComponent: React.FC<ConfettiComponentProps> = ({ autoFire = false, hideButton = false }) => {
    const { width, height } = useWindowSize();
    const [isConfettiVisible, setIsConfettiVisible] = useState(false);
    const [leftCannonWind, setLeftCannonWind] = useState(1.0);
    const [rightCannonWind, setRightCannonWind] = useState(-1.0);
    const [gravity, setGravity] = useState(-1.5);
    const [buttonClicked, setButtonClicked] = useState(false);

    useEffect(() => {
        if (autoFire) {
            setTimeout(() => {
                fireConfetti();
            }, 800);
        }
    }, [autoFire]);

    const setSlowFall = () => {
        setLeftCannonWind(0);
        setRightCannonWind(0);
        setGravity(0.75);
    }

    const resetVelocities = () => {
        setLeftCannonWind(1.0);
        setRightCannonWind(-1.0);
        setGravity(-1.0);
    }

    const onConfettiComplete = () => {
        setIsConfettiVisible(false);
        resetVelocities();
        setButtonClicked(false);
    };

    const fireConfetti = () => {
        setIsConfettiVisible(true);
        setButtonClicked(true);
        setTimeout(() => setSlowFall(), 1500);
    };

    return (
        <div className="relative">
            {isConfettiVisible && (
                <div className="fixed inset-0 pointer-events-none z-50">
                    <Confetti
                        width={width}
                        height={height}
                        numberOfPieces={150}
                        wind={leftCannonWind}
                        gravity={gravity}
                        confettiSource={{ x: 0, y: height, w: 5, h: 5 }}
                        friction={1}
                        recycle={false}
                        onConfettiComplete={onConfettiComplete}
                        colors={['#FF1493', '#4B0082', '#9B30FF', '#FFD700', '#00BFFF']}
                    />
                    <Confetti
                        width={width}
                        height={height}
                        numberOfPieces={150}
                        wind={rightCannonWind}
                        gravity={gravity}
                        confettiSource={{ x: width, y: height, w: 5, h: 5 }}
                        friction={1}
                        recycle={false}
                        onConfettiComplete={onConfettiComplete}
                        colors={['#FF1493', '#4B0082', '#9B30FF', '#FFD700', '#00BFFF']}
                    />
                </div>
            )}
            {!hideButton && (
                <motion.button
                    onClick={fireConfetti}
                    disabled={buttonClicked}
                    className={`px-6 py-3 rounded-full font-medium relative overflow-hidden transition-all duration-300 ${
                        buttonClicked 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-purple-600 to-pink-500 hover:shadow-lg hover:shadow-purple-500/30 text-white'
                    }`}
                    whileHover={buttonClicked ? {} : { scale: 1.05 }}
                    whileTap={buttonClicked ? {} : { scale: 0.95 }}
                >
                    {buttonClicked ? "Woohoo!" : "Fire Confetti!"}
                    {buttonClicked && (
                        <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-500/20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    )}
                </motion.button>
            )}
        </div>
    );
};

export default ConfettiComponent;


