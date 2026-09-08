import React from 'react';
import { ArrowUp, Mail, Phone, Linkedin, Github } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenEmail?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEmail }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-14 bg-gradient-to-b from-slate-900 to-[#0B1120] dark:from-[#070D18] dark:to-[#040810] text-slate-200 border-t border-slate-800 dark:border-slate-800/80 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        {/* Scroll To Top Button */}
        <div className="flex flex-col items-center mb-8">
          <button
            onClick={scrollToTop}
            className="p-3 bg-slate-800/80 hover:bg-slate-700 text-cyan-400 rounded-full shadow-md hover:shadow-cyan-500/20 border border-slate-700 transition-all hover:-translate-y-1 group cursor-pointer mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <h2 className="text-2xl font-extrabold text-white tracking-tight mb-2">
            {PERSONAL_INFO.name}
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-cyan-400 mb-6 text-center max-w-xl">
            <span>{PERSONAL_INFO.roleSubtitle}</span>
          </div>

          {/* Social Links Row */}
          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={onOpenEmail}
              className="p-2.5 rounded-full bg-slate-800/90 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/60 shadow-2xs transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              title={`Email: ${PERSONAL_INFO.email} (Click for Gmail / Mail options)`}
              aria-label={`Email ${PERSONAL_INFO.name}`}
            >
              <Mail className="w-4 h-4" />
            </button>
            <a
              href={`tel:${PERSONAL_INFO.phoneRaw}`}
              className="p-2.5 rounded-full bg-slate-800/90 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/60 shadow-2xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              title="Phone"
              aria-label={`Phone ${PERSONAL_INFO.name}`}
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-slate-800/90 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/60 shadow-2xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-slate-800/90 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/60 shadow-2xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              title="GitHub"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with precision for AI, Data Science & Scalable Solutions</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
