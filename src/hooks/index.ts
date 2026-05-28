'use client';

import { useState, useEffect, useRef } from 'react';

// ── Typing effect ─────────────────────────────────────────────────────────────
interface UseTypingOptions {
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
}

export function useTyping(
  phrases: string[],
  {
    typingSpeed = 80,
    deletingSpeed = 40,
    pauseMs = 2000,
  }: UseTypingOptions = {}
): string {
  const [text, setText] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [phraseIndex, setPhraseIndex] = useState<number>(0);

  useEffect(() => {
    const current = phrases[phraseIndex];

    if (!isDeleting) {
      if (text.length < current.length) {
        const t = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typingSpeed
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setIsDeleting(true), pauseMs);
        return () => clearTimeout(t);
      }
    } else {
      if (text.length > 0) {
        const t = setTimeout(
          () => setText(current.slice(0, text.length - 1)),
          deletingSpeed
        );
        return () => clearTimeout(t);
      } else {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }
    }
  }, [text, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseMs]);

  return text;
}

// ── Scroll spy ────────────────────────────────────────────────────────────────
export function useScrollSpy(ids: string[], offset: number = 80): string {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: `-${offset}px 0px -60% 0px` }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids, offset]);

  return activeId;
}

// ── Scroll Y ──────────────────────────────────────────────────────────────────
export function useScrollY(): number {
  const [scrollY, setScrollY] = useState<number>(0);
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return scrollY;
}

// ── InView ref (manual) ───────────────────────────────────────────────────────
export function useInViewRef(
  options: IntersectionObserverInit = {}
): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return [ref, inView];
}

// ── Mouse position ────────────────────────────────────────────────────────────
export function useMouse(): { x: number; y: number } {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  return pos;
}