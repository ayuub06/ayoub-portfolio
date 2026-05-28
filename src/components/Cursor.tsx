'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function Cursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const updatePosition = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  const updateCursorType = useCallback(() => {
    const el = document.elementFromPoint(position.x, position.y);
    if (el) {
      const computed = window.getComputedStyle(el as Element);
      setIsPointer(computed.cursor === 'pointer');
    }
  }, [position.x, position.y]);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    setIsVisible(true);
    document.body.classList.add('custom-cursor-active');

    window.addEventListener('mousemove', updatePosition);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [updatePosition]);

  useEffect(() => {
    updateCursorType();
  }, [updateCursorType]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      >
        <div
          className="w-10 h-10 rounded-full border border-cyan-400/50 transition-all duration-200"
          style={{
            background: isPointer ? 'rgba(34, 211, 238, 0.08)' : 'transparent',
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: position.x - 3,
          y: position.y - 3,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
      </motion.div>
    </>
  );
}