import React, { useState } from 'react';
import { Play, Pause, ExternalLink } from 'lucide-react';
import { ServiceItem } from '../data/services';
import { LanguageMode, getWhatsAppUrl } from '../data/site';
import { WhatsAppLogo } from './BrandLogo';
import { Tilt3DCard } from './Tilt3DCard';

interface DemoVideoCardProps {
  service: ServiceItem;
  index: number;
  lang: LanguageMode;
  onViewService: (slug: string) => void;
}

export const DemoVideoCard: React.FC<DemoVideoCardProps> = ({
  service,
  index,
  lang,
  onViewService,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const tryActionUrl = getWhatsAppUrl(
    service.demo?.whatsappPreset ||
      `Salam! I want to test the ${service.title} live demo.`
  );
  const durationLabel = service.demo?.durationLabel || '01:15';

  return (
    <Tilt3DCard
      intensity={7}
      delay={index * 0.08}
      className="group bg-[#FFFFFF] dark:bg-[#122220] border border-[#CFDAD6] dark:border-[#1F3835] rounded-2xl overflow-hidden flex flex-col justify-between transition-colors hover:border-[#F2A900] shadow-sm"
    >
      <div className="preserve-3d">
        {/* Video / Audio Live Simulation Viewport */}
        <div className="relative aspect-video bg-[#0E3B3A] dark:bg-[#0B1514] p-5 flex flex-col justify-between overflow-hidden border-b border-[#CFDAD6] dark:border-[#1F3835]">
          {/* Subtle architectural grid pattern */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(#F2A900 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }}
          />

          {/* Top Bar inside Video Player */}
          <div className="relative z-10 flex items-center justify-between text-xs text-[#F1F5F3]/90 font-mono-tabular">
            <span className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  isPlaying ? 'bg-[#15803D] animate-ping' : 'bg-[#F2A900]'
                }`}
              />
              <span>0{index + 1} · LIVE WALKTHROUGH</span>
            </span>
            <span>{durationLabel}</span>
          </div>

          {/* Center Interactive Transcript / Waveform Preview */}
          <div
            className="relative z-10 my-auto py-2"
            style={{ transform: 'translateZ(20px)' }}
          >
            {isPlaying ? (
              <div className="space-y-2 bg-[#12211F]/85 backdrop-blur-sm p-3 rounded-xl border border-[#F2A900]/40 text-xs text-[#F1F5F3]">
                <p className="text-[#F2A900] font-mono-tabular font-semibold">
                  {service.exampleConversation[0]?.senderLabel}:{' '}
                  <span className="text-[#F1F5F3] font-normal">
                    "{service.exampleConversation[0]?.text}"
                  </span>
                </p>
                <p className="text-[#4ADE80] font-mono-tabular font-semibold">
                  {service.shortTitle} AI:{' '}
                  <span className="text-[#F1F5F3] font-normal">
                    "{service.exampleConversation[1]?.text}"
                  </span>
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="w-12 h-12 rounded-xl bg-[#F2A900] text-[#12211F] flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer shrink-0"
                  aria-label={`Play ${service.title} demo video`}
                >
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </button>
                <div className="text-left">
                  <p className="text-xs text-[#F2A900] font-mono-tabular font-semibold">
                    CLICK TO PREVIEW ({durationLabel})
                  </p>
                  <p className="text-sm font-display font-bold text-[#F1F5F3] line-clamp-1">
                    {service.title} in Urdu & English
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Bar inside Video Player */}
          <div className="relative z-10 flex items-center justify-between text-[11px] text-[#F1F5F3]/75 font-mono-tabular">
            <span>Karachi Accent + Roman Urdu</span>
            {isPlaying && (
              <button
                type="button"
                onClick={() => setIsPlaying(false)}
                className="inline-flex items-center gap-1 text-[#F2A900] hover:underline cursor-pointer"
              >
                <Pause className="w-3 h-3" />
                <span>Pause preview</span>
              </button>
            )}
          </div>
        </div>

        {/* Card Content (Max 3 data points: Title, 2-line description, Primary Action) */}
        <div
          className="p-6 space-y-3"
          style={{ transform: 'translateZ(14px)' }}
        >
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-display text-xl font-bold text-[#12211F] dark:text-[#F1F5F3]">
              {service.title}
            </h3>
            <button
              type="button"
              onClick={() => onViewService(service.slug)}
              className="text-xs font-semibold text-[#0E3B3A] dark:text-[#F2A900] hover:underline shrink-0 cursor-pointer"
            >
              Details →
            </button>
          </div>

          <p className="text-sm text-[#12211F]/80 dark:text-[#F1F5F3]/80 line-clamp-2 leading-relaxed">
            {service.demo ? service.demo.demoLines[lang] : service.oneLiner[lang]}
          </p>
        </div>
      </div>

      {/* Card Footer CTA */}
      <div
        className="px-6 pb-6 pt-2 flex items-center gap-3"
        style={{ transform: 'translateZ(18px)' }}
      >
        <a
          href={tryActionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-[#0E3B3A] text-[#F1F5F3] dark:bg-[#1B5A57] dark:text-[#F1F5F3] hover:bg-[#12211F] dark:hover:bg-[#F2A900] dark:hover:text-[#12211F] transition-colors"
        >
          <WhatsAppLogo className="w-4 h-4 text-[#25D366] dark:text-current" />
          <span>Try it now</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-75" />
        </a>
      </div>
    </Tilt3DCard>
  );
};
