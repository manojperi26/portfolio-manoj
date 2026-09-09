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
    <footer className="py-14 bg-white dark:bg-[#070D18] text-slate-700 dark:text-slate-300 border-t border-[#E2E8F0] dark:border-[#1E293B] transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        {/* Scroll To Top Button */}
        <div className="flex flex-col items-center mb-8">
          <button
            onClick={scrollToTop}
            className="px-3 py-1.5 bg-slate-50 dark:bg-[#0B0F17] hover:bg-[#0F172A] hover:text-[#F1F5F9] dark:hover:bg-[#F1F5F9] dark:hover:text-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] font-mono text-xs text-slate-700 dark:text-slate-300 font-bold transition-colors cursor-pointer mb-6 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638]"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#E05638]" />
            <span>[BACK TO TOP]</span>
          </button>

          <div className="font-mono text-xs text-[#E05638] font-bold tracking-widest uppercase mb-1">
            ENGINEERING PORTFOLIO
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A] dark:text-[#F1F5F9] tracking-tight mb-2 text-center">
            {PERSONAL_INFO.name}
          </h2>

          <div className="font-mono text-xs text-slate-500 dark:text-slate-400 mb-6 text-center max-w-xl">
            {PERSONAL_INFO.roleSubtitle.toUpperCase()}
          </div>

          {/* Social Links Row */}
          <div className="flex items-center gap-2 mb-6 font-mono text-xs">
            <button
              onClick={onOpenEmail}
              className="p-2.5 bg-slate-50 dark:bg-[#0B0F17] border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#E05638] text-slate-700 dark:text-slate-300 hover:text-[#E05638] transition-colors cursor-pointer"
              title={`Email: ${PERSONAL_INFO.email} (Click for Gmail / Mail options)`}
              aria-label={`Email ${PERSONAL_INFO.name}`}
            >
              <Mail className="w-4 h-4" />
            </button>
            <a
              href={`tel:${PERSONAL_INFO.phoneRaw}`}
              className="p-2.5 bg-slate-50 dark:bg-[#0B0F17] border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#E05638] text-slate-700 dark:text-slate-300 hover:text-[#E05638] transition-colors"
              title="Phone"
              aria-label={`Phone ${PERSONAL_INFO.name}`}
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-slate-50 dark:bg-[#0B0F17] border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#E05638] text-slate-700 dark:text-slate-300 hover:text-[#E05638] transition-colors"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-slate-50 dark:bg-[#0B0F17] border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#E05638] text-slate-700 dark:text-slate-300 hover:text-[#E05638] transition-colors"
              title="GitHub"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 border-t border-[#E2E8F0] dark:border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-500 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} {PERSONAL_INFO.name.toUpperCase()}. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#E05638]" />
            <span>[AI &amp; DATA SCIENCE PORTFOLIO]</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
