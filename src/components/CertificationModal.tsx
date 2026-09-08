import React from 'react';
import { X, ExternalLink, ShieldCheck, Calendar, Award, ZoomIn } from 'lucide-react';
import { Certification } from '../types';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface CertificationModalProps {
  certification: Certification | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificationModal: React.FC<CertificationModalProps> = ({
  certification,
  isOpen,
  onClose,
}) => {
  const modalRef = useFocusTrap<HTMLDivElement>(isOpen, onClose);

  if (!isOpen || !certification) return null;

  // Fallback map for certificate vector badges / preview graphics
  const fallbackMap: Record<string, string> = {
    'cert-lpu-ai': '/portfolio/cert-lpu-ai.svg',
    'cert-drishti-cps': '/portfolio/cert-drishti.svg',
    'cert-python': '/portfolio/cert-python.svg',
    'cert-sql': '/portfolio/cert-sql.svg',
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-modal-title"
        className="relative bg-white dark:bg-[#0B1528] rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 my-auto flex flex-col max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200"
      >
        {/* Modal Top Bar */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex-1 pr-2">
            <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
              <span className="font-semibold text-violet-800 dark:text-violet-300 bg-violet-100/90 dark:bg-violet-950/70 px-2.5 py-0.5 rounded-full border border-violet-200 dark:border-violet-800/80 flex items-center gap-1">
                <Award className="w-3 h-3 text-violet-700 dark:text-violet-400" />
                <span>{certification.issuer}</span>
              </span>
              <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>{certification.date}</span>
              </span>
            </div>
            <h3 id="cert-modal-title" className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
              {certification.title}
            </h3>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
            aria-label="Close certificate modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Banner Container (Supports High-Res Images & SVG Placeholders) */}
        <div className="my-5 rounded-2xl overflow-hidden bg-[#0B1120] dark:bg-[#060B14] border border-slate-800 dark:border-slate-700/80 relative group shadow-inner">
          <div className="relative w-full min-h-[220px] max-h-[52vh] flex items-center justify-center p-2 sm:p-4">
            <img
              src={certification.image}
              alt={`${certification.title} Certificate Banner`}
              className="w-full h-auto max-h-[48vh] object-contain rounded-xl"
              onError={(e) => {
                if (fallbackMap[certification.id]) {
                  (e.currentTarget as HTMLImageElement).src = fallbackMap[certification.id];
                }
              }}
            />
          </div>

          <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-[#0B1120]/80 text-[10px] text-cyan-300 font-medium flex items-center gap-1 pointer-events-none backdrop-blur-xs">
            <ZoomIn className="w-3 h-3 text-cyan-400" />
            <span>Certificate Preview</span>
          </div>
        </div>

        {/* Skills Tagged */}
        {certification.skillsAcquired && certification.skillsAcquired.length > 0 && (
          <div className="mb-5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Verified Skills &amp; Competencies:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {certification.skillsAcquired.map((skill) => (
                <span
                  key={skill}
                  className="text-xs font-medium px-2.5 py-1 rounded-lg bg-violet-50 dark:bg-violet-950/60 text-violet-800 dark:text-violet-300 border border-violet-200/80 dark:border-violet-800/60"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions Bottom Bar */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <a
            href={certification.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 shadow-sm shadow-cyan-500/25 hover:shadow-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verify on Issuer Platform</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
