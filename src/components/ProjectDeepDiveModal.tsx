import React, { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  X,
  Github,
  ExternalLink,
  Layers,
  CheckCircle2,
  BarChart2,
  Wrench,
  ArrowRight,
} from 'lucide-react';
import { Project } from '../types';
import { SmoothImage } from './SmoothImage';

interface ProjectDeepDiveModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDeepDiveModal: React.FC<ProjectDeepDiveModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project || !project.deepDive) return null;

  const { deepDive } = project;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Dialog Content */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="deepdive-modal-title"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 10 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0B0F17] border border-[#E2E8F0] dark:border-[#1E293B] z-10 flex flex-col text-[#0F172A] dark:text-[#F1F5F9]"
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-30 bg-white/95 dark:bg-[#0B0F17]/95 backdrop-blur-md px-6 py-4 border-b border-[#E2E8F0] dark:border-[#1E293B] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#0F172A] dark:bg-[#F1F5F9] text-[#F1F5F9] dark:text-[#0F172A]">
                  <Layers className="w-4 h-4 text-[#E05638]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500 dark:text-slate-400">
                    <span className="text-[#E05638] font-bold">[PROJECT ARCHITECTURE DOSSIER]</span>
                    <span>//</span>
                    <span>TECHNICAL OVERVIEW</span>
                  </div>
                  <h2 id="deepdive-modal-title" className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#0F172A] dark:text-[#F1F5F9]">
                    {project.title}
                  </h2>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#E05638] hover:text-[#E05638] text-slate-500 transition-colors cursor-pointer"
                aria-label="Close Deep-Dive Dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Architecture Hero Banner */}
              <div className="border border-[#E2E8F0] dark:border-[#1E293B] bg-slate-50 dark:bg-[#0F172A] p-6 text-[#0F172A] dark:text-[#F1F5F9]">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2 max-w-2xl">
                    <span className="inline-block px-2.5 py-0.5 font-mono text-[10px] font-bold bg-[#0F172A] text-[#F1F5F9] dark:bg-[#F1F5F9] dark:text-[#0F172A]">
                      [CORE ARCHETYPE]
                    </span>
                    <h3 className="text-lg sm:text-xl font-serif font-bold tracking-tight leading-snug">
                      {deepDive.architectureTagline}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                      {project.description}
                    </p>
                  </div>

                  {/* Quick CTAs */}
                  <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-[#0F172A] dark:border-[#F1F5F9] hover:bg-[#E05638] hover:border-[#E05638] hover:text-white dark:hover:bg-[#E05638] dark:hover:border-[#E05638] transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>[SOURCE]</span>
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#0F172A] text-[#F1F5F9] dark:bg-[#F1F5F9] dark:text-[#0F172A] hover:bg-[#E05638] dark:hover:bg-[#E05638] dark:hover:text-white font-bold transition-colors"
                      >
                        <span>[LIVE DEMO]</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Tech Stack Pills in Modal */}
                <div className="mt-4 pt-3 border-t border-[#E2E8F0] dark:border-[#1E293B] flex flex-wrap gap-1.5 font-mono text-[10px]">
                  <span className="text-slate-400 uppercase mr-1 py-0.5">TECH STACK:</span>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-white dark:bg-[#0B0F17] border border-[#E2E8F0] dark:border-[#1E293B] text-slate-700 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Banner Thumbnail Preview */}
                <div className="mt-5 border border-[#E2E8F0] dark:border-[#1E293B] aspect-[16/9] max-h-56 w-full overflow-hidden bg-slate-950 dark:bg-white flex items-center justify-center">
                  <SmoothImage
                    src={project.image}
                    alt={project.title}
                    width={1280}
                    height={720}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* SECTION 1: SYSTEM ARCHITECTURE & PIPELINE STAGES */}
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#E2E8F0] dark:border-[#1E293B]">
                  <Layers className="w-4 h-4 text-[#E05638]" />
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0F172A] dark:text-[#F1F5F9]">
                    01. End-to-End Pipeline Stages
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {deepDive.pipelineSteps.map((step) => (
                    <div
                      key={step.step}
                      className="p-4 bg-slate-50 dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-xs font-bold text-[#E05638]">
                            [STAGE {step.step}]
                          </span>
                        </div>
                        <h5 className="font-serif font-bold text-sm text-[#0F172A] dark:text-[#F1F5F9] mb-1">
                          {step.title}
                        </h5>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 2: QUANTITATIVE RESULTS (ONLY WHEN AUTHENTIC METRICS EXIST) */}
              {deepDive.quantitativeResults && deepDive.quantitativeResults.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#E2E8F0] dark:border-[#1E293B]">
                    <BarChart2 className="w-4 h-4 text-[#E05638]" />
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0F172A] dark:text-[#F1F5F9]">
                      02. Quantitative Results
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {deepDive.quantitativeResults.map((result, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 bg-slate-50 dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#E05638] shrink-0 mt-0.5" />
                        <span className="font-mono text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                          {result}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION 3: ENGINEERING NOTES (ONLY WHEN AUTHENTIC NOTES EXIST) */}
              {deepDive.engineeringNotes && deepDive.engineeringNotes.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#E2E8F0] dark:border-[#1E293B]">
                    <Wrench className="w-4 h-4 text-[#E05638]" />
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0F172A] dark:text-[#F1F5F9]">
                      03. Engineering Notes
                    </h4>
                  </div>

                  <div className="space-y-2">
                    {deepDive.engineeringNotes.map((note, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans"
                      >
                        <span className="font-mono text-[#E05638] font-bold text-xs shrink-0 mt-0.5">
                          [0{idx + 1}]
                        </span>
                        <span>{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white/95 dark:bg-[#0B0F17]/95 backdrop-blur-md px-6 py-4 border-t border-[#E2E8F0] dark:border-[#1E293B] flex items-center justify-between font-mono text-xs">
              <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">
                [ESC TO CLOSE]
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-[#E2E8F0] dark:border-[#1E293B] hover:bg-slate-100 dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
                >
                  [CLOSE]
                </button>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0F172A] text-[#F1F5F9] dark:bg-[#F1F5F9] dark:text-[#0F172A] hover:bg-[#E05638] dark:hover:bg-[#E05638] dark:hover:text-white font-bold transition-colors"
                >
                  <span>[OPEN GITHUB REPO]</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
