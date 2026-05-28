'use client';

import { useTyping } from '@/hooks/index';
import { PROFILE } from '@/data/portfolio';

export default function TypingAnimation() {
  const text = useTyping(PROFILE.typingPhrases, {
    typingSpeed: 80,
    deletingSpeed: 45,
    pauseMs: 2200,
  });

  return (
    <div className="flex items-center justify-center gap-1 text-xl md:text-2xl font-mono text-slate-300 min-h-[2rem]">
      <span className="text-cyan-400">&gt;</span>
      <span>{text}</span>
      <span className="inline-block w-0.5 h-6 bg-cyan-400 animate-pulse ml-0.5" />
    </div>
  );
}