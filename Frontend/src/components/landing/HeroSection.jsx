import React, { useState } from 'react';
import { Element as ScrollElement, Link as ScrollLink } from 'react-scroll';
import { 
  Play, 
  ArrowRight, 
  RefreshCw,
  Terminal,
  Activity,
  ShieldCheck,
  ChevronRight,
  Radio,
  Cpu
} from 'lucide-react';
import { Reveal } from '../common/Reveal';
import { heroData, colorPalette } from '../../Data/Data.jsx';

export const HeroSection = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState(heroData.initialTerminalLogs);
  const [isVerified, setIsVerified] = useState(false);

  const {
    statusBadge,
    headline,
    valueProposition,
    ctaButtons,
    trustBadges,
    simulationLogs,
    terminalTelemetry,
    verificationFlow,
    metrics
  } = heroData;

  const StatusBadgeIcon = statusBadge.icon;
  const SecondaryCtaIcon = ctaButtons.secondary.icon;

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setIsVerified(false);

    setLogs(simulationLogs.stage1);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        ...simulationLogs.stage2
      ]);
    }, 900);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        ...simulationLogs.stage3
      ]);
      setIsRunning(false);
      setIsVerified(true);
    }, 2000);
  };

  return (
    <ScrollElement name="home">
      <section id="home" className="relative pt-28 pb-20 overflow-hidden bg-slate-50 dark:bg-[#07090e] transition-colors duration-200">
        
        {/* Subtle Background Glows using centralized palette */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 dark:bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-purple-500/10 dark:bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          
          {/* Top Widescreen 2-Column Grid (Balanced Heights) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10">
            
            {/* Left Column: Heading, Proposition & Action Buttons (7 cols) */}
            <div className="lg:col-span-7 text-left space-y-6">
              
              {/* Status Badge */}
              <Reveal direction="up" delay={50}>
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shadow-sm">
                    <StatusBadgeIcon size={14} className="text-cyan-600 dark:text-cyan-400" />
                    <span>{statusBadge.label} <span className="hidden sm:inline">• {statusBadge.sub}</span></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-1 shrink-0" />
                  </div>
                </div>
              </Reveal>

              {/* Grand Widescreen Title */}
              <Reveal direction="up" delay={120}>
                <h1 className="text-2xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.12] text-slate-900 dark:text-white">
                  {headline.prefix} <br className="hidden sm:inline" />
                  <span className={`bg-gradient-to-r ${colorPalette.primary.gradientText} bg-clip-text text-transparent`}>
                    {headline.gradient}
                  </span> {headline.suffix}
                </h1>
              </Reveal>

              {/* Value Proposition */}
              <Reveal direction="up" delay={180}>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                  {valueProposition}
                </p>
              </Reveal>

              {/* Primary Action Buttons */}
              <Reveal direction="up" delay={240}>
                <div className="flex items-center gap-4 flex-wrap pt-1">
                  <ScrollLink
                    to={ctaButtons.primary.target}
                    smooth={true}
                    offset={-65}
                    duration={600}
                    className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm tracking-wide text-slate-950 shadow-lg cursor-pointer transition-transform hover:-translate-y-0.5 bg-gradient-to-r ${colorPalette.primary.gradient}`}
                  >
                    <span>{ctaButtons.primary.label}</span>
                    <ArrowRight size={16} />
                  </ScrollLink>

                  <ScrollLink
                    to={ctaButtons.secondary.target}
                    smooth={true}
                    offset={-65}
                    duration={600}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#0e131f] text-slate-900 dark:text-white cursor-pointer transition-all hover:-translate-y-0.5 hover:border-cyan-500/50 shadow-sm"
                  >
                    <SecondaryCtaIcon size={16} className="text-cyan-600 dark:text-cyan-400" />
                    <span>{ctaButtons.secondary.label}</span>
                  </ScrollLink>
                </div>
              </Reveal>

              {/* Trust Badges */}
              <Reveal direction="up" delay={300}>
                <div className="flex items-center gap-3 pt-1 flex-wrap text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  {trustBadges.map((badge, i) => {
                    const BadgeIcon = badge.icon;
                    return (
                      <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
                        <BadgeIcon size={13} className={badge.color} />
                        <span>{badge.text}</span>
                      </div>
                    );
                  })}
                </div>
              </Reveal>

            </div>

            {/* Right Column: Live Cleanroom Verification Terminal Box (5 cols) */}
            <div className="lg:col-span-5 text-left">
              <Reveal direction="up" delay={200}>
                <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e131f] shadow-2xl">
                  
                  {/* Terminal Bar */}
                  <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-900/90 flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="flex gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                      </div>
                      <div className="flex items-center gap-1.5 ml-1">
                        <Terminal size={14} className="text-cyan-600 dark:text-cyan-400" />
                        <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 truncate">
                          cleanroom: node:18-alpine
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={runSimulation}
                      disabled={isRunning}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold text-slate-950 transition-all cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed shadow-md hover:scale-105 bg-gradient-to-r ${colorPalette.primary.gradient}`}
                    >
                      {isRunning ? (
                        <>
                          <RefreshCw size={12} className="animate-spin" />
                          <span>Verifying...</span>
                        </>
                      ) : (
                        <>
                          <Play size={12} fill="currentColor" />
                          <span>Run Cleanroom Test</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Terminal Code Window */}
                  <div className="p-5 font-mono text-xs leading-relaxed space-y-2.5 min-h-[290px] overflow-x-auto bg-[#050811] text-slate-200">
                    {logs.map((log, index) => (
                      <div key={index} className="flex items-start gap-2.5">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-cyan-400 shrink-0">
                          {log.type}
                        </span>
                        <span className={log.color}>{log.text}</span>
                      </div>
                    ))}

                    {isVerified && (
                      <div className="mt-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <ShieldCheck size={16} className="text-emerald-400" />
                          <span className="font-bold">Zero False Alarm: Exploit Proven Empirically</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-black text-[10px]">
                          PASS 100%
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Hardware Isolation Footer Bar */}
                  <div className="px-5 py-2.5 bg-[#030509] border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400 flex-wrap gap-2">
                    <span className="flex items-center gap-1.5 text-rose-400 font-bold">
                      <Radio size={11} />
                      <span>{terminalTelemetry.egress}</span>
                    </span>
                    <span className="flex items-center gap-1 text-cyan-400">
                      <Cpu size={11} />
                      <span>{terminalTelemetry.ram}</span>
                    </span>
                    <span className="text-emerald-400 font-bold">
                      {terminalTelemetry.status}
                    </span>
                  </div>

                </div>
              </Reveal>
            </div>

          </div>

          {/* Full-Width Panoramic 4-Node Autonomous Pipeline Bar (Spanning Full 12 Cols) */}
          <Reveal direction="up" delay={260}>
            <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e131f] shadow-sm mb-6">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-600 dark:text-slate-400 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800/80">
                <span className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                  <Activity size={15} />
                  <span>{verificationFlow.title}</span>
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal hidden sm:inline">
                  {verificationFlow.subtitle}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {verificationFlow.nodes.map((node, i) => {
                  const Icon = node.icon;
                  return (
                    <div 
                      key={i} 
                      className={`p-4 rounded-xl border flex items-start gap-3 text-left transition-all hover:scale-[1.01] bg-slate-50 dark:bg-[#151c2d] ${node.border} relative group`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${node.bg}`}>
                        <Icon size={18} className={node.color} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {node.title}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500">
                            {node.step}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono font-bold text-cyan-600 dark:text-cyan-400 truncate">
                          {node.desc}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {node.sub}
                        </div>
                      </div>

                      {i < 3 && (
                        <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-slate-400 dark:text-slate-600 pointer-events-none">
                          <ChevronRight size={14} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Full Screen Edge-to-Edge 4 Stat Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {metrics.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={i} direction="up" delay={i * 90}>
                  <div 
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e131f] flex flex-col justify-between transition-all hover:scale-[1.02] shadow-sm hover:border-cyan-500/40 h-full"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
                          {item.num}
                        </span>
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50">
                          <Icon size={18} className={item.color} />
                        </div>
                      </div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {item.sub}
                      </div>
                    </div>

                    {/* Visual Progress Bar */}
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-4 overflow-hidden">
                      <div className={`h-full ${item.barColor}`} style={{ width: item.bar }} />
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
