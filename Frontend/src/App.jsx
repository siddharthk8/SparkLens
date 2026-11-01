import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/landing/HeroSection';
import { VisualPipelineSection } from './components/landing/VisualPipelineSection';
import { VisualSandboxSection } from './components/landing/VisualSandboxSection';
import { VisualComparisonSection } from './components/landing/VisualComparisonSection';
import { ComingSoonSection } from './components/landing/ComingSoonSection';
import { Footer } from './components/layout/Footer';

function LandingPage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <VisualPipelineSection />
      <VisualSandboxSection />
      <VisualComparisonSection />
      <ComingSoonSection />
    </main>
  );
}

export function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/welcome" element={<LandingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
