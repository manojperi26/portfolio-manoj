import React, { useState, useId } from 'react';
import { Mail, Phone, Linkedin, Github, X, Send, Copy, Check, ExternalLink, AlertCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [activeField, setActiveField] = useState<'name' | 'email' | 'message' | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const modalRef = useFocusTrap<HTMLDivElement>(isOpen, onClose);

  if (!isOpen) return null;

  // Validation logic
  const isNameValid = formData.name.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
  const isMessageValid = formData.message.trim().length >= 10;
  const isFormValid = isNameValid && isEmailValid && isMessageValid;

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setTouched({ name: true, email: true, message: true });
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
      setTouched({ name: false, email: false, message: false });
      onClose();
    }, 2500);
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
        aria-labelledby="contact-modal-title"
        className="bg-white dark:bg-[#0B0F17] max-w-lg w-full p-6 sm:p-7 border border-[#E2E8F0] dark:border-[#1E293B] relative my-auto shadow-2xl transition-all duration-150"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#E05638] text-slate-500 hover:text-[#E05638] transition-colors duration-150 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-2 py-0.5 font-mono text-[11px] bg-slate-50 dark:bg-[#070D18] border border-[#E2E8F0] dark:border-[#1E293B] text-slate-700 dark:text-slate-300 mb-2">
            <span className="w-1.5 h-1.5 bg-[#E05638]" />
            <span className="font-bold text-[#0F172A] dark:text-[#F1F5F9]">[DISPATCH // INQUIRY]</span>
            <span className="text-slate-400">COMMUNICATION CHANNEL</span>
          </div>
          <h3 id="contact-modal-title" className="text-2xl font-serif font-bold text-[#0F172A] dark:text-[#F1F5F9] tracking-tight">
            Transmit Inquiry
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 font-sans">
            Direct channel for AI/ML engineering collaborations, industry recruitment, and technical inquiries.
          </p>
        </div>

        {/* Direct Reach Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5 font-mono">
          {/* Email Box */}
          <div className="relative p-3 bg-slate-50 dark:bg-[#070D18] border border-[#E2E8F0] dark:border-[#1E293B] flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 h-7 bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] text-[#E05638] flex items-center justify-center shrink-0">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">
                <div className="text-[9px] uppercase font-bold text-slate-400">EMAIL</div>
                <div className="text-[11px] font-bold text-[#0F172A] dark:text-[#F1F5F9] truncate">{PERSONAL_INFO.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0 relative">
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${PERSONAL_INFO.email}&su=Inquiry%20from%20Portfolio`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-slate-400 hover:text-[#E05638] transition-colors duration-150"
                title="Open in Gmail Webmail"
                aria-label="Open in Gmail Webmail"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                className="relative p-1 text-slate-400 hover:text-[#E05638] transition-colors duration-150 cursor-pointer"
                title="Copy Email Address"
                aria-label="Copy Email Address"
              >
                {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-[#E05638]" /> : <Copy className="w-3.5 h-3.5" />}
                {/* Floating Micro-Tooltip */}
                {copiedField === 'email' && (
                  <div className="absolute -top-8 right-0 px-2 py-0.5 bg-[#0F172A] dark:bg-[#F1F5F9] text-white dark:text-[#0F172A] text-[9px] font-mono font-bold shadow-lg border border-[#E05638] z-30 whitespace-nowrap animate-in fade-in duration-150 pointer-events-none">
                    [COPIED TO CLIPBOARD]
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Phone Box */}
          <div className="relative p-3 bg-slate-50 dark:bg-[#070D18] border border-[#E2E8F0] dark:border-[#1E293B] flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 h-7 bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] text-[#E05638] flex items-center justify-center shrink-0">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">
                <div className="text-[9px] uppercase font-bold text-slate-400">PHONE</div>
                <div className="text-[11px] font-bold text-[#0F172A] dark:text-[#F1F5F9] truncate">{PERSONAL_INFO.phone}</div>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                className="p-1 text-slate-400 hover:text-[#E05638] transition-colors duration-150 cursor-pointer"
                title="Copy Phone"
                aria-label="Copy Phone Number"
              >
                {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-[#E05638]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              {/* Floating Micro-Tooltip */}
              {copiedField === 'phone' && (
                <div className="absolute -top-8 right-0 px-2 py-0.5 bg-[#0F172A] dark:bg-[#F1F5F9] text-white dark:text-[#0F172A] text-[9px] font-mono font-bold shadow-lg border border-[#E05638] z-30 whitespace-nowrap animate-in fade-in duration-150 pointer-events-none">
                  [COPIED TO CLIPBOARD]
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Social Buttons */}
        <div className="flex items-center gap-2 mb-5 font-mono text-xs">
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-3 bg-white dark:bg-[#0B0F17] hover:bg-[#0F172A] hover:text-[#F1F5F9] dark:hover:bg-[#F1F5F9] dark:hover:text-[#0F172A] text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center gap-1.5 border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#0F172A] dark:hover:border-[#F1F5F9] transition-all duration-150 ease-out"
          >
            <Linkedin className="w-3.5 h-3.5 text-[#E05638]" />
            <span>[LINKEDIN]</span>
          </a>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-3 bg-white dark:bg-[#0B0F17] hover:bg-[#0F172A] hover:text-[#F1F5F9] dark:hover:bg-[#F1F5F9] dark:hover:text-[#0F172A] text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center gap-1.5 border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#0F172A] dark:hover:border-[#F1F5F9] transition-all duration-150 ease-out"
          >
            <Github className="w-3.5 h-3.5 text-[#E05638]" />
            <span>[GITHUB]</span>
          </a>
        </div>

        {/* Message Form with Active Focus Brackets & Inline Validation */}
        {submitted ? (
          <div className="p-5 bg-slate-50 dark:bg-[#070D18] border border-[#E05638] text-center font-mono">
            <div className="w-10 h-10 border border-[#E05638] text-[#E05638] flex items-center justify-center mx-auto mb-2">
              <Check className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-[#0F172A] dark:text-[#F1F5F9] mb-1">[TRANSMISSION CONFIRMED]</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">
              Thank you. Response will dispatch promptly to {formData.email || 'your registered address'}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 font-mono text-xs">
            {/* Field 1: Name */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="contact-form-name"
                  className={`block font-bold transition-colors duration-150 ${
                    activeField === 'name' ? 'text-[#E05638]' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {activeField === 'name' ? (
                    <span className="inline-flex items-center gap-1">
                      <span className="text-[#E05638]">&gt;</span> [01] SENDER IDENTIFIER
                      <span className="text-[10px] text-[#E05638] font-normal">[ACTIVE_]</span>
                    </span>
                  ) : (
                    '[01] SENDER IDENTIFIER'
                  )}
                </label>

                {/* Inline Validation Status */}
                {touched.name && (
                  <div>
                    {isNameValid ? (
                      <span className="text-emerald-600 dark:text-emerald-400 text-[10px] inline-flex items-center gap-0.5 font-bold">
                        <Check className="w-3 h-3" /> [VALID]
                      </span>
                    ) : (
                      <span className="text-[#E05638] text-[10px] inline-flex items-center gap-0.5">
                        <AlertCircle className="w-3 h-3" /> [REQUIRED]
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="relative">
                <input
                  id="contact-form-name"
                  type="text"
                  required
                  value={formData.name}
                  onFocus={() => setActiveField('name')}
                  onBlur={() => {
                    setActiveField(null);
                    setTouched((t) => ({ ...t, name: true }));
                  }}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (!touched.name) setTouched((t) => ({ ...t, name: true }));
                  }}
                  placeholder="e.g. Dr. Alex Smith / Engineering Lead"
                  className={`w-full px-3 py-2 pr-8 border bg-white dark:bg-[#070D18] text-[#0F172A] dark:text-[#F1F5F9] placeholder-slate-400 text-xs transition-all duration-150 ease-out focus:outline-none ${
                    activeField === 'name'
                      ? 'border-[#E05638] ring-1 ring-[#E05638]/40'
                      : touched.name && !isNameValid
                      ? 'border-[#E05638]/60'
                      : 'border-[#E2E8F0] dark:border-[#1E293B]'
                  }`}
                />
                {touched.name && isNameValid && (
                  <Check className="w-3.5 h-3.5 text-emerald-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                )}
              </div>
            </div>

            {/* Field 2: Email */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="contact-form-email"
                  className={`block font-bold transition-colors duration-150 ${
                    activeField === 'email' ? 'text-[#E05638]' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {activeField === 'email' ? (
                    <span className="inline-flex items-center gap-1">
                      <span className="text-[#E05638]">&gt;</span> [02] RETURN DISPATCH ADDRESS
                      <span className="text-[10px] text-[#E05638] font-normal">[ACTIVE_]</span>
                    </span>
                  ) : (
                    '[02] RETURN DISPATCH ADDRESS'
                  )}
                </label>

                {/* Inline Validation Status */}
                {touched.email && (
                  <div>
                    {isEmailValid ? (
                      <span className="text-emerald-600 dark:text-emerald-400 text-[10px] inline-flex items-center gap-0.5 font-bold">
                        <Check className="w-3 h-3" /> [VALID]
                      </span>
                    ) : (
                      <span className="text-[#E05638] text-[10px] inline-flex items-center gap-0.5">
                        <AlertCircle className="w-3 h-3" /> [INVALID EMAIL]
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="relative">
                <input
                  id="contact-form-email"
                  type="email"
                  required
                  value={formData.email}
                  onFocus={() => setActiveField('email')}
                  onBlur={() => {
                    setActiveField(null);
                    setTouched((t) => ({ ...t, email: true }));
                  }}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (!touched.email) setTouched((t) => ({ ...t, email: true }));
                  }}
                  placeholder="alex@research-lab.org"
                  className={`w-full px-3 py-2 pr-8 border bg-white dark:bg-[#070D18] text-[#0F172A] dark:text-[#F1F5F9] placeholder-slate-400 text-xs transition-all duration-150 ease-out focus:outline-none ${
                    activeField === 'email'
                      ? 'border-[#E05638] ring-1 ring-[#E05638]/40'
                      : touched.email && !isEmailValid
                      ? 'border-[#E05638]/60'
                      : 'border-[#E2E8F0] dark:border-[#1E293B]'
                  }`}
                />
                {touched.email && isEmailValid && (
                  <Check className="w-3.5 h-3.5 text-emerald-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                )}
              </div>
            </div>

            {/* Field 3: Message */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="contact-form-message"
                  className={`block font-bold transition-colors duration-150 ${
                    activeField === 'message' ? 'text-[#E05638]' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {activeField === 'message' ? (
                    <span className="inline-flex items-center gap-1">
                      <span className="text-[#E05638]">&gt;</span> [03] INQUIRY SPECIFICATION
                      <span className="text-[10px] text-[#E05638] font-normal">[ACTIVE_]</span>
                    </span>
                  ) : (
                    '[03] INQUIRY SPECIFICATION'
                  )}
                </label>

                {/* Inline Validation Status */}
                {touched.message && (
                  <div>
                    {isMessageValid ? (
                      <span className="text-emerald-600 dark:text-emerald-400 text-[10px] inline-flex items-center gap-0.5 font-bold">
                        <Check className="w-3 h-3" /> [VALID]
                      </span>
                    ) : (
                      <span className="text-[#E05638] text-[10px] inline-flex items-center gap-0.5">
                        <AlertCircle className="w-3 h-3" /> [MIN 10 CHARS]
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="relative">
                <textarea
                  id="contact-form-message"
                  required
                  rows={3}
                  value={formData.message}
                  onFocus={() => setActiveField('message')}
                  onBlur={() => {
                    setActiveField(null);
                    setTouched((t) => ({ ...t, message: true }));
                  }}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (!touched.message) setTouched((t) => ({ ...t, message: true }));
                  }}
                  placeholder="Specify collaboration scope, technical challenge, or opportunity..."
                  className={`w-full px-3 py-2 border bg-white dark:bg-[#070D18] text-[#0F172A] dark:text-[#F1F5F9] placeholder-slate-400 text-xs resize-none transition-all duration-150 ease-out focus:outline-none ${
                    activeField === 'message'
                      ? 'border-[#E05638] ring-1 ring-[#E05638]/40'
                      : touched.message && !isMessageValid
                      ? 'border-[#E05638]/60'
                      : 'border-[#E2E8F0] dark:border-[#1E293B]'
                  }`}
                />
                {touched.message && isMessageValid && (
                  <Check className="w-3.5 h-3.5 text-emerald-500 absolute right-2.5 bottom-3 pointer-events-none" />
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={touched.name && touched.email && !isFormValid}
              className="group/submit w-full py-2.5 bg-[#0F172A] text-[#F1F5F9] dark:bg-[#F1F5F9] dark:text-[#0F172A] hover:bg-[#E05638] dark:hover:bg-[#E05638] dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed font-bold transition-all duration-150 ease-out flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638]"
            >
              <Send className="w-3.5 h-3.5 transition-transform duration-150 ease-out motion-safe:group-hover/submit:translate-x-0.5" />
              <span>[TRANSMIT MESSAGE]</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

