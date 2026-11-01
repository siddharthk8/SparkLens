import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Element as ScrollElement } from 'react-scroll';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Ticket,
  Fingerprint,
  Lock
} from 'lucide-react';
import { Reveal } from '../common/Reveal';
import { comingSoonData, colorPalette } from '../../Data/Data.jsx';

// Google Sheet & Waitlist Dispatcher
const sendToGoogleSheet = async (email) => {
  const timestampStr = new Date().toISOString();
  try {
    const stored = JSON.parse(localStorage.getItem('sparklens_waitlist') || '[]');
    stored.push({ email, timestamp: timestampStr });
    localStorage.setItem('sparklens_waitlist', JSON.stringify(stored));
  } catch {
    // Ignore local storage error
  }

  const sheetUrl = import.meta.env.VITE_GOOGLE_SHEET_URL;

  if (sheetUrl && sheetUrl.startsWith('http')) {
    const payload = {
      email,
      timestamp: timestampStr,
      source: 'SparkLens Landing Page'
    };

    await fetch(sheetUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  } else {
    await new Promise((r) => setTimeout(r, 650));
  }
};

export const ComingSoonSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    badge,
    headline,
    subtitle,
    capabilityPills,
    vipPass
  } = comingSoonData;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await sendToGoogleSheet(data.email);
      setSubmitted(true);
    } catch (err) {
      console.error('Google Sheet submission error:', err);
      setSubmitted(true);
    }
  };

  return (
    <ScrollElement name="coming-soon">
      <section 
        id="coming-soon" 
        className="pt-24 pb-16 relative overflow-hidden bg-slate-50 dark:bg-[#07090e] transition-colors duration-200"
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[300px] bg-cyan-500/10 dark:bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          
          {/* Full Screen Widescreen 2-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Heading, Proposition, and 6 Capability Pills (7 cols) */}
            <div className="lg:col-span-7 text-left space-y-6">
              
              {/* Glowing Badge */}
              <Reveal direction="up" delay={50}>
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shadow-sm">
                    <Sparkles size={14} className="text-cyan-600 dark:text-cyan-400" />
                    <span>{badge}</span>
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping ml-1" />
                  </div>
                </div>
              </Reveal>

              {/* Big Bold Hype Typography */}
              <Reveal direction="up" delay={120}>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.08] text-slate-900 dark:text-white">
                  {headline.title} <br />
                  <span className={`bg-gradient-to-r ${colorPalette.primary.gradientText} bg-clip-text text-transparent`}>
                    {headline.gradient}
                  </span>
                </h2>
              </Reveal>

              <Reveal direction="up" delay={180}>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                  {subtitle}
                </p>
              </Reveal>

              {/* 6 Visual Capability Pills with Colorful Icons */}
              <Reveal direction="up" delay={250}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {capabilityPills.map((pill, i) => {
                    const PillIcon = pill.icon;
                    return (
                      <div 
                        key={i} 
                        className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e131f] flex items-start gap-3 transition-all hover:scale-[1.02] shadow-sm hover:border-cyan-500/40"
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${pill.bg}`}>
                          <PillIcon size={16} className={pill.color} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{pill.label}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{pill.sub}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Reveal>

            </div>

            {/* Right Column: VIP Alpha Access Card Preview with Embedded Minimal Form (5 cols) */}
            <div className="lg:col-span-5 text-left">
              <Reveal direction="up" delay={200}>
                <div className="w-full p-6 sm:p-8 rounded-3xl border border-cyan-500/30 dark:border-cyan-500/40 bg-white dark:bg-[#0e131f] shadow-2xl relative overflow-hidden">
                  
                  {/* VIP Pass Header */}
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400">
                        <Ticket size={18} />
                      </div>
                      <div>
                        <div className="text-xs font-black text-slate-900 dark:text-white tracking-wider uppercase">{vipPass.badge}</div>
                        <div className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400">{vipPass.passId}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                      <Lock size={10} />
                      <span>{vipPass.tag}</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    {vipPass.desc}
                  </div>

                  {/* Form */}
                  {!submitted ? (
                    <div>
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        <div className="relative">
                          <input
                            type="email"
                            placeholder={vipPass.placeholder}
                            className={`w-full pl-10 pr-4 py-3.5 rounded-xl border text-xs sm:text-sm outline-none transition-all bg-slate-50 dark:bg-[#151c2d] text-slate-900 dark:text-white ${
                              errors.email 
                                ? 'border-rose-500' 
                                : 'border-slate-200 dark:border-slate-800 focus:border-cyan-500 dark:focus:border-cyan-400'
                            }`}
                            {...register('email', {
                              required: true,
                              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                            })}
                          />
                          <Fingerprint size={16} className="absolute left-3.5 top-4 text-slate-400 pointer-events-none" />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-wider text-slate-950 flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-transform hover:scale-[1.02] bg-gradient-to-r ${colorPalette.primary.gradient}`}
                        >
                          <span>{isSubmitting ? vipPass.ctaSubmitting : vipPass.ctaDefault}</span>
                          <ArrowRight size={14} />
                        </button>
                      </form>

                      {errors.email && (
                        <div className="text-left text-xs text-rose-500 dark:text-rose-400 mt-2 ml-1">
                          Please enter a valid email address
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl border flex items-center gap-3 bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                      <CheckCircle2 size={18} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                      <div>
                        <div>{vipPass.successHeading}</div>
                        <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-normal mt-0.5">{vipPass.successSub}</div>
                      </div>
                    </div>
                  )}

                  <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>{vipPass.queue}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">{vipPass.guarantee}</span>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>

        </div>
      </section>
    </ScrollElement>
  );
};
