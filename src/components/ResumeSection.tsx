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
    <section id="resume" className="relative py-20 md:py-24 bg-[#F8F9FA] dark:bg-[#0B0F17] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Header */}
        <SectionFade className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 font-mono text-xs bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] text-slate-700 dark:text-slate-300 mb-3">
            <span className="w-1.5 h-1.5 bg-[#E05638]" />
            <span className="font-bold text-[#0F172A] dark:text-[#F1F5F9]">[RESUME // 05]</span>
            <span className="text-slate-400">CURRICULUM VITAE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A] dark:text-[#F1F5F9] tracking-tight mb-3">
            Resume &amp; Credentials
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed font-sans">
            Summary of academic background, technical skills, coursework, and practical projects.
          </p>
        </SectionFade>

        {/* Resume Preview Card */}
        <SectionFade delay={0.1} className="max-w-4xl lg:max-w-5xl mx-auto w-full">
          <div className="bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] p-5 sm:p-8 flex flex-col items-center">
            {/* Top Dossier Bar */}
            <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-[#E2E8F0] dark:border-[#1E293B] font-mono text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5 font-bold text-[#0F172A] dark:text-[#F1F5F9]">
                <FileText className="w-3.5 h-3.5 text-[#E05638]" />
                <span>DOC: PERI_MANOJ_CV_2026.PDF</span>
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                REVISED: AUGUST 2026 &bull; LATEX FORMAT
              </span>
            </div>

            {/* Document Frame - Full readable document container */}
            <div className="relative w-full bg-slate-100 dark:bg-[#070D18] border border-[#E2E8F0] dark:border-[#1E293B] mb-6 p-2 sm:p-4 overflow-hidden">
              <div className="w-full max-h-[840px] overflow-y-auto bg-white border border-slate-200">
                <ResumeDocument interactive={true} />
              </div>

              {/* Quick Expand Badge */}
              <button
                onClick={() => setLightboxOpen(true)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 px-3 py-1.5 bg-[#0F172A] hover:bg-[#E05638] text-white font-mono text-xs font-bold border border-white/20 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Expand to Fullscreen"
              >
                <Maximize2 className="w-3 h-3 text-[#E05638]" />
                <span className="hidden sm:inline">[FULLSCREEN VIEW]</span>
              </button>
            </div>

            {/* Download and Zoom Controls */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto font-mono text-xs">
              <a
                id="resume-download-button"
                href="https://drive.google.com/uc?export=download&id=1v7TS9Fo_nFJ7VyfObNFY9mfm7HWfxXb0"
                download="Peri_Manoj_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                title="Download Resume (PDF)"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0F172A] text-[#F1F5F9] dark:bg-[#F1F5F9] dark:text-[#0F172A] hover:bg-[#E05638] dark:hover:bg-[#E05638] dark:hover:text-white font-bold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638]"
              >
                <Download className="w-4 h-4" />
                <span>[DOWNLOAD CV // PDF]</span>
              </a>

              <button
                id="resume-preview-button"
                onClick={() => setLightboxOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-[#E2E8F0] dark:border-[#1E293B] hover:bg-slate-100 dark:hover:bg-[#1E293B] text-slate-800 dark:text-slate-200 font-bold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638]"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#E05638]" />
                <span>[VIEW FULL RESUME]</span>
              </button>
            </div>
          </div>
        </SectionFade>
      </div>

      {/* 1px Hairline Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#E2E8F0] dark:bg-[#1E293B]" />

      {/* Lightbox Modal with Interactive Document */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#0F172A]/85 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
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
            {/* Modal Controls Bar */}
            <div className="w-full flex items-center justify-between pb-2 text-white px-2 font-mono text-xs">
              <span id="resume-lightbox-title" className="font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-[#E05638]" />
                [CV-DOSSIER] // {PERSONAL_INFO.name.toUpperCase()}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-2.5 py-1 border border-white/20 hover:border-[#E05638] hover:text-[#E05638] text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Print / Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">[PRINT / PDF]</span>
                </button>
                <a
                  href="https://drive.google.com/uc?export=download&id=1v7TS9Fo_nFJ7VyfObNFY9mfm7HWfxXb0"
                  download="Peri_Manoj_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Download Resume (PDF)"
                  className="px-2.5 py-1 bg-[#E05638] text-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>[DOWNLOAD]</span>
                </a>
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="p-1 border border-white/20 hover:border-[#E05638] hover:text-[#E05638] text-white transition-colors cursor-pointer"
                  aria-label="Close Preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interactive Document Container */}
            <div className="bg-white border border-[#E2E8F0] dark:border-[#1E293B] w-full max-h-[85vh] overflow-y-auto p-2 sm:p-4">
              <ResumeDocument interactive={true} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
