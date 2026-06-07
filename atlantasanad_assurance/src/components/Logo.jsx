import React from 'react';

export default function Logo({ variant = 'default', className = '' }) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className="relative w-11 h-11 bg-[#004B87] rounded-xl overflow-hidden shadow-md flex-shrink-0 flex items-center justify-center border border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent" />
        <svg viewBox="0 0 100 100" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 8 L66 24 L50 40 L34 24 Z" fill="#FFFFFF" />
          <path d="M10 78 C25 78, 30 46, 52 46 C60 46, 68 52, 74 58 L78 52 C70 44, 60 38, 52 38 C26 38, 22 70, 10 70 Z" fill="#FFFFFF" />
          <path d="M51.5 46 C62 46, 75 62, 90 68 C82 74, 68 76, 52 64 C52 56, 51.5 50, 51.5 46 Z" fill="#E01A4F" />
        </svg>
      </div>
      <div className="flex flex-col text-left">
        <h1 className={`text-base font-black tracking-tight leading-none uppercase ${variant === 'dark' ? 'text-white' : 'text-[#004B87]'}`}>
          AtlantaSanad
        </h1>
        <span className={`text-[10px] font-bold tracking-widest uppercase mt-0.5 ${variant === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
          Assurance
        </span>
      </div>
    </div>
  );
}