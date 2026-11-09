import React from 'react';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';
import { ServiceItem, servicesData } from '../data/services';
import { LanguageMode, getWhatsAppUrl } from '../data/site';
import { WhatsAppLogo } from './BrandLogo';

interface ServiceDetailPageProps {
  service: ServiceItem;
  lang: LanguageMode;
  onNavigate: (path: string) => void;
  onBookService: (serviceTitle: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  lang,
  onNavigate,
  onBookService,
}) => {
  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 space-y-14">
        {/* Back Breadcrumb */}
        <div>
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E3B3A] dark:text-[#F2A900] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all 10 AI solutions</span>
          </button>
        </div>

        {/* Service Hero Header */}
        <div className="space-y-4 border-b border-[#CFDAD6] dark:border-[#1F3835] pb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono-tabular">
            <span className="text-[#0E3B3A] dark:text-[#F2A900] font-bold">
              SERVICE {service.index} OF 10
            </span>
            <span className="text-[#CFDAD6] dark:text-[#1F3835]">·</span>
            <span className="text-[#12211F]/70 dark:text-[#F1F5F3]/70">
              HEXAHIVE AGENT ARCHITECTURE
            </span>
            {service.demandTag && (
              <>
                <span className="text-[#CFDAD6] dark:text-[#1F3835]">·</span>
                <span className="inline-flex items-center gap-1 font-semibold text-[#0E3B3A] dark:text-[#F2A900]">
                  <Sparkles className="w-3.5 h-3.5 text-[#F2A900]" />
                  {service.demandTag[lang]}
                </span>
              </>
            )}
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#12211F] dark:text-[#F1F5F3]">
            {service.title}
          </h1>

          <p className="text-lg sm:text-xl text-[#12211F]/80 dark:text-[#F1F5F3]/80 max-w-2xl leading-relaxed">
            {service.oneLiner[lang]}
          </p>

          {/* Metrics & Deliverables Row */}
          <div className="pt-4 flex flex-wrap items-center gap-4 text-sm font-mono-tabular">
            <span className="font-semibold text-[#0E3B3A] dark:text-[#F2A900]">
              {service.metricHighlight}
            </span>
          </div>
        </div>

        {/* Problem Statement & How It Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* The Problem */}
          <div className="md:col-span-5 bg-[#FFFFFF] dark:bg-[#122220] border border-[#CFDAD6] dark:border-[#1F3835] rounded-2xl p-6 space-y-4">
            <h2 className="font-display text-xl font-bold text-[#12211F] dark:text-[#F1F5F3]">
              The Problem It Solves
            </h2>
            <p className="text-sm font-semibold text-[#0E3B3A] dark:text-[#F2A900] leading-snug">
              {service.problem.headline}
            </p>
            <p className="text-sm sm:text-base text-[#12211F]/80 dark:text-[#F1F5F3]/80 leading-relaxed">
              {service.problem.description[lang]}
            </p>
            <ul className="space-y-2 pt-2 border-t border-[#CFDAD6]/60 dark:border-[#1F3835] text-xs sm:text-sm text-[#12211F]/80 dark:text-[#F1F5F3]/80">
              {service.problem.painPoints[lang].map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#F2A900] font-bold">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* How the Agent Works */}
          <div className="md:col-span-7 bg-[#FFFFFF] dark:bg-[#122220] border border-[#CFDAD6] dark:border-[#1F3835] rounded-2xl p-6 space-y-4">
            <h2 className="font-display text-xl font-bold text-[#12211F] dark:text-[#F1F5F3]">
              How Our Agent Works
            </h2>
            <ol className="space-y-4">
              {service.howItWorks.map((step) => (
                <li key={step.step} className="flex items-start gap-3.5">
                  <span className="w-7 h-7 rounded-md bg-[#0E3B3A] text-[#F2A900] font-mono-tabular text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {step.step}
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-base text-[#12211F] dark:text-[#F1F5F3]">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#12211F]/85 dark:text-[#F1F5F3]/85 leading-relaxed">
                      {step.detail[lang]}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Deliverables */}
            <div className="pt-4 mt-4 border-t border-[#CFDAD6]/60 dark:border-[#1F3835] space-y-2">
              <p className="text-xs font-mono-tabular font-semibold uppercase tracking-wider text-[#0E3B3A] dark:text-[#F2A900]">
                What Is Included
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.deliverables.map((deliv) => (
                  <div key={deliv} className="flex items-start gap-2 text-xs text-[#12211F]/80 dark:text-[#F1F5F3]/80">
                    <Check className="w-3.5 h-3.5 text-[#0E3B3A] dark:text-[#F2A900] shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Example Conversation Transcript */}
        <div className="bg-[#0E3B3A] dark:bg-[#122220] border border-[#1B5A57] rounded-2xl p-6 sm:p-8 space-y-6 text-[#F1F5F3]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1B5A57] pb-4">
            <div>
              <p className="text-xs font-mono-tabular text-[#F2A900]">
                EXAMPLE LIVE TRANSCRIPT (ROMAN URDU + ENGLISH)
              </p>
              <h2 className="font-display text-2xl font-bold mt-1">
                See how {service.shortTitle} talks to your customers
              </h2>
              <p className="text-xs text-[#F1F5F3]/75 mt-1">
                {service.conversationContext[lang]}
              </p>
            </div>
            <span className="text-xs font-mono-tabular text-[#F1F5F3]/70">
              Latency: ~0.9s
            </span>
          </div>

          <div className="space-y-4">
            {service.exampleConversation.map((turn, idx) => {
              const isAgent = turn.speaker === 'agent';
              return (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    isAgent ? 'items-start' : 'items-end'
                  }`}
                >
                  <span className="text-[11px] font-mono-tabular text-[#F1F5F3]/60 mb-1 px-1">
                    {turn.senderLabel} · {turn.time}
                  </span>
                  <div
                    className={`max-w-xl rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                      isAgent
                        ? 'bg-[#12211F] text-[#F1F5F3] border border-[#F2A900]/40'
                        : 'bg-[#F2A900] text-[#12211F] font-medium'
                    }`}
                  >
                    {turn.text}
                  </div>
                  {turn.note && (
                    <span className="mt-1 text-[11px] font-mono-tabular text-[#F2A900] px-1">
                      ✓ {turn.note}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-[#FFFFFF] dark:bg-[#122220] border-2 border-[#F2A900] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h2 className="font-display text-2xl font-bold text-[#12211F] dark:text-[#F1F5F3]">
              Ready to test a custom {service.title}?
            </h2>
            <p className="text-sm text-[#12211F]/80 dark:text-[#F1F5F3]/80 flex items-center gap-2">
              <Check className="w-4 h-4 text-[#15803D] shrink-0" />
              <span>
                First working prototype demo is free before you pay any setup fee.
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onBookService(service.title)}
              className="px-5 py-3 rounded-xl font-semibold text-sm bg-[#F2A900] text-[#12211F] hover:bg-[#d99700] transition-colors cursor-pointer"
            >
              Book a free demo
            </button>
            <a
              href={getWhatsAppUrl(
                `Assalam-o-Alaikum! I want a free demo of ${service.title} for my business.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-[#25D366] text-[#FFFFFF] hover:opacity-95 transition-opacity"
            >
              <WhatsAppLogo className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

        {/* Switch to another service */}
        <div className="pt-4 border-t border-[#CFDAD6] dark:border-[#1F3835]">
          <p className="text-xs font-mono-tabular uppercase tracking-wider text-[#12211F]/60 dark:text-[#F1F5F3]/60 mb-4">
            Explore all 10 HexaHive AI solutions
          </p>
          <div className="flex flex-wrap gap-2.5">
            {servicesData
              .filter((s) => s.slug !== service.slug)
              .map((other) => (
                <button
                  key={other.slug}
                  type="button"
                  onClick={() => onNavigate(`/services/${other.slug}`)}
                  className="px-3.5 py-2 rounded-lg text-xs font-semibold border border-[#CFDAD6] dark:border-[#1F3835] bg-[#FFFFFF] dark:bg-[#122220] text-[#12211F] dark:text-[#F1F5F3] hover:border-[#F2A900] transition-colors cursor-pointer"
                >
                  <span className="font-mono-tabular text-[#F2A900] mr-1">
                    {other.index}.
                  </span>
                  {other.title} →
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
