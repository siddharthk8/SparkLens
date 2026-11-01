import React, { useState } from 'react';
import { Element as ScrollElement } from 'react-scroll';
import { 
  XCircle, 
  ShieldCheck, 
  AlertTriangle, 
  Sliders, 
  Flame, 
  CheckCircle2 
} from 'lucide-react';
import { Reveal } from '../common/Reveal';
import { comparisonData, colorPalette } from '../../Data/Data.jsx';

export const VisualComparisonSection = () => {
  const [activeVector, setActiveVector] = useState('noise');

  const { header, vectors, summaryCards } = comparisonData;
  const current = vectors[activeVector];

  return (
    <ScrollElement name="comparison">
      <section id="comparison" className="py-24 relative bg-slate-100/60 dark:bg-[#0c101a] border-y border-slate-200 dark:border-slate-800/80 transition-colors duration-200">
        <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          
          {/* Section Header */}
          <Reveal direction="up" delay={50}>
            <div className="text-left mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shadow-sm mb-4">
                <Sliders size={14} className="text-cyan-600 dark:text-cyan-400" />
                <span>{header.badge}</span>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-2 text-slate-900 dark:text-white">
                    {header.title}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
                    {header.subtitle}
                  </p>
                </div>
                <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold hidden lg:block">
                  EMPIRICAL PROOF VS THEORETICAL NOISE
                </div>
              </div>
            </div>
          </Reveal>

          {/* Interactive Vector Selector Tabs Bar */}
          <Reveal direction="up" delay={120}>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
              {Object.values(vectors).map((vec) => {
                const TabIcon = vec.icon;
                const isSelected = activeVector === vec.id;
                return (
                  <button
                    key={vec.id}
                    onClick={() => setActiveVector(vec.id)}
                    className={`p-3.5 sm:p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'ring-2 ring-cyan-500 scale-[1.01] shadow-lg bg-white dark:bg-[#151c2d] border-cyan-500'
                        : 'bg-white/80 dark:bg-[#0e131f] border-slate-200 dark:border-slate-800 hover:border-cyan-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div 
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                          isSelected 
                            ? `bg-gradient-to-r ${colorPalette.primary.gradient} text-slate-950` 
                            : 'bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400'
                        }`}
                      >
                        <TabIcon size={16} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">{vec.tag}</span>
                    </div>

                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {vec.tabLabel}
                    </div>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Head-to-Head Duel Arena (Widescreen 12-Column Split) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Duelist: Legacy SAST (Red Theme - 6 cols) */}
            <div className="lg:col-span-6 flex">
              <Reveal direction="up" delay={150} className="w-full flex">
                <div className="w-full rounded-3xl p-6 sm:p-8 border-2 border-rose-500/30 bg-white dark:bg-[#0e131f] flex flex-col justify-between shadow-xl transition-all">
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-rose-500/20">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-rose-500/15 text-rose-500 shrink-0">
                          <Flame size={16} />
                        </div>
                        <div>
                          <div className="text-xs font-black uppercase text-rose-500 tracking-wider">LEGACY ARCHITECTURE</div>
                          <div className="text-sm font-black text-slate-900 dark:text-white">Traditional SAST &amp; AI Tools</div>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-black bg-rose-500/15 text-rose-400 border border-rose-500/30">
                        {current.legacy.badge}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">
                      {current.legacy.headline}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {current.legacy.desc}
                    </p>

                    {/* Legacy Visual Snapshot */}
                    <div className="mb-4">
                      <div className="p-4 rounded-xl bg-[#050811] border border-rose-500/30 font-mono text-xs text-rose-300 space-y-2 shadow-inner">
                        <div className="flex items-center justify-between text-[11px] pb-1 border-b border-slate-800">
                          <span className="font-bold flex items-center gap-1.5 text-rose-400">
                            <AlertTriangle size={13} />
                            <span>SAST Scanner Output</span>
                          </span>
                          <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold text-[10px]">
                            {current.legacy.badge}
                          </span>
                        </div>
                        <div className="text-[11px] leading-relaxed text-slate-300 space-y-1">
                          {current.legacy.codeLines.map((line, idx) => (
                            <div key={idx} className={line.color}>
                              {line.text}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    {/* Cost / Drain Callout */}
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold flex items-center gap-2 mb-3">
                      <XCircle size={16} className="shrink-0" />
                      <span>{current.legacy.cost}</span>
                    </div>

                    {/* Flaw Tags */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {current.legacy.tags.map((tg, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                          ✕ {tg}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Duelist: SparkLens (Emerald/Cyan Theme - 6 cols) */}
            <div className="lg:col-span-6 flex">
              <Reveal direction="up" delay={250} className="w-full flex">
                <div className="w-full rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/40 bg-white dark:bg-[#0e131f] flex flex-col justify-between shadow-2xl transition-all relative overflow-hidden">
                  
                  {/* Subtle Ambient Glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 dark:bg-emerald-500/15 blur-[80px] rounded-full pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-emerald-500/20">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-500/20 text-emerald-500 shrink-0">
                          <ShieldCheck size={16} />
                        </div>
                        <div>
                          <div className="text-xs font-black uppercase text-emerald-500 tracking-wider">THE SPARKLENS MOAT</div>
                          <div className="text-sm font-black text-slate-900 dark:text-white">Autonomous Cleanroom Verification</div>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {current.sparklens.badge}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">
                      {current.sparklens.headline}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {current.sparklens.desc}
                    </p>

                    {/* SparkLens Visual Evidence */}
                    <div className="mb-4">
                      <div className="p-4 rounded-xl bg-[#050811] border border-emerald-500/30 font-mono text-xs text-emerald-300 space-y-2 shadow-inner">
                        <div className="flex items-center justify-between text-[11px] pb-1 border-b border-slate-800">
                          <span className="font-bold flex items-center gap-1.5 text-emerald-400">
                            <ShieldCheck size={13} />
                            <span>SparkLens Cleanroom Result</span>
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-black text-[10px]">
                            {current.sparklens.badge}
                          </span>
                        </div>
                        <div className="text-[11px] leading-relaxed text-slate-300 space-y-1">
                          {current.sparklens.codeLines.map((line, idx) => (
                            <div key={idx} className={line.color}>
                              {line.text}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10">
                    {/* Benefit Callout */}
                    <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2 mb-3">
                      <CheckCircle2 size={16} className="shrink-0" />
                      <span>{current.sparklens.benefit}</span>
                    </div>

                    {/* Verified Tags */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {current.sparklens.tags.map((tg, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          ✓ {tg}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>

          {/* Bottom Summary Proof Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-8">
            {summaryCards.map((card, i) => {
              const CardIcon = card.icon;
              return (
                <Reveal key={i} direction="up" delay={(i + 1) * 100}>
                  <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e131f] flex items-center gap-3.5 shadow-sm h-full">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${card.bg} ${card.color}`}>
                      <CardIcon size={20} />
                    </div>
                    <div className="text-left">
                      <div className="text-lg font-black text-slate-900 dark:text-white font-mono">{card.title}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{card.sub}</div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>
    </ScrollElement>
  );
};
