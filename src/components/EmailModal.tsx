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
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="email-modal-title"
        className="bg-white dark:bg-[#0B1528] rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 relative my-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-100/90 dark:bg-violet-950/70 text-violet-800 dark:text-violet-300 mb-2.5 border border-violet-200 dark:border-violet-800/80">
            <Sparkles className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
            <span>Direct Email</span>
          </div>
          <h3 id="email-modal-title" className="text-xl font-bold text-slate-900 dark:text-white">
            Contact via Email
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-xs mt-1">
            Choose your preferred email provider or copy the address directly:
          </p>
        </div>

        {/* Email Address Pill with 1-Click Copy */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-xl bg-cyan-100/80 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Recipient</div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 select-all truncate">{email}</div>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
              copied
                ? 'bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-700 hover:bg-cyan-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Provider Launch Options */}
        <div className="space-y-2.5 mb-5">
          {/* Gmail */}
          <a
            href={gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-red-50/50 dark:hover:bg-red-950/40 border border-slate-200 dark:border-slate-700 hover:border-red-300 dark:hover:border-red-700 text-slate-800 dark:text-slate-200 hover:text-red-700 dark:hover:text-red-300 transition-all flex items-center justify-between group shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400 flex items-center justify-center text-xs font-bold">
                M
              </div>
              <div className="text-left">
                <div className="text-xs font-bold">Open in Gmail</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Opens compose window directly in your browser</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-400 group-hover:translate-x-0.5 transition-all" />
          </a>

          {/* Outlook / Hotmail */}
          <a
            href={outlookUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 text-slate-800 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-300 transition-all flex items-center justify-between group shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                O
              </div>
              <div className="text-left">
                <div className="text-xs font-bold">Open in Outlook Web</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">For Microsoft 365, Hotmail, or Outlook</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
          </a>

          {/* Yahoo Mail */}
          <a
            href={yahooUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-purple-50/50 dark:hover:bg-purple-950/40 border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700 text-slate-800 dark:text-slate-200 hover:text-purple-700 dark:hover:text-purple-300 transition-all flex items-center justify-between group shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs font-bold">
                Y
              </div>
              <div className="text-left">
                <div className="text-xs font-bold">Open in Yahoo Mail</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Opens compose tab in Yahoo webmail</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all" />
          </a>

          {/* System Default Mail App (mailto) */}
          <a
            href={mailtoUrl}
            onClick={onClose}
            className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-all flex items-center justify-between group shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold">Default System Mail App</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Apple Mail, Windows Mail, Thunderbird</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 group-hover:translate-x-0.5 transition-all" />
          </a>
        </div>

        {/* Notice about why mailto might not open */}
        <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-800/80 text-amber-900 dark:text-amber-200 text-[11px] mb-4">
          <AlertCircle className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
          <span>
            If desktop mail apps don&apos;t launch automatically on your computer, use <strong>Open in Gmail</strong> or copy the email address directly.
          </span>
        </div>

        {/* Alternative: In-App Contact Form */}
        {onOpenContactForm && (
          <button
            onClick={() => {
              onClose();
              onOpenContactForm();
            }}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Message via In-App Form</span>
          </button>
        )}
      </div>
    </div>
  );
};

