import React, { useState } from 'react';
import { Element as ScrollElement } from 'react-scroll';
import { 
  Zap, 
  ArrowRight,
  GitBranch,
  Code2,
  CheckCircle2,
  Box,
  Filter,
  GitPullRequest,
  ShieldCheck
} from 'lucide-react';
import { Reveal } from '../common/Reveal';
import { pipelineData, colorPalette } from '../../Data/Data.jsx';

export const VisualPipelineSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const { header, steps } = pipelineData;
  const current = steps[activeStep];
  const CurrentIcon = current.icon;

  const renderVisualStage = (index) => {
    switch (index) {
      case 0:
        return (
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-3 font-mono text-xs shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <GitBranch size={16} />
                <span>octocat/auth-service</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                Webhook Active
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-[10px]">EVENT</div>
                <div className="text-cyan-300 font-bold">push (refs/heads/main)</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-[10px]">COMMIT SHA</div>
                <div className="text-slate-200 font-bold">e29d01b48f...</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 size={13} />
                <span>GitHub App OAuth 2.0 handshake verified</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-400">
                <CheckCircle2 size={13} />
                <span>Shallow depth=1 commit tree parsed in 0.28s</span>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-3 font-mono text-xs shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Code2 size={13} className="text-amber-400" />
                <span>src/controllers/auth.js</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold text-[10px] border border-rose-500/30">
                Taint Source → Sink (CWE-89)
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] space-y-1 leading-relaxed">
              <div className="text-slate-400">41 | const &#123; username &#125; = req.body;  <span className="text-cyan-400 font-bold">// [SOURCE]</span></div>
              <div className="p-1 rounded bg-rose-500/20 text-rose-300 font-bold border-l-2 border-rose-500">
                42 | const sql = `SELECT * FROM users WHERE id = '${"${username}"}'`;
              </div>
              <div className="p-1 rounded bg-rose-500/20 text-rose-300 font-bold border-l-2 border-rose-500">
                43 | const user = await db.raw(sql); <span className="text-rose-400">// [SINK]</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] flex items-center gap-2">
              <Zap size={14} className="text-amber-400 shrink-0" />
              <span>AST slice formulated into synthetic cleanroom PoC harness</span>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-3 font-mono text-xs shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
              <span className="text-purple-400 font-bold flex items-center gap-1.5">
                <Box size={14} />
                <span>CONTAINER CLEANROOM</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold text-[10px] border border-rose-500/30">
                --network none
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[10px]">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-center">
                <div className="text-slate-400">RAM CAP</div>
                <div className="text-cyan-400 font-bold">1024 MB</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-center">
                <div className="text-slate-400">CPU CAP</div>
                <div className="text-purple-400 font-bold">1.0 vCPU</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-center">
                <div className="text-slate-400">WATCHDOG</div>
                <div className="text-amber-400 font-bold">30.0s Limit</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>PoC Executed: Exploit Proven (Exit 0)</span>
              </span>
              <span className="text-emerald-400 font-bold">1.12s</span>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-3 font-mono text-xs shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
              <span className="text-slate-300 font-bold flex items-center gap-1.5">
                <Filter size={14} className="text-emerald-400" />
                <span>TRIAGE FUNNEL</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px] border border-emerald-500/30">
                -82.6% Noise Discarded
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Raw Static Scanner Alerts</span>
                <span className="text-rose-400 font-bold">100 Alerts</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500" style={{ width: '100%' }} />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span className="text-emerald-400 font-bold">Empirically Verified Exploits</span>
                <span className="text-emerald-400 font-bold">18 Actionable PRs</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400" style={{ width: '18%' }} />
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-[11px] flex items-center justify-between">
              <span>Engineering Hours Saved This Week:</span>
              <span className="font-bold text-cyan-400">14.2 Hours</span>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-3 font-mono text-xs shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
              <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                <GitPullRequest size={14} />
                <span>PR #42 [Verified Security Patch]</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-black text-[10px]">
                Ready to Merge
              </span>
            </div>

            <div className="text-slate-300 text-[11px]">
              Branch: <span className="text-cyan-300 font-bold">sparklens/fix-cwe-89-auth</span>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-[11px] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>42 / 42 Tests Pass (0 Regressions)</span>
              </div>
              <span className="font-bold text-emerald-400">✓ CI Green</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-[11px] flex items-center justify-between">
              <span>Vulnerability Status:</span>
              <span className="text-emerald-400 font-bold">NEUTRALIZED</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <ScrollElement name="pipeline">
      <section id="pipeline" className="py-24 relative bg-slate-100/60 dark:bg-[#0c101a] border-y border-slate-200 dark:border-slate-800/80 transition-colors duration-200">
        <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          
          {/* Section Header */}
          <Reveal direction="up" delay={50}>
            <div className="text-left mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shadow-sm mb-4">
                <Zap size={14} className="text-cyan-600 dark:text-cyan-400" />
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
                  STAGE {current.step} / 05 ACTIVE
                </div>
              </div>
            </div>
          </Reveal>

          {/* Stepper Tabs Bar with Icons - Full Width */}
          <Reveal direction="up" delay={120}>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
              {steps.map((st, idx) => {
                const Icon = st.icon;
                const isActive = activeStep === idx;
                return (
                  <button
                    key={st.step}
                    onClick={() => setActiveStep(idx)}
                    className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isActive 
                        ? 'ring-2 ring-cyan-500 scale-[1.01] shadow-lg bg-white dark:bg-[#151c2d] border-cyan-500' 
                        : 'bg-white/80 dark:bg-[#0e131f] border-slate-200 dark:border-slate-800 hover:border-cyan-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div 
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                          isActive 
                            ? `bg-gradient-to-r ${colorPalette.primary.gradient} text-slate-950` 
                            : 'bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400'
                        }`}
                      >
                        <Icon size={18} />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">{st.step}</span>
                    </div>

                    <div>
                      <div className="text-xs font-black text-slate-900 dark:text-white">
                        {st.title}
                      </div>
                      <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                        {st.tag}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Active Step Visual Showcase Box - Widescreen Full Width */}
          <Reveal direction="up" delay={200}>
            <div className="w-full p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e131f] shadow-xl transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Column: Descriptive & Features with Icons (5 cols) */}
                <div className="lg:col-span-5 text-left space-y-5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 flex items-center gap-1.5">
                      <CurrentIcon size={12} />
                      <span>{current.badge}</span>
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Stage {current.step} of 05</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                    {current.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {current.desc}
                  </p>

                  {/* Visual Icon Features List */}
                  <div className="space-y-3 pt-2">
                    {current.features.map((feat, i) => {
                      const FeatIcon = feat.icon;
                      return (
                        <div key={i} className="flex items-center gap-3 text-xs text-slate-800 dark:text-slate-200 font-medium">
                          <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shrink-0">
                            <FeatIcon size={13} />
                          </div>
                          <span>{feat.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Next Step Button */}
                  <div className="pt-3">
                    <button
                      onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 transition-transform hover:scale-105 cursor-pointer shadow-md bg-gradient-to-r ${colorPalette.primary.gradient}`}
                    >
                      <span>Next: Step {steps[(activeStep + 1) % steps.length].step}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Right Column: Visual Stage Widget (7 cols) */}
                <div className="lg:col-span-7">
                  {renderVisualStage(activeStep)}
                </div>

              </div>
            </div>
          </Reveal>

        </div>
      </section>
    </ScrollElement>
  );
};
