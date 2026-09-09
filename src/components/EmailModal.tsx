import React, { useState } from 'react';
import { Mail, ExternalLink, Copy, Check, X, Send, Sparkles, AlertCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContactForm?: () => void;
}

export const EmailModal: React.FC<EmailModalProps> = ({
  isOpen,
  onClose,
  onOpenContactForm,
}) => {
  const [copied, setCopied] = useState(false);
  const modalRef = useFocusTrap<HTMLDivElement>(isOpen, onClose);

  if (!isOpen) return null;

  const email = PERSONAL_INFO.email;
  const subject = encodeURIComponent('Inquiry from Portfolio - Peri Naga Venkata Sai Manoj');
  const body = encodeURIComponent('Hi Manoj,\n\nI came across your portfolio and would like to connect regarding:\n\n');

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
  const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${email}&subject=${subject}&body=${body}`;
  const yahooUrl = `https://compose.mail.yahoo.com/?to=${email}&subj=${subject}&body=${body}`;
  const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="email-modal-title"
        className="bg-white dark:bg-[#0B0F17] max-w-md w-full p-6 sm:p-7 border border-[#E2E8F0] dark:border-[#1E293B] relative my-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#E05638] text-slate-500 hover:text-[#E05638] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-5">
          <div className="inline-flex items-center gap-2 px-2 py-0.5 font-mono text-[11px] bg-slate-50 dark:bg-[#070D18] border border-[#E2E8F0] dark:border-[#1E293B] text-slate-700 dark:text-slate-300 mb-2">
            <span className="w-1.5 h-1.5 bg-[#E05638]" />
            <span className="font-bold text-[#0F172A] dark:text-[#F1F5F9]">[DISPATCH // DIRECT]</span>
            <span className="text-slate-400">ELECTRONIC MAIL</span>
          </div>
          <h3 id="email-modal-title" className="text-xl font-serif font-bold text-[#0F172A] dark:text-[#F1F5F9] tracking-tight">
            Direct Mail Routing
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs mt-1 font-sans">
            Select an enterprise mail client below or copy recipient coordinates to clipboard:
          </p>
        </div>

        {/* Email Address Pill with 1-Click Copy */}
        <div className="p-3 bg-slate-50 dark:bg-[#070D18] border border-[#E2E8F0] dark:border-[#1E293B] flex items-center justify-between gap-3 mb-5 font-mono">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-7 h-7 bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] text-[#E05638] flex items-center justify-center shrink-0">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <div className="truncate">
              <div className="text-[9px] uppercase font-bold text-slate-400">RECIPIENT</div>
              <div className="text-xs font-bold text-[#0F172A] dark:text-[#F1F5F9] select-all truncate">{email}</div>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={handleCopy}
              className={`px-3 py-1.5 text-xs font-bold font-mono border flex items-center gap-1.5 transition-all duration-150 ease-out cursor-pointer shrink-0 ${
                copied
                  ? 'bg-[#E05638] text-white border-[#E05638]'
                  : 'bg-white dark:bg-[#0B0F17] hover:bg-[#0F172A] hover:text-[#F1F5F9] dark:hover:bg-[#F1F5F9] dark:hover:text-[#0F172A] text-slate-700 dark:text-slate-300 border-[#E2E8F0] dark:border-[#1E293B]'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>[COPIED]</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#E05638]" />
                  <span>[COPY]</span>
                </>
              )}
            </button>
            {/* Floating Micro-Tooltip */}
            {copied && (
              <div className="absolute -top-8 right-0 px-2 py-0.5 bg-[#0F172A] dark:bg-[#F1F5F9] text-white dark:text-[#0F172A] text-[9px] font-mono font-bold shadow-lg border border-[#E05638] z-30 whitespace-nowrap animate-in fade-in duration-150 pointer-events-none">
                [COPIED TO CLIPBOARD]
              </div>
            )}
          </div>
        </div>

        {/* Provider Launch Options */}
        <div className="space-y-2 mb-5 font-mono text-xs">
          {/* Gmail */}
          <a
            href={gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full p-2.5 bg-white dark:bg-[#070D18] hover:border-[#E05638] border border-[#E2E8F0] dark:border-[#1E293B] text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 border border-[#E2E8F0] dark:border-[#1E293B] text-[#E05638] flex items-center justify-center text-[10px] font-bold">
                G
              </div>
              <div className="text-left font-sans">
                <div className="text-xs font-bold font-mono text-[#0F172A] dark:text-[#F1F5F9]">Google Workspace / Gmail</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Launch compose window directly in browser</div>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#E05638] transition-colors" />
          </a>

          {/* Outlook / Hotmail */}
          <a
            href={outlookUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full p-2.5 bg-white dark:bg-[#070D18] hover:border-[#E05638] border border-[#E2E8F0] dark:border-[#1E293B] text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 border border-[#E2E8F0] dark:border-[#1E293B] text-[#E05638] flex items-center justify-center text-[10px] font-bold">
                O
              </div>
              <div className="text-left font-sans">
                <div className="text-xs font-bold font-mono text-[#0F172A] dark:text-[#F1F5F9]">Microsoft Outlook Web</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Microsoft 365, Hotmail, or Outlook</div>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#E05638] transition-colors" />
          </a>

          {/* Yahoo Mail */}
          <a
            href={yahooUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full p-2.5 bg-white dark:bg-[#070D18] hover:border-[#E05638] border border-[#E2E8F0] dark:border-[#1E293B] text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 border border-[#E2E8F0] dark:border-[#1E293B] text-[#E05638] flex items-center justify-center text-[10px] font-bold">
                Y
              </div>
              <div className="text-left font-sans">
                <div className="text-xs font-bold font-mono text-[#0F172A] dark:text-[#F1F5F9]">Yahoo Mail</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Opens compose tab in Yahoo webmail</div>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#E05638] transition-colors" />
          </a>

          {/* System Default Mail App (mailto) */}
          <a
            href={mailtoUrl}
            onClick={onClose}
            className="w-full p-2.5 bg-white dark:bg-[#070D18] hover:border-[#E05638] border border-[#E2E8F0] dark:border-[#1E293B] text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 border border-[#E2E8F0] dark:border-[#1E293B] text-[#E05638] flex items-center justify-center">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <div className="text-left font-sans">
                <div className="text-xs font-bold font-mono text-[#0F172A] dark:text-[#F1F5F9]">System Protocol Client</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Apple Mail, Windows Mail, Thunderbird</div>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#E05638] transition-colors" />
          </a>
        </div>

        {/* Alternative: In-App Contact Form */}
        {onOpenContactForm && (
          <button
            onClick={() => {
              onClose();
              onOpenContactForm();
            }}
            className="w-full py-2.5 bg-[#0F172A] text-[#F1F5F9] dark:bg-[#F1F5F9] dark:text-[#0F172A] hover:bg-[#E05638] dark:hover:bg-[#E05638] dark:hover:text-white font-mono font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638]"
          >
            <Send className="w-3.5 h-3.5" />
            <span>[SWITCH TO DISPATCH FORM]</span>
          </button>
        )}
      </div>
    </div>
  );
};

