import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Github, Download, MapPin, GraduationCap, ArrowRight, Check } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { SmoothImage } from './SmoothImage';

interface HeroProps {
  onOpenContact: () => void;
  onOpenEmail: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onOpenEmail }) => {
  const shouldReduceMotion = useReducedMotion();
  const [phoneCopied, setPhoneCopied] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 1800);
  };

  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#F8F9FA] dark:bg-[#0B0F17] transition-colors duration-300 lab-grid"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Scholarly Dossier & Content */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Status Line Stamp */}
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 font-mono text-xs bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] text-slate-700 dark:text-slate-300">
              <span className="w-2 h-2 bg-[#E05638] inline-block animate-pulse" />
              <span className="text-[#0F172A] dark:text-[#F1F5F9] font-bold">[STATUS: OPEN TO INTERNSHIPS]</span>
              <span className="text-slate-400 dark:text-slate-500">|</span>
              <span className="text-slate-500 dark:text-slate-400">AI &amp; ML ROLES</span>
            </div>

            {/* Name in Editorial Serif */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-[#0F172A] dark:text-[#F1F5F9] tracking-tight leading-[1.1] mb-3">
              Peri Naga Venkata <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#E05638]">Sai Manoj</span>
            </h1>

            {/* Subtitle / Focus with Monospace Precision */}
            <div className="font-mono text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5 tracking-tight uppercase flex flex-wrap items-center gap-2">
              <span className="text-[#0F172A] dark:text-[#F1F5F9] font-semibold">AI &amp; Data Science Student</span>
              <span className="text-[#E05638]">//</span>
              <span>Python</span>
              <span className="text-slate-400">•</span>
              <span>Machine Learning</span>
              <span className="text-slate-400">•</span>
              <span>Deep Learning</span>
              <span className="text-slate-400">•</span>
              <span>RAG Pipelines</span>
            </div>

            {/* Bio Paragraph */}
            <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl font-sans">
              {PERSONAL_INFO.bio}
            </p>

            {/* Academic Specimen Metadata Card */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-2.5 w-full max-w-2xl mb-7 font-mono text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-[#0F172A] p-3.5 border border-[#E2E8F0] dark:border-[#1E293B]">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#E05638] shrink-0" />
                <span className="font-semibold text-[#0F172A] dark:text-[#F1F5F9]">
                  B.Tech CSE – AI &amp; Data Science (2024–2028)
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Lovely Professional University, Punjab</span>
              </div>
            </div>

            {/* CTA Hierarchy: Flat Ink + Ghost Border Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-7 w-full sm:w-auto font-mono">
              <button
                id="hero-get-in-touch-btn"
                onClick={onOpenContact}
                className="w-full sm:w-auto px-6 py-3 bg-[#0F172A] text-[#F1F5F9] dark:bg-[#F1F5F9] dark:text-[#0F172A] hover:bg-[#E05638] dark:hover:bg-[#E05638] dark:hover:text-white font-bold text-xs tracking-wider uppercase transition-all duration-150 ease-out flex items-center justify-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638]"
              >
                <span>[INITIATE CONTACT]</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 ease-out motion-safe:group-hover:translate-x-1" />
              </button>

              <a
                id="hero-resume-download"
                href={PERSONAL_INFO.resumeUrl}
                download="Peri_Manoj_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                title="Download Resume (PDF)"
                className="group/cv w-full sm:w-auto px-6 py-3 bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F1F5F9] hover:border-[#E05638] hover:text-[#E05638] dark:hover:border-[#E05638] dark:hover:text-[#E05638] font-semibold text-xs tracking-wider uppercase border border-[#0F172A] dark:border-[#F1F5F9] transition-all duration-150 ease-out flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638]"
              >
                <Download className="w-3.5 h-3.5 text-[#E05638] transition-transform duration-150 ease-out motion-safe:group-hover/cv:translate-y-0.5" />
                <span>[DOWNLOAD CURRICULUM VITAE]</span>
              </a>
            </div>

            {/* Contact Quick Row in Monospace */}
            <div className="flex items-center gap-2 pt-3 border-t border-[#E2E8F0] dark:border-[#1E293B] w-full max-w-lg font-mono text-xs">
              <span className="text-slate-400 dark:text-slate-500 uppercase mr-1">CHANNELS:</span>
              
              {/* Email Client Trigger */}
              <button
                id="hero-email-link"
                onClick={onOpenEmail}
                className="p-2 bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] text-slate-700 dark:text-slate-300 hover:border-[#E05638] hover:text-[#E05638] motion-safe:hover:-translate-y-0.5 transition-all duration-150 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638]"
                title={`Launch Email Modal: ${PERSONAL_INFO.email}`}
                aria-label={`Email ${PERSONAL_INFO.name}`}
              >
                <Mail className="w-3.5 h-3.5" />
              </button>

              {/* Phone Direct / Call */}
              <div className="relative">
                <button
                  id="hero-copy-phone-btn"
                  onClick={handleCopyPhone}
                  className="p-2 bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] text-slate-700 dark:text-slate-300 hover:border-[#E05638] hover:text-[#E05638] motion-safe:hover:-translate-y-0.5 transition-all duration-150 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638]"
                  title={`Copy Phone Number: ${PERSONAL_INFO.phone}`}
                  aria-label={`Copy Phone Number ${PERSONAL_INFO.phone}`}
                >
                  {phoneCopied ? (
                    <Check className="w-3.5 h-3.5 text-[#E05638]" />
                  ) : (
                    <Phone className="w-3.5 h-3.5" />
                  )}
                </button>
                {phoneCopied && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#0F172A] dark:bg-[#F1F5F9] text-white dark:text-[#0F172A] text-[9px] font-mono font-bold shadow-lg border border-[#E05638] z-30 whitespace-nowrap animate-in fade-in duration-150 pointer-events-none">
                    [COPIED TO CLIPBOARD]
                  </div>
                )}
              </div>

              {/* LinkedIn */}
              <a
                id="hero-linkedin-link"
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] text-slate-700 dark:text-slate-300 hover:border-[#E05638] hover:text-[#E05638] motion-safe:hover:-translate-y-0.5 transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638]"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>

              {/* GitHub */}
              <a
                id="hero-github-link"
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] text-slate-700 dark:text-slate-300 hover:border-[#E05638] hover:text-[#E05638] motion-safe:hover:-translate-y-0.5 transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638]"
                title="GitHub Repositories"
                aria-label="GitHub Profile"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Profile Photo */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-5 flex justify-center lg:justify-end relative"
          >
            <div className="relative w-full max-w-sm">
              <div className="bg-white dark:bg-[#0F172A] p-2.5 border border-[#E2E8F0] dark:border-[#1E293B]">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-900 border border-[#E2E8F0] dark:border-[#1E293B]">
                  <SmoothImage
                    id="hero-profile-image"
                    src={PERSONAL_INFO.profileImage}
                    alt={PERSONAL_INFO.name}
                    width={368}
                    height={460}
                    className="w-full h-full object-cover object-top filter grayscale contrast-105 hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 1px Hairline Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#E2E8F0] dark:bg-[#1E293B]" />
    </section>
  );
};

