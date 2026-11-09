import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { servicesData } from '../data/services';
import { siteConfig, LanguageMode, getWhatsAppUrl } from '../data/site';
import { WhatsAppLogo } from './BrandLogo';

interface ContactSectionProps {
  lang: LanguageMode;
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  lang,
  preselectedService,
}) => {
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(
    preselectedService || servicesData[0].title
  );
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  React.useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setFeedbackMsg('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          business,
          phone,
          service,
          message,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Submission failed');
      }
      setStatus('success');
      setFeedbackMsg(data.message);
      setName('');
      setBusiness('');
      setPhone('');
      setMessage('');
    } catch (err: any) {
      setStatus('error');
      setFeedbackMsg(
        err?.message || 'Could not submit right now. Please message us on WhatsApp directly.'
      );
    }
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 border-t border-[#CFDAD6] dark:border-[#1F3835]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Karachi Contact + Context */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-mono-tabular font-semibold text-[#0E3B3A] dark:text-[#F2A900]">
                06 · FREE 72-HOUR DEMO
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#12211F] dark:text-[#F1F5F3]">
                Book a free working demo for your business.
              </h2>
              <p className="text-base text-[#12211F]/80 dark:text-[#F1F5F3]/80 leading-relaxed">
                {lang === 'ru'
                  ? 'Form fill karein ya seedha WhatsApp par voice note bhejein. Hum 72 ghanton mein aap ke business ke naam aur prices ke sath live AI demo tayyar kar ke dikhayenge.'
                  : 'Fill out the short form or send us a voice note on WhatsApp. Within 72 hours, we build a working AI agent prototype trained on your business pricing and FAQs.'}
              </p>
            </div>

            {/* Direct WhatsApp & Email Cards */}
            <div className="space-y-3 pt-2">
              <a
                href={getWhatsAppUrl(
                  `Assalam-o-Alaikum HexaHive Tech! I want to book a free AI agent demo.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-[#0E3B3A] text-[#F1F5F3] hover:bg-[#12211F] transition-colors group"
                aria-label="Chat with HexaHive Tech on WhatsApp"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#25D366] text-[#FFFFFF] flex items-center justify-center shrink-0 shadow-sm">
                    <WhatsAppLogo className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-mono-tabular text-[#F2A900]">
                      FASTEST RESPONSE (UNDER 15 MINS)
                    </p>
                    <p className="font-display font-bold text-base">
                      Chat on WhatsApp
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-[#F2A900] group-hover:translate-x-0.5 transition-transform">
                  Open →
                </span>
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center justify-between p-4 rounded-xl bg-[#FFFFFF] dark:bg-[#122220] border border-[#CFDAD6] dark:border-[#1F3835] hover:border-[#F2A900] transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#F1F5F3] dark:bg-[#0B1514] text-[#0E3B3A] dark:text-[#F2A900] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono-tabular text-[#12211F]/60 dark:text-[#F1F5F3]/60">
                      DIRECT EMAIL
                    </p>
                    <p className="font-display font-bold text-base text-[#12211F] dark:text-[#F1F5F3]">
                      {siteConfig.email}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#0E3B3A] dark:text-[#F2A900]">
                  Email us →
                </span>
              </a>
            </div>

            <div className="p-4 rounded-xl bg-[#FFFFFF]/60 dark:bg-[#122220]/60 border border-[#CFDAD6] dark:border-[#1F3835] text-xs text-[#12211F]/75 dark:text-[#F1F5F3]/75 space-y-1">
              <p className="font-semibold text-[#12211F] dark:text-[#F1F5F3]">
                Why Pakistani businesses trust HexaHive Tech:
              </p>
              <p>
                • First prototype demo is 100% free before any setup invoice.
              </p>
              <p>
                • Native Urdu, Roman Urdu, and Pakistani English fluency.
              </p>
              <p>
                • Direct WhatsApp group with the engineers building your agent.
              </p>
            </div>
          </div>

          {/* Right Column: Lead Form wired to /api/contact (Resend + Google Sheets) */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-[#FFFFFF] dark:bg-[#122220] border border-[#CFDAD6] dark:border-[#1F3835] rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="lead-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#12211F]/80 dark:text-[#F1F5F3]/80 mb-2"
                  >
                    Your Name *
                  </label>
                  <input
                    id="lead-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Bilal Ahmed"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F1F5F3] dark:bg-[#0B1514] border border-[#CFDAD6] dark:border-[#1F3835] text-sm text-[#12211F] dark:text-[#F1F5F3] placeholder:text-[#12211F]/40 dark:placeholder:text-[#F1F5F3]/40"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lead-business"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#12211F]/80 dark:text-[#F1F5F3]/80 mb-2"
                  >
                    Business Name *
                  </label>
                  <input
                    id="lead-business"
                    type="text"
                    required
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                    placeholder="e.g. Clifton Dental Studio"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F1F5F3] dark:bg-[#0B1514] border border-[#CFDAD6] dark:border-[#1F3835] text-sm text-[#12211F] dark:text-[#F1F5F3] placeholder:text-[#12211F]/40 dark:placeholder:text-[#F1F5F3]/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="lead-phone"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#12211F]/80 dark:text-[#F1F5F3]/80 mb-2"
                  >
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    id="lead-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your WhatsApp number"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F1F5F3] dark:bg-[#0B1514] border border-[#CFDAD6] dark:border-[#1F3835] text-sm text-[#12211F] dark:text-[#F1F5F3] placeholder:text-[#12211F]/40 dark:placeholder:text-[#F1F5F3]/40"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lead-service"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#12211F]/80 dark:text-[#F1F5F3]/80 mb-2"
                  >
                    Which AI Agent do you need? *
                  </label>
                  <select
                    id="lead-service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F1F5F3] dark:bg-[#0B1514] border border-[#CFDAD6] dark:border-[#1F3835] text-sm text-[#12211F] dark:text-[#F1F5F3]"
                  >
                    {servicesData.map((s) => (
                      <option key={s.slug} value={s.title}>
                        {s.index}. {s.title}
                      </option>
                    ))}
                    <option value="Full Software House Custom Suite">
                      Multiple Agents / Full Custom AI Suite
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="lead-message"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#12211F]/80 dark:text-[#F1F5F3]/80 mb-2"
                >
                  What does your business do & what should the agent handle?
                </label>
                <textarea
                  id="lead-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Rozana kitni calls ya WhatsApp messages aate hain? Aap kya automate karna chahte hain?"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#F1F5F3] dark:bg-[#0B1514] border border-[#CFDAD6] dark:border-[#1F3835] text-sm text-[#12211F] dark:text-[#F1F5F3] placeholder:text-[#12211F]/40 dark:placeholder:text-[#F1F5F3]/40"
                />
              </div>

              {status === 'success' && (
                <div
                  role="status"
                  className="p-4 rounded-xl bg-[#15803D]/10 border border-[#15803D]/30 text-[#15803D] dark:text-[#4ADE80] text-sm flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{feedbackMsg}</span>
                </div>
              )}

              {status === 'error' && (
                <div
                  role="alert"
                  className="p-4 rounded-xl bg-[#B91C1C]/10 border border-[#B91C1C]/30 text-[#B91C1C] dark:text-[#F87171] text-sm flex items-start gap-2.5"
                >
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{feedbackMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-[#F2A900] text-[#12211F] hover:bg-[#d99700] disabled:opacity-60 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>
                  {status === 'submitting'
                    ? 'Sending to Karachi Team...'
                    : 'Request My Free Demo'}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
