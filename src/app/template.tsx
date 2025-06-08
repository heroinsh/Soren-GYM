"use client";
import { motion } from "framer-motion";
import type React from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="flex-grow flex flex-col"
    >
      {children}
    </motion.div>
  );
}
