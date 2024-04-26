"use client";

import { motion } from "framer-motion";

interface MotionProps {
  children: React.ReactNode;
  delay?: number;
}

export default function Motion({ children, delay }: MotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay }}>
      {children}
    </motion.div>
  );
}
