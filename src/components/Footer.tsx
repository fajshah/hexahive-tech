import React from 'react';
import { MapPin, Sun, Moon, Globe } from 'lucide-react';
import { siteConfig, LanguageMode, getWhatsAppUrl } from '../data/site';
import { servicesData } from '../data/services';
import { BrandLogoMark, WhatsAppLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (path: string) => void;
  lang: LanguageMode;
  onToggleLang: () => void;
  isDark: boolean;
  onToggleDark: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  lang,
  onToggleLang,
  isDark,
  onToggleDark,
}) => {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="bg-[#FFFFFF] dark:bg-[#122220] border-t border-[#CFDAD6] dark:border-[#1F3835] py-12 sm:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#CFDAD6] dark:border-[#1F3835]">
          {/* Col 1: Brand + Location */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="/"
              onClick={(e) => handleNav(e, '/')}
              className="inline-flex items-center gap-3"
            >
              <BrandLogoMark className="w-10 h-10" />
              <div className="flex flex-col leading-none">
                <span className="font-display font-extrabold text-lg tracking-[0.06em] uppercase text-[#1E3545] dark:text-[#F1F5F3]">
                  HEXAHIVE
                </span>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="h-[1.5px] w-4 bg-[#1E3545]/45 dark:bg-[#F2A900]/60 rounded-full" />
                  <span className="font-display font-bold text-[10px] tracking-[0.26em] uppercase text-[#0E3B3A] dark:text-[#F2A900]">
                    TECH
                  </span>
                  <span className="h-[1.5px] w-4 bg-[#1E3545]/45 dark:bg-[#F2A900]/60 rounded-full" />
                </div>
              </div>
            </a>

            <p className="text-sm text-[#12211F]/75 dark:text-[#F1F5F3]/75 max-w-sm leading-relaxed">
              Full-stack Agentic AI software house of 6 developers building 10 specialized AI solutions — voice receptionists, WhatsApp sales agents, real estate AI, HR, SafeHer B2B, restaurant, e-commerce, education, legal, and AI websites.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono-tabular text-[#0E3B3A] dark:text-[#F2A900]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{siteConfig.city}</span>
              </span>
              <span>·</span>
              <a href={`mailto:${siteConfig.email}`} className="hover:underline">
                {siteConfig.email}
              </a>
              <span>·</span>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#25D366] text-[#FFFFFF] font-sans font-semibold hover:opacity-90 transition-opacity"
                aria-label="Chat on WhatsApp"
                title="Chat on WhatsApp"
              >
                <WhatsAppLogo className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Col 2: All 10 Services */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-mono-tabular font-semibold uppercase tracking-wider text-[#12211F]/60 dark:text-[#F1F5F3]/60">
              All 10 AI Solutions
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs sm:text-sm">
              {servicesData.map((s) => (
                <li key={s.slug}>
                  <a
                    href={`/services/${s.slug}`}
                    onClick={(e) => handleNav(e, `/services/${s.slug}`)}
                    className="text-[#12211F]/80 dark:text-[#F1F5F3]/80 hover:text-[#0E3B3A] dark:hover:text-[#F2A900] transition-colors line-clamp-1"
                  >
                    <span className="font-mono-tabular text-[11px] text-[#F2A900] mr-1">
                      {s.index}.
                    </span>
                    {s.shortTitle}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company, Blog, Socials & Display Controls */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-mono-tabular font-semibold uppercase tracking-wider text-[#12211F]/60 dark:text-[#F1F5F3]/60">
              Resources & Preferences
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/blog"
                  onClick={(e) => handleNav(e, '/blog')}
                  className="text-[#12211F]/80 dark:text-[#F1F5F3]/80 hover:text-[#0E3B3A] dark:hover:text-[#F2A900] font-medium"
                >
                  AI Playbook Blog (MDX Guides)
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#12211F]/80 dark:text-[#F1F5F3]/80 hover:text-[#0E3B3A] dark:hover:text-[#F2A900]"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#12211F]/80 dark:text-[#F1F5F3]/80 hover:text-[#0E3B3A] dark:hover:text-[#F2A900]"
                >
                  Instagram ↗
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#12211F]/80 dark:text-[#F1F5F3]/80 hover:text-[#0E3B3A] dark:hover:text-[#F2A900]"
                >
                  GitHub ↗
                </a>
              </li>
            </ul>

            {/* Language & Theme Controls */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onToggleLang}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-tabular font-medium border border-[#CFDAD6] dark:border-[#1F3835] bg-[#F1F5F3] dark:bg-[#0B1514] text-[#12211F] dark:text-[#F1F5F3] hover:border-[#F2A900] transition-colors cursor-pointer"
                aria-label="Toggle language between Roman Urdu and English"
              >
                <Globe className="w-3.5 h-3.5 text-[#F2A900]" />
                <span>{lang === 'ru' ? 'Tone: Roman Urdu + EN' : 'Tone: English'}</span>
              </button>

              <button
                type="button"
                onClick={onToggleDark}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-tabular font-medium border border-[#CFDAD6] dark:border-[#1F3835] bg-[#F1F5F3] dark:bg-[#0B1514] text-[#12211F] dark:text-[#F1F5F3] hover:border-[#F2A900] transition-colors cursor-pointer"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-[#F2A900]" />
                    <span>Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-[#0E3B3A]" />
                    <span>Dark</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#12211F]/65 dark:text-[#F1F5F3]/65">
          <p>© {new Date().getFullYear()} HexaHive Tech. All rights reserved.</p>
          <p className="font-mono-tabular">
            Built in {siteConfig.city} · Response SLA &lt; 2s
          </p>
        </div>
      </div>
    </footer>
  );
};
