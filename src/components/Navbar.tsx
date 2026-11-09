import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LanguageMode } from '../data/site';
import { BrandLogoMark } from './BrandLogo';

interface NavbarProps {
  onNavigate: (path: string) => void;
  currentPath: string;
  lang?: LanguageMode;
  onToggleLang?: () => void;
  isDark?: boolean;
  onToggleDark?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  currentPath,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Services', href: '/#services' },
    { label: 'Demos', href: '/#demos' },
    { label: 'Process', href: '/#process' },
    { label: 'Team', href: '/#team' },
    { label: 'Contact', href: '/#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(href);
  };

  return (
    <header className="sticky top-0 z-40 h-16 sm:h-[72px] w-full bg-[#F1F5F3]/90 dark:bg-[#0B1514]/90 backdrop-blur-md border-b border-[#CFDAD6] dark:border-[#1F3835] transition-colors">
      <div className="max-w-[1200px] mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Zone 1: Official HexaHive Tech Brand Emblem on Left + Wordmark */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="flex items-center gap-3 group focus:outline-none"
          aria-label="HexaHive Tech Home"
        >
          <BrandLogoMark className="w-10 h-10 sm:w-11 sm:h-11 transition-transform duration-200 group-hover:scale-105" />
          <div className="flex flex-col leading-none">
            <span className="font-display font-extrabold text-[17px] sm:text-[19px] tracking-[0.06em] uppercase text-[#1E3545] dark:text-[#F1F5F3]">
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

        {/* Zone 2: Primary Section Anchors (5 items) */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = currentPath === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#0E3B3A] dark:text-[#F2A900] font-semibold'
                    : 'text-[#12211F]/80 dark:text-[#F1F5F3]/80 hover:text-[#0E3B3A] dark:hover:text-[#F2A900]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action CTA */}
        <div className="flex items-center gap-2">
          <a
            href="/#contact"
            onClick={(e) => handleLinkClick(e, '/#contact')}
            className="inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-[#0E3B3A] text-[#F1F5F3] dark:bg-[#F2A900] dark:text-[#12211F] hover:opacity-95 transition-opacity"
          >
            Book a free demo
          </a>

          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg border border-[#CFDAD6] dark:border-[#1F3835] text-[#12211F] dark:text-[#F1F5F3]"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFFFF] dark:bg-[#122220] border-b border-[#CFDAD6] dark:border-[#1F3835] px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="block py-2 text-base font-medium text-[#12211F] dark:text-[#F1F5F3] hover:text-[#F2A900]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
