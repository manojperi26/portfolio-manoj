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
      className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-modal-title"
        className="relative bg-white dark:bg-[#0B0F17] border border-[#E2E8F0] dark:border-[#1E293B] max-w-2xl w-full p-5 sm:p-6 my-auto flex flex-col max-h-[92vh] overflow-y-auto"
      >
        {/* Modal Top Bar */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#E2E8F0] dark:border-[#1E293B]">
          <div className="flex-1 pr-2">
            <div className="flex flex-wrap items-center gap-2 mb-1.5 font-mono text-[11px]">
              <span className="font-bold text-[#E05638] flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                <span>[{certification.issuer.toUpperCase()}]</span>
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                ISSUED: {certification.date}
              </span>
            </div>
            <h3 id="cert-modal-title" className="font-serif font-bold text-lg sm:text-xl text-[#0F172A] dark:text-[#F1F5F9] leading-snug">
              {certification.title}
            </h3>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-1.5 border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#E05638] hover:text-[#E05638] text-slate-500 transition-colors cursor-pointer"
            aria-label="Close certificate modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Banner Container */}
        <div className="my-4 border border-[#E2E8F0] dark:border-[#1E293B] bg-[#070D18] relative group">
          <div className="relative w-full min-h-[220px] max-h-[52vh] flex items-center justify-center p-2 sm:p-3">
            <img
              src={certification.image}
              alt={`${certification.title} Certificate Banner`}
              className="w-full h-auto max-h-[48vh] object-contain"
              onError={(e) => {
                if (fallbackMap[certification.id]) {
                  (e.currentTarget as HTMLImageElement).src = fallbackMap[certification.id];
                }
              }}
            />
          </div>

          <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 font-mono text-[10px] text-white flex items-center gap-1 pointer-events-none border border-white/20">
            <ZoomIn className="w-3 h-3 text-[#E05638]" />
            <span>EXHIBIT PREVIEW</span>
          </div>
        </div>

        {/* Skills Tagged */}
        {certification.skillsAcquired && certification.skillsAcquired.length > 0 && (
          <div className="mb-4">
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              VERIFIED CORE CAPABILITIES:
            </h4>
            <div className="flex flex-wrap gap-1">
              {certification.skillsAcquired.map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-[10px] px-2 py-0.5 bg-slate-50 dark:bg-[#070D18] text-slate-700 dark:text-slate-300 border border-[#E2E8F0] dark:border-[#1E293B]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions Bottom Bar */}
        <div className="pt-3 border-t border-[#E2E8F0] dark:border-[#1E293B] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <a
            href={certification.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-2 px-3.5 bg-[#0F172A] text-[#F1F5F9] dark:bg-[#F1F5F9] dark:text-[#0F172A] hover:bg-[#E05638] dark:hover:bg-[#E05638] dark:hover:text-white font-bold transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>[VERIFY ON ISSUER PLATFORM]</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={onClose}
            className="py-2 px-3.5 border border-[#E2E8F0] dark:border-[#1E293B] hover:bg-slate-100 dark:hover:bg-[#1E293B] text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
          >
            [DISMISS]
          </button>
        </div>
      </div>
    </div>
  );
};
