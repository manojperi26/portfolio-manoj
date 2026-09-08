import React, { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  X,
  Github,
  ExternalLink,
  Cpu,
  Layers,
  CheckCircle2,
  AlertTriangle,
  BarChart2,
  Database,
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
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0B1528] rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xl z-10 flex flex-col text-slate-900 dark:text-slate-100"
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-30 bg-white/95 dark:bg-[#0B1528]/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 border border-cyan-200/80 dark:border-cyan-800/60">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                      Technical Architecture
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      Engineering Deep-Dive
                    </span>
                  </div>
                  <h2 id="deepdive-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {project.title}
                  </h2>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close Deep-Dive Dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Architecture Hero Banner */}
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 via-[#0A1628] to-slate-950 border border-slate-800 p-6 text-white shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2 max-w-xl">
                    <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      Core Pipeline Archetype
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                      {deepDive.architectureTagline}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Quick CTAs */}
                  <div className="flex items-center gap-2.5 shrink-0">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-colors shadow-xs"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Source Code</span>
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 transition-colors shadow-sm"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Banner Thumbnail Preview */}
                <div className="mt-5 rounded-lg overflow-hidden border border-slate-700/60 aspect-[16/9] max-h-56 w-full">
                  <SmoothImage
                    src={project.image}
                    alt={project.title}
                    width={1280}
                    height={720}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              {/* SECTION 1: SYSTEM ARCHITECTURE & PIPELINE STAGES */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <h4 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
                    1. End-to-End System Architecture Flow
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {deepDive.pipelineSteps.map((step, idx) => (
                    <div
                      key={step.step}
                      className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/90 relative flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-extrabold text-cyan-600 dark:text-cyan-400 tracking-wider">
                            STEP {step.step}
                          </span>
                          <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                            {step.tech}
                          </span>
                        </div>
                        <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                          {step.title}
                        </h5>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 2: QUANTITATIVE BENCHMARKS & EVALUATION */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BarChart2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <h4 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
                    2. Quantitative Performance Benchmarks
                  </h4>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  {deepDive.benchmarks.map((b) => (
                    <div
                      key={b.metric}
                      className="p-4 rounded-xl bg-gradient-to-b from-cyan-500/5 to-transparent dark:from-cyan-950/20 border border-cyan-200/60 dark:border-cyan-900/60"
                    >
                      <div className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-300 tracking-tight mb-1">
                        {b.value}
                      </div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                        {b.metric}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                        {b.notes}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900/40 px-3 py-2 rounded-lg border border-slate-200/60 dark:border-slate-800/60">
                  <Database className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span>
                    <strong>Evaluation Dataset:</strong> {deepDive.datasetInfo}
                  </span>
                </div>
              </div>

              {/* SECTION 3: KEY ARCHITECTURAL DECISIONS */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h4 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
                    3. Architectural Decisions & Trade-Offs
                  </h4>
                </div>

                <div className="space-y-2.5">
                  {deepDive.keyDecisions.map((decision, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed"
                    >
                      <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span>{decision}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 4: ENGINEERING CHALLENGES & SOLUTIONS */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <h4 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
                    4. Overcoming Core Engineering Obstacles
                  </h4>
                </div>

                <div className="space-y-3">
                  {deepDive.challenges.map((c, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 space-y-2"
                    >
                      <div className="flex items-start gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80 shrink-0">
                          Problem
                        </span>
                        <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                          {c.problem}
                        </p>
                      </div>
                      <div className="flex items-start gap-2 pl-2 border-l-2 border-cyan-500 dark:border-cyan-400 ml-2 mt-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/80 shrink-0">
                          Solution
                        </span>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                          {c.solution}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white/95 dark:bg-[#0B1528]/95 backdrop-blur-md px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
                Press <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700 text-[11px] font-mono font-semibold">ESC</kbd> to close
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Close
                </button>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 shadow-sm transition-colors"
                >
                  <span>View Repository on GitHub</span>
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
