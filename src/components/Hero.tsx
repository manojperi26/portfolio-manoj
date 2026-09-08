import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Github, Download, MapPin, GraduationCap, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { SmoothImage } from './SmoothImage';

interface HeroProps {
  onOpenContact: () => void;
  onOpenEmail: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onOpenEmail }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-cyan-50/40 via-white to-slate-50/80 dark:from-[#0B1528] dark:via-[#070D18] dark:to-[#070D18] transition-colors duration-300"
    >
      {/* Subtle background ambient decorations */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden opacity-60">
        <div className="absolute -top-10 left-10 w-72 h-72 rounded-full bg-cyan-300/20 dark:bg-cyan-500/15 blur-3xl animate-pulse" />
        <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-violet-400/15 dark:bg-violet-600/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-sky-200/20 dark:bg-sky-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Text & Content */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Status Line */}
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full text-xs font-semibold text-violet-900 dark:text-cyan-200 bg-violet-50 dark:bg-slate-800/90 border border-violet-200 dark:border-slate-700 shadow-2xs">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span>Open to internships / AI & ML opportunities</span>
            </div>

            {/* Name */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] md:leading-[1.1] mb-3">
              {PERSONAL_INFO.name}
            </h1>

            {/* Subtitle / Roles */}
            <div className="text-base sm:text-lg md:text-xl font-semibold text-violet-700 dark:text-cyan-400 mb-5 leading-snug">
              <span>AI & Data Science Engineer | Python | Machine Learning | Deep Learning</span>
            </div>

            {/* Bio Paragraph */}
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed md:leading-8 mb-6 max-w-2xl font-normal">
              {PERSONAL_INFO.bio}
            </p>

            {/* Education Quick Tag */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-medium text-slate-500 dark:text-slate-400 mb-7 py-2.5 px-4 rounded-xl bg-white/90 dark:bg-slate-800/80 backdrop-blur-xs border border-slate-200/80 dark:border-slate-700 shadow-xs">
              <span className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
                <GraduationCap className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span>B.Tech in Computer Science Engineering - AI & Data Science (2024 - 2028)</span>
              </span>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-600">•</span>
              <span className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Lovely Professional University, Punjab</span>
              </span>
            </div>

            {/* CTA Hierarchy: Primary "Get in Touch", Secondary "Download Resume" */}
            <div className="flex flex-wrap items-center gap-3.5 mb-7 w-full sm:w-auto">
              {/* Primary CTA (cyan-to-violet gradient background, white text, soft glow on hover) */}
              <button
                id="hero-get-in-touch-btn"
                onClick={onOpenContact}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-semibold text-sm shadow-md shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary CTA: Download Resume directly from local PDF */}
              <a
                id="hero-resume-download"
                href={PERSONAL_INFO.resumeUrl}
                download="Peri_Manoj_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                title="Download Resume (PDF)"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white dark:bg-slate-800 hover:bg-cyan-50/50 dark:hover:bg-slate-700 text-cyan-700 dark:text-cyan-300 hover:text-cyan-800 dark:hover:text-cyan-200 font-semibold text-sm border-2 border-cyan-400 dark:border-cyan-500 shadow-xs hover:shadow-md hover:shadow-cyan-500/10 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
              >
                <Download className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Contact Quick Icons */}
            <div className="flex items-center gap-2.5 pt-3 border-t border-slate-200/60 dark:border-slate-800 w-full max-w-lg">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400 mr-1.5">Reach Me:</span>
              <button
                id="hero-email-link"
                onClick={onOpenEmail}
                className="p-2.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 hover:border-cyan-300 dark:hover:border-cyan-500 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
                title={`Email: ${PERSONAL_INFO.email} (Click for Gmail / Mail options)`}
                aria-label={`Email ${PERSONAL_INFO.name}`}
              >
                <Mail className="w-4 h-4" />
              </button>
              <a
                id="hero-phone-link"
                href={`tel:${PERSONAL_INFO.phoneRaw}`}
                className="p-2.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 hover:border-cyan-300 dark:hover:border-cyan-500 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
                title={`Call: ${PERSONAL_INFO.phone}`}
                aria-label={`Call ${PERSONAL_INFO.name}`}
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                id="hero-linkedin-link"
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-300 dark:hover:border-violet-500 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                id="hero-github-link"
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
                title="GitHub Repositories"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Hero Profile Visual with Circular Container */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-5 flex justify-center lg:justify-end relative"
          >
            <div className="relative flex flex-col items-center">
              {/* Ambient Glow Halo */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-cyan-400/30 via-violet-500/25 to-sky-300/30 dark:from-cyan-500/25 dark:via-violet-600/20 dark:to-cyan-400/20 blur-2xl pointer-events-none -z-10" />

              {/* Circular Photo Container */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-92 lg:h-92 rounded-full p-2 bg-gradient-to-tr from-cyan-400 via-sky-300 to-violet-500 shadow-2xl shadow-cyan-500/20">
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-900 shadow-inner">
                  <SmoothImage
                    id="hero-profile-image"
                    src={PERSONAL_INFO.profileImage}
                    alt={PERSONAL_INFO.name}
                    width={368}
                    height={368}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Decorative Pill Badge Below Photo */}
              <div className="mt-4 px-4 py-1.5 rounded-full bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-700 shadow-md text-xs font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span>AI &amp; Data Science Engineer</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle organic section divider to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200/80 dark:via-slate-800 to-transparent" />
    </section>
  );
};

