import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { ShieldCheck } from 'lucide-react';
import { Reveal } from '../common/Reveal';
import { SparkLensLogo } from '../common/SparkLensLogo';
import { footerData } from '../../Data/Data.jsx';

export const Footer = () => {
  const { copyright, affiliation, links } = footerData;

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-slate-500 dark:text-slate-400 text-xs bg-white dark:bg-[#07090e] transition-colors duration-200">
      <Reveal direction="up" delay={50}>
        <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <SparkLensLogo size={24} withText={true} />
            <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px]">{copyright}</span>
          </div>

          {/* Authors from Report */}
          <div className="text-center md:text-left text-slate-500 dark:text-slate-400 flex items-center gap-2 flex-wrap justify-center">
            <ShieldCheck size={14} className="text-cyan-600 dark:text-cyan-400" />
            <span>{affiliation}</span>
          </div>

          {/* Scroll Links */}
          <div className="flex items-center gap-5">
            {links.map((link) => {
              const LinkIcon = link.icon;
              return (
                <ScrollLink
                  key={link.name}
                  to={link.href}
                  smooth={true}
                  offset={-65}
                  duration={500}
                  className={`hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer flex items-center gap-1.5 transition-colors ${
                    link.isBold ? "font-bold text-cyan-600 dark:text-cyan-400" : ""
                  }`}
                >
                  <LinkIcon size={13} />
                  <span>{link.name}</span>
                </ScrollLink>
              );
            })}
          </div>

        </div>
      </Reveal>
    </footer>
  );
};
