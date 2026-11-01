import React, { useState } from 'react';
import { Element as ScrollElement } from 'react-scroll';
import { 
  Box, 
  ShieldAlert, 
  ShieldCheck, 
  Activity 
} from 'lucide-react';
import { Reveal } from '../common/Reveal';
import { sandboxData } from '../../Data/Data.jsx';

export const VisualSandboxSection = () => {
  const [selectedScenario, setSelectedScenario] = useState('sqli');

  const { header, hardwareBadges, scenarioTabs, scenarios } = sandboxData;
  const current = scenarios[selectedScenario];

  return (
    <ScrollElement name="sandbox">
      <section id="sandbox" className="py-24 relative bg-slate-50 dark:bg-[#07090e] transition-colors duration-200">
        <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          
          {/* Section Header */}
          <Reveal direction="up" delay={50}>
            <div className="text-left mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-sm mb-4">
                <Box size={14} className="text-emerald-600 dark:text-emerald-400" />
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
                <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold hidden lg:block">
                  HARDWARE SANDBOX ENFORCED
                </div>
              </div>
            </div>
          </Reveal>

          {/* Sandbox Visual Cleanroom Canvas - Widescreen Full Width */}
          <Reveal direction="up" delay={150}>
            <div className="w-full p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e131f] shadow-xl">
              
              {/* 4 Hardware Badges with Visual Meters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {hardwareBadges.map((badge, i) => {
                  const Icon = badge.icon;
                  return (
                    <div 
                      key={i} 
                      className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#151c2d] font-mono text-left transition-all hover:scale-[1.02]"
                    >
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[10px] font-bold mb-1">
                        <Icon size={13} className={badge.color} />
                        <span>{badge.label}</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {badge.val}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-500 mt-0.5">
                        {badge.sub}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Scenario Buttons with CWE Icons */}
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex gap-2 flex-wrap">
                  {scenarioTabs.map((btn) => {
                    const BtnIcon = btn.icon;
                    const isSel = selectedScenario === btn.id;
                    return (
                      <button
                        key={btn.id}
                        onClick={() => setSelectedScenario(btn.id)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border flex items-center gap-2 ${
                          isSel 
                            ? 'ring-2 ring-cyan-500 font-black shadow-md bg-white dark:bg-[#151c2d] border-cyan-500 text-cyan-600 dark:text-cyan-400' 
                            : 'bg-slate-50 dark:bg-[#151c2d] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-cyan-500/50'
                        }`}
                      >
                        <BtnIcon size={14} />
                        <span>{btn.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Verified Badge */}
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                  <ShieldCheck size={14} />
                  <span>{current.status}</span>
                </div>
              </div>

              {/* Container Telemetry + Live Terminal Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                
                {/* Telemetry Visual Sidebar */}
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#151c2d] font-mono text-xs space-y-3 text-left">
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-xs pb-2 border-b border-slate-200 dark:border-slate-800">
                    <Activity size={14} />
                    <span>CONTAINER TELEMETRY</span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 mb-1">
                      <span>Execution Latency</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{current.latency}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: current.latencyPercent }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 mb-1">
                      <span>RAM Utilization</span>
                      <span className="text-cyan-600 dark:text-cyan-400 font-bold">{current.ramUsed}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500" style={{ width: current.ramPercent }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 mb-1">
                      <span>Network Egress</span>
                      <span className="text-rose-500 dark:text-rose-400 font-bold">{current.egress}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500" style={{ width: '0%' }} />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-500 flex items-center gap-1.5">
                    <ShieldAlert size={12} className="text-amber-500" />
                    <span>Air-gapped kernel driver active</span>
                  </div>
                </div>

                {/* Terminal Screen */}
                <div className="lg:col-span-2 p-4 sm:p-5 rounded-2xl font-mono text-xs leading-relaxed text-left text-slate-200 border border-slate-800 bg-[#04060a] shadow-xl overflow-x-auto">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-slate-300 font-bold">container: sparklens-runner-{current.harness}</span>
                    </div>
                    <span className="text-emerald-400 font-bold text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30">
                      ISOLATED
                    </span>
                  </div>

                  {current.logs.map((log, idx) => (
                    <div key={idx} className="mb-1 text-slate-300 flex items-start gap-2">
                      <span className="text-slate-600 select-none">&gt;</span>
                      <span className={log.includes('ASSERT') || log.includes('RESULT') || log.includes('EXIT') ? 'text-emerald-400 font-bold' : ''}>
                        {log}
                      </span>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          </Reveal>

        </div>
      </section>
    </ScrollElement>
  );
};
