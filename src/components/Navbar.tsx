import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, ArrowUpRight, Download, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#internships', label: 'Internships' },
    { href: '#resume', label: 'Resume' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Background blur transition
      setIsScrolled(window.scrollY > 20);

      // Scroll progress percentage calculation
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      // Active Section Spy
      const sectionIds = navLinks.map((l) => l.href.substring(1));
      const scrollThreshold = window.scrollY + 160;

      // Handle bottom of page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollThreshold) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Scroll Progress Bar Fixed at Very Top */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#E2E8F0] dark:bg-[#1E293B] z-50 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-[#E05638] transition-[width] duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F8F9FA]/95 dark:bg-[#0B0F17]/95 backdrop-blur-md border-b border-[#E2E8F0] dark:border-[#1E293B] py-2.5'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#hero"
            className="group flex items-center gap-3 text-[#0F172A] dark:text-[#F1F5F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638]"
          >
            <div className="w-8 h-8 flex items-center justify-center bg-[#0F172A] dark:bg-[#F1F5F9] text-[#F1F5F9] dark:text-[#0F172A] font-mono text-sm font-bold group-hover:bg-[#E05638] dark:group-hover:bg-[#E05638] dark:group-hover:text-white transition-colors">
              M
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base tracking-tight leading-tight group-hover:text-[#E05638] transition-colors">
                {PERSONAL_INFO.name}
              </span>
              <span className="font-mono text-[10px] tracking-wider uppercase text-slate-500 dark:text-slate-400">
                AI &amp; DATA SCIENCE
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-md px-2 py-1 border border-[#E2E8F0] dark:border-[#1E293B]"
          >
            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group relative px-3 py-1 text-xs font-mono tracking-tight transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638] ${
                    isActive
                      ? 'bg-[#0F172A] dark:bg-[#F1F5F9] text-[#F1F5F9] dark:text-[#0F172A] font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-[#E05638] dark:hover:text-[#E05638] hover:bg-slate-100/60 dark:hover:bg-[#1E293B]/60'
                  }`}
                >
                  <span className="opacity-50 mr-1 text-[10px]">0{idx + 1}.</span>
                  <span>{link.label}</span>
                  {!isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-2 right-2 h-[1.5px] bg-[#E05638] scale-x-0 group-hover:scale-x-100 transition-transform duration-150 ease-out origin-left"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Dark / Light Mode Toggle Button */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to Light mode' : 'Switch to Matte Graphite mode'}
              title={isDark ? 'Switch to Light mode' : 'Switch to Matte Graphite mode'}
              className="p-2 border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] text-slate-700 dark:text-slate-200 hover:border-[#E05638] dark:hover:border-[#E05638] hover:text-[#E05638] dark:hover:text-[#E05638] transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638]"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-[#E05638]" />
              ) : (
                <Moon className="w-4 h-4 text-[#0F172A]" />
              )}
            </button>

            <button
              id="nav-contact-btn"
              onClick={onOpenContact}
              className="group/contact inline-flex items-center gap-1.5 px-3.5 py-1.5 font-mono text-xs font-semibold text-[#0F172A] dark:text-[#F1F5F9] bg-transparent hover:bg-slate-100 dark:hover:bg-[#1E293B] border border-[#0F172A] dark:border-[#F1F5F9] hover:border-[#E05638] hover:text-[#E05638] dark:hover:border-[#E05638] dark:hover:text-[#E05638] transition-all duration-150 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638]"
            >
              <Mail className="w-3.5 h-3.5 text-[#E05638] transition-transform duration-150 ease-out motion-safe:group-hover/contact:scale-110" />
              <span>[CONTACT]</span>
            </button>
            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Peri_Manoj_Resume.pdf"
              title="Download Resume (PDF)"
              className="group/cta inline-flex items-center gap-1.5 px-3.5 py-1.5 font-mono text-xs font-bold text-[#F1F5F9] dark:text-[#0F172A] bg-[#0F172A] dark:bg-[#F1F5F9] hover:bg-[#E05638] dark:hover:bg-[#E05638] dark:hover:text-white transition-all duration-150 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638]"
            >
              <span>[RESUME.PDF]</span>
              <ArrowUpRight className="w-3 h-3 transition-transform duration-150 ease-out motion-safe:group-hover/cta:translate-x-0.5 motion-safe:group-hover/cta:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile menu and toggle button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-nav-theme-toggle"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to Light mode' : 'Switch to Graphite mode'}
              className="p-2 border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] text-slate-700 dark:text-slate-200"
            >
              {isDark ? <Sun className="w-4 h-4 text-[#E05638]" /> : <Moon className="w-4 h-4 text-[#0F172A]" />}
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] text-slate-700 dark:text-slate-200 hover:text-[#E05638] dark:hover:text-[#E05638] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638]"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Animated Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-nav-menu"
              initial={shouldReduceMotion ? false : { opacity: 0, height: 0, y: -6 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, height: 'auto', y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, height: 0, y: -6 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="lg:hidden overflow-hidden bg-[#F8F9FA] dark:bg-[#0B0F17] border-b border-[#E2E8F0] dark:border-[#1E293B] px-4 pt-3 pb-5 space-y-3"
            >
              <div className="grid grid-cols-2 gap-1.5 py-1">
                {navLinks.map((link, idx) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`px-3 py-2 font-mono text-xs transition-colors border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638] ${
                        isActive
                          ? 'bg-[#0F172A] dark:bg-[#F1F5F9] text-[#F1F5F9] dark:text-[#0F172A] font-bold border-[#0F172A] dark:border-[#F1F5F9]'
                          : 'text-slate-700 dark:text-slate-200 border-transparent hover:border-[#E2E8F0] dark:hover:border-[#1E293B] hover:bg-white dark:hover:bg-[#0F172A]'
                      }`}
                    >
                      <span className="opacity-50 mr-1 text-[10px]">0{idx + 1}.</span>
                      {link.label}
                    </a>
                  );
                })}
              </div>

              {/* Theme toggle row in drawer */}
              <div className="flex items-center justify-between px-3.5 py-2 bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B]">
                <span className="font-mono text-xs text-slate-700 dark:text-slate-200 flex items-center gap-2">
                  {isDark ? <Moon className="w-3.5 h-3.5 text-[#E05638]" /> : <Sun className="w-3.5 h-3.5 text-[#E05638]" />}
                  <span>THEME: {isDark ? 'MATTE GRAPHITE' : 'EGGSHELL CHALK'}</span>
                </span>
                <button
                  id="mobile-theme-toggle-btn"
                  onClick={toggleTheme}
                  className="px-2.5 py-1 font-mono text-xs font-bold bg-[#0F172A] dark:bg-[#F1F5F9] text-[#F1F5F9] dark:text-[#0F172A] transition-colors cursor-pointer"
                >
                  TOGGLE
                </button>
              </div>

              <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#1E293B] flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="w-full py-2.5 px-4 font-mono text-xs font-semibold bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F1F5F9] border border-[#0F172A] dark:border-[#F1F5F9] flex items-center justify-center gap-2 hover:bg-[#E05638] hover:border-[#E05638] hover:text-white dark:hover:bg-[#E05638] dark:hover:text-white transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-[#E05638]" />
                  <span>[CONTACT]</span>
                </button>
                <a
                  href={PERSONAL_INFO.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Peri_Manoj_Resume.pdf"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-4 font-mono text-xs font-bold bg-[#0F172A] dark:bg-[#F1F5F9] text-[#F1F5F9] dark:text-[#0F172A] hover:bg-[#E05638] dark:hover:bg-[#E05638] dark:hover:text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>[DOWNLOAD RESUME.PDF]</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

