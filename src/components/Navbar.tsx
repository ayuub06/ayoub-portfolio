'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, PROFILE } from '@/data/portfolio';
import { useScrollSpy, useScrollY } from '@/hooks/index';
import { scrollTo } from '@/utils/index';
import { navItem } from '@/animations/variants';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollY = useScrollY();
  const ids = NAV_LINKS.map((l) => l.href.replace('#', ''));
  const activeId = useScrollSpy(ids);
  const scrolled = scrollY > 40;

  const handleNav = (href: string) => {
    scrollTo(href);
    setMenuOpen(false);
  };

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div
          className="transition-all duration-500"
          style={{
            background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
            borderBottom: scrolled
              ? '1px solid rgba(255,255,255,0.06)'
              : '1px solid transparent',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => handleNav('#hero')}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-sm font-bold text-black font-mono">
                AI
              </div>
              <span className="text-sm font-semibold tracking-wide hidden sm:block text-slate-100">
                Ayoub<span className="text-cyan-400">.</span>
              </span>
            </button>

            {/* Desktop Links */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link, i) => {
                const isActive = activeId === link.href.replace('#', '');
                return (
                  <motion.button
                    key={link.href}
                    custom={i}
                    variants={navItem}
                    initial="hidden"
                    animate="visible"
                    onClick={() => handleNav(link.href)}
                    className="relative px-3 py-1.5 text-sm transition-colors duration-200"
                    style={{
                      color: isActive ? '#22d3ee' : 'rgba(237,237,237,0.6)',
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-md"
                        style={{ background: 'rgba(6,182,212,0.1)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </motion.button>
                );
              })}
            </nav>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${PROFILE.email}`}
                className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border"
                style={{
                  borderColor: 'rgba(6,182,212,0.4)',
                  color: '#22d3ee',
                  background: 'rgba(6,182,212,0.05)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(6,182,212,0.15)';
                  e.currentTarget.style.borderColor = 'rgba(6,182,212,0.7)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(6,182,212,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(6,182,212,0.4)';
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Hire Me
              </a>

              {/* Hamburger */}
              <button
                className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 z-50"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                <span
                  className="block h-px w-5 bg-white transition-all duration-300 origin-center"
                  style={{
                    transform: menuOpen ? 'rotate(45deg) translateY(3px)' : '',
                  }}
                />
                <span
                  className="block h-px w-5 bg-white transition-all duration-300"
                  style={{
                    opacity: menuOpen ? 0 : 1,
                    transform: menuOpen ? 'scaleX(0)' : '',
                  }}
                />
                <span
                  className="block h-px w-5 bg-white transition-all duration-300 origin-center"
                  style={{
                    transform: menuOpen ? 'rotate(-45deg) translateY(-3px)' : '',
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{
              background: 'rgba(10,10,10,0.97)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  onClick={() => handleNav(link.href)}
                  className="text-3xl font-bold py-3 transition-colors duration-200"
                  style={{
                    color:
                      activeId === link.href.replace('#', '')
                        ? '#22d3ee'
                        : 'rgba(237,237,237,0.7)',
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.a
                href={`mailto:${PROFILE.email}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.06 + 0.1 }}
                className="mt-6 px-8 py-3 rounded-xl text-base font-semibold border border-cyan-400/40 text-cyan-400"
              >
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
