import React, { useState } from 'react';
import { Download, FileText, Maximize2, X, Printer } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ResumeDocument } from './ResumeDocument';
import { SectionFade } from './SectionFade';
import { SmoothImage } from './SmoothImage';
import { useFocusTrap } from '../hooks/useFocusTrap';

export const ResumeSection: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const lightboxRef = useFocusTrap<HTMLDivElement>(lightboxOpen, () => setLightboxOpen(false));

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="resume" className="relative py-20 md:py-24 bg-gradient-to-b from-white via-slate-50 to-slate-100/60 dark:from-[#070D18] dark:via-[#091322] dark:to-[#070D18] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Header */}
        <SectionFade className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-violet-100/90 dark:bg-violet-950/70 text-violet-800 dark:text-violet-300 mb-3 border border-violet-200 dark:border-violet-800/80">
            <FileText className="w-3.5 h-3.5 text-violet-700 dark:text-violet-400" />
            <span>Curriculum Vitae</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            My Resume
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Review my specialized qualifications, cloud certifications, education, and technical experience.
          </p>
        </SectionFade>

        {/* Resume Preview Card */}
        <SectionFade delay={0.1} className="max-w-4xl lg:max-w-5xl mx-auto w-full">
          <div className="bg-white dark:bg-[#0B1528] rounded-3xl p-5 sm:p-8 lg:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl dark:hover:shadow-cyan-950/40 hover:border-cyan-300 dark:hover:border-cyan-500 transition-all duration-300 flex flex-col items-center">
            {/* Document Frame - Full readable document container */}
            <div className="relative w-full bg-slate-100 dark:bg-slate-900/80 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-inner group mb-8 p-2 sm:p-5 overflow-hidden">
              <div className="w-full max-h-[840px] overflow-y-auto rounded-xl bg-white shadow-md border border-slate-200/70">
                <ResumeDocument interactive={true} />
              </div>

              {/* Quick Expand Badge */}
              <button
                onClick={() => setLightboxOpen(true)}
                className="absolute top-5 right-5 sm:top-8 sm:right-8 px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-bold shadow-lg flex items-center gap-1.5 backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
                title="Expand to Fullscreen"
              >
                <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Expand Fullscreen</span>
              </button>
            </div>

            {/* Download and Zoom Controls */}
            <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
              <a
                id="resume-download-button"
                href="https://drive.google.com/uc?export=download&id=1v7TS9Fo_nFJ7VyfObNFY9mfm7HWfxXb0"
                download="Peri_Manoj_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                title="Download Resume (PDF)"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-bold text-sm shadow-md shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>

              <button
                id="resume-preview-button"
                onClick={() => setLightboxOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white dark:bg-slate-800 hover:bg-cyan-50/50 dark:hover:bg-slate-700 text-cyan-700 dark:text-cyan-300 hover:text-cyan-800 dark:hover:text-cyan-200 font-semibold text-sm border-2 border-cyan-400/80 dark:border-cyan-500 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
              >
                <Maximize2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Full Interactive View</span>
              </button>
            </div>
          </div>
        </SectionFade>
      </div>

      {/* Subtle organic section divider to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200/80 dark:via-slate-800 to-transparent" />

      {/* Lightbox Modal with Interactive Document */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#0B1120]/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxOpen(false);
          }}
        >
          <div
            ref={lightboxRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-lightbox-title"
            className="relative max-w-4xl max-h-[96vh] w-full flex flex-col items-center my-auto"
          >
            {/* Modal Controls */}
            <div className="w-full flex items-center justify-between pb-3 text-white px-2">
              <span id="resume-lightbox-title" className="text-sm font-semibold truncate">
                Curriculum Vitae — {PERSONAL_INFO.name}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  title="Print / Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Print / PDF</span>
                </button>
                <a
                  href="https://drive.google.com/uc?export=download&id=1v7TS9Fo_nFJ7VyfObNFY9mfm7HWfxXb0"
                  download="Peri_Manoj_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Download Resume (PDF)"
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-label="Close Preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Interactive Document Container */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl p-2 sm:p-4 border border-slate-200 dark:border-slate-800">
              <ResumeDocument interactive={true} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
