import React from 'react';

export const SparkLensLogo = ({ 
  size = 32, 
  className = '', 
  withText = false,
  textClassName = ''
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Icon Mark Container (Transparent) */}
      <div 
        style={{ width: `${size}px`, height: `${size}px` }} 
        className="relative shrink-0 flex items-center justify-center bg-transparent"
      >
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm transition-transform duration-200"
        >
          <defs>
            {/* Primary Spark Gradient */}
            <linearGradient id="shieldSparkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>

            {/* Shield Outline Gradient */}
            <linearGradient id="shieldRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>

            {/* Lens Reflection Gradient */}
            <linearGradient id="lensShineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* 1. Cyber Security Shield (Container Boundary) */}
          <path 
            d="M50 8 L84 22 C84 54 68 78 50 92 C32 78 16 54 16 22 Z" 
            stroke="url(#shieldRingGrad)" 
            strokeWidth="3.5" 
            strokeLinejoin="round" 
            strokeLinecap="round"
            fill="none" 
            className="opacity-90"
          />

          {/* 2. Concentric Optical Lens Glass Ring (Inspection / Lens) */}
          <circle 
            cx="50" 
            cy="46" 
            r="23" 
            stroke="url(#shieldSparkGrad)" 
            strokeWidth="3" 
            strokeOpacity="0.9" 
            fill="none" 
          />

          {/* Lens Glass Top-Arc Highlight Reflection */}
          <path 
            d="M34 40 A23 23 0 0 1 66 40" 
            stroke="url(#lensShineGrad)" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
          />

          {/* 3. Optical Precision Focus Reticle Crosshairs */}
          <line x1="50" y1="18" x2="50" y2="24" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="50" y1="68" x2="50" y2="74" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="22" y1="46" x2="28" y2="46" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="72" y1="46" x2="78" y2="46" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />

          {/* 4. Center Code Brackets with Slash: </ > for Repository & Code Verification */}
          {/* Left Angle Bracket < */}
          <path 
            d="M43 38 L36 46 L43 54" 
            stroke="url(#shieldSparkGrad)" 
            strokeWidth="3.2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />

          {/* Center Forward Slash / */}
          <line 
            x1="52.5" y1="35" 
            x2="47.5" y2="57" 
            stroke="#22d3ee" 
            strokeWidth="3" 
            strokeLinecap="round" 
          />

          {/* Right Angle Bracket > */}
          <path 
            d="M57 38 L64 46 L57 54" 
            stroke="url(#shieldSparkGrad)" 
            strokeWidth="3.2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />

          {/* 5. Center Precision Spark Accent Dot */}
          <circle cx="50" cy="46" r="1.8" fill="#ffffff" />
        </svg>
      </div>

      {/* Optional Typography */}
      {withText && (
        <span className={`font-black text-lg tracking-tight text-slate-900 dark:text-white ${textClassName}`}>
          SPARK<span className="bg-gradient-to-r from-cyan-500 to-emerald-400 bg-clip-text text-transparent">LENS</span>
        </span>
      )}
    </div>
  );
};

export default SparkLensLogo;

