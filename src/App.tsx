import React, { useState } from 'react';

export default function App() {
  const [floatingKisses, setFloatingKisses] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);

  const handleInteraction = (e: React.MouseEvent) => {
    const emojis = ['😘', '💋', '❤️'];
    const newKiss = {
      id: Date.now() + Math.random(),
      x: e.clientX || window.innerWidth / 2,
      y: e.clientY || window.innerHeight / 2,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    };

    setFloatingKisses((prev) => [...prev.slice(-15), newKiss]);
    setTimeout(() => {
      setFloatingKisses((prev) => prev.filter((k) => k.id !== newKiss.id));
    }, 1800);
  };

  return (
    <div 
      className="min-h-screen w-full bg-white flex items-center justify-center px-4 sm:px-8 py-12 relative overflow-hidden cursor-default select-none"
      onClick={handleInteraction}
    >
      {/* Floating kiss animations on click */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
        {floatingKisses.map((kiss) => (
          <span
            key={kiss.id}
            className="absolute animate-float-kiss select-none inline-block text-3xl sm:text-4xl"
            style={{
              left: `${kiss.x - 20}px`,
              top: `${kiss.y - 30}px`,
            }}
          >
            {kiss.emoji}
          </span>
        ))}
      </div>

      {/* Main Container - Just the title and the kiss emoji */}
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-slate-900 tracking-tight leading-[1.1] text-balance">
          MERCIIIII ALICE T'ES LA BOSS{' '}
          <span 
            className="inline-block transition-transform duration-300 hover:scale-125 active:scale-95 cursor-pointer"
            role="img" 
            aria-label="bisous"
          >
            😘
          </span>
        </h1>
      </div>
    </div>
  );
}
