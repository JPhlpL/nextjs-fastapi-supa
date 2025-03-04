"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const ComingSoon: React.FC = () => {
  const text = "Coming Soon";

  const letterVariants = {
    initial: { opacity: 0.6, textShadow: "0 0 4px rgba(220, 38, 38, 0.1)" }, // Lighter text shadow
    animate: { 
      opacity: 1, 
      textShadow: "0 0 4px rgba(220, 38, 38, 0.3), 0 0 8px rgba(220, 38, 38, 0.2)", // Lighter shadow
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
      } as const
    }
  };

  // Prevent scrolling when this component is mounted
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto'; // Restore scrolling when unmounted
    };
  }, []);

  return (
    <div className="bg-gradient-to-br">
      <motion.h1 
        className="text-[5vw] md:text-[4vw] lg:text-[3vw] font-bold mb-4 text-red-500" // Slightly lighter red
        initial="initial"
        animate="animate"
      >
        {text.split('  ').map((char, index) => (
           <motion.span
           key={`${char}-${index}`}
           variants={letterVariants}
           style={{ display: 'inline-block' }}
           transition={{ delay: index * 0.1 }}
         >
           {char}
         </motion.span>
        ))}
      </motion.h1>
      <motion.p 
        className="text-[2vw] md:text-[1vw] lg:text-[1vw] text-gray-600" // Responsive text size
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        We`re crafting something extraordinary for you
      </motion.p>
    </div>
  );
};

export default ComingSoon;