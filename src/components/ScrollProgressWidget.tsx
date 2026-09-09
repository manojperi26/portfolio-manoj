import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

const SECTIONS = [
  { id: 'hero', name: 'Intro' },
  { id: 'skills', name: 'Skills' },
  { id: 'projects', name: 'Projects' },
  { id: 'certifications', name: 'Certs' },
  { id: 'internships', name: 'Experience' },
  { id: 'university', name: 'Education' },
  { id: 'resume', name: 'Resume' },
];

export const ScrollProgressWidget: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollTop(scrollY > 400);

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(100, Math.max(0, Math.round((scrollY / totalScroll) * 100)));
        setScrollProgress(progress);
      }

      // Detect active section
      const threshold = scrollY + 200;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= threshold) {
          setActiveSection(SECTIONS[i].name);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 left-5 z-40 flex items-center gap-2 pointer-events-auto">
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, x: -10 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, x: -10 }}
            className="flex items-center gap-2 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-xs px-3 py-1.5 border border-[#E2E8F0] dark:border-[#1E293B] font-mono text-xs"
          >
            {/* Circular Progress Ring with Terracotta Accent */}
            <div className="relative w-5 h-5 flex items-center justify-center">
              <svg className="w-5 h-5 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200 dark:text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#E05638] transition-all duration-150 ease-out"
                  strokeDasharray={`${scrollProgress}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="square"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            </div>

            {/* Monospaced Progress and Active Section */}
            <span className="font-bold text-[#0F172A] dark:text-[#F1F5F9]">
              [{scrollProgress}%]
            </span>

            <span className="hidden sm:inline text-slate-500 dark:text-slate-400 text-[11px] border-l border-[#E2E8F0] dark:border-[#1E293B] pl-2 uppercase">
              {activeSection}
            </span>

            {/* Jump to top button */}
            <button
              onClick={scrollToTop}
              title="Back to Top"
              aria-label="Scroll back to top"
              className="p-1 hover:bg-slate-100 dark:hover:bg-[#1E293B] text-slate-500 hover:text-[#E05638] transition-colors cursor-pointer border-l border-[#E2E8F0] dark:border-[#1E293B] pl-1.5"
            >
              <ArrowUp className="w-3.5 h-3.5 text-[#E05638]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
