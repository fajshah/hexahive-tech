/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Globe,
  Moon,
  Sun,
  PhoneCall,
  MessageSquare,
  Building2,
  Users,
  ShieldCheck,
  UtensilsCrossed,
  ShoppingBag,
  GraduationCap,
  Scale,
  Layout,
  Sparkles,
} from 'lucide-react';
import { LanguageMode, siteConfig } from './data/site';
import { servicesData, ServiceCategory } from './data/services';
import { pricingPlans } from './data/pricing';
import { teamMembers } from './data/team';
import { blogPosts } from './data/blog';
import { Navbar } from './components/Navbar';
import { HeroHoneycomb } from './components/HeroHoneycomb';
import { DemoVideoCard } from './components/DemoVideoCard';
import { HexAvatar } from './components/HexAvatar';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { BlogIndexView, BlogArticleView } from './components/BlogViews';
import { AiChatWidget } from './components/AiChatWidget';
import { Tilt3DCard } from './components/Tilt3DCard';

// Map each of the 10 service slugs to a crisp architectural icon
function getServiceIcon(slug: string) {
  switch (slug) {
    case 'ai-receptionist':
      return <PhoneCall className="w-5 h-5" />;
    case 'whatsapp-sales-agent':
      return <MessageSquare className="w-5 h-5" />;
    case 'real-estate-agent':
      return <Building2 className="w-5 h-5" />;
    case 'ai-hr-agent':
      return <Users className="w-5 h-5" />;
    case 'safeher-b2b':
      return <ShieldCheck className="w-5 h-5" />;
    case 'restaurant-ai-manager':
      return <UtensilsCrossed className="w-5 h-5" />;
    case 'ecommerce-agent':
      return <ShoppingBag className="w-5 h-5" />;
    case 'education-ai-agent':
      return <GraduationCap className="w-5 h-5" />;
    case 'legal-documentation-agent':
      return <Scale className="w-5 h-5" />;
    case 'websites-with-ai-chat':
    default:
      return <Layout className="w-5 h-5" />;
  }
}

export default function App() {
  // Language mode ('ru' = Roman Urdu + English mix, 'en' = English)
  const [lang, setLang] = useState<LanguageMode>('ru');

  // Active filter for the 10 Software House Services catalog
  const [activeCategory, setActiveCategory] = useState<'all' | ServiceCategory>('all');

  // Theme mode following system preference + manual toggle
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = window.localStorage.getItem('hexahive-theme');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Client-side route state supporting /, /services/[slug], /blog, /blog/[slug]
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window === 'undefined') return '/';
    return window.location.pathname || '/';
  });

  const [preselectedService, setPreselectedService] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      window.localStorage.setItem('hexahive-theme', 'dark');
    } else {
      root.classList.remove('dark');
      window.localStorage.setItem('hexahive-theme', 'light');
    }
  }, [isDark]);

  // Listen to browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update per-page document title for SEO
  useEffect(() => {
    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      const svc = servicesData.find((s) => s.slug === slug);
      if (svc) {
        document.title = `${svc.title} — HexaHive Tech Karachi`;
        return;
      }
    }
    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '');
      const post = blogPosts.find((p) => p.slug === slug);
      if (post) {
        document.title = `${post.title} — HexaHive Tech Blog`;
        return;
      }
    }
    if (currentPath === '/blog') {
      document.title = 'AI Playbook Blog — HexaHive Tech Karachi';
      return;
    }
    document.title =
      'HexaHive Tech — Agentic AI Software House for Pakistani Businesses';
  }, [currentPath]);

  const navigate = (target: string) => {
    if (target.startsWith('/#')) {
      const sectionId = target.replace('/#', '');
      if (currentPath !== '/') {
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      } else {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    window.history.pushState({}, '', target);
    setCurrentPath(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookService = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    navigate('/#contact');
  };

  const demoServices = servicesData.filter((s) => s.isFeaturedDemo);

  const filteredServices =
    activeCategory === 'all'
      ? servicesData
      : servicesData.filter((s) => s.category === activeCategory);

  // Route matching
  const matchedService = currentPath.startsWith('/services/')
    ? servicesData.find((s) => s.slug === currentPath.replace('/services/', ''))
    : undefined;

  const matchedBlogPost = currentPath.startsWith('/blog/')
    ? blogPosts.find((p) => p.slug === currentPath.replace('/blog/', ''))
    : undefined;

  return (
    <div className="min-h-screen bg-[#F1F5F3] dark:bg-[#0B1514] text-[#12211F] dark:text-[#F1F5F3] flex flex-col selection:bg-[#F2A900] selection:text-[#12211F] transition-colors">
      <Navbar
        onNavigate={navigate}
        currentPath={currentPath}
        lang={lang}
        onToggleLang={() => setLang((l) => (l === 'ru' ? 'en' : 'ru'))}
        isDark={isDark}
        onToggleDark={() => setIsDark((d) => !d)}
      />

      <main className="flex-1">
        {matchedService ? (
          <ServiceDetailPage
            service={matchedService}
            lang={lang}
            onNavigate={navigate}
            onBookService={handleBookService}
          />
        ) : matchedBlogPost ? (
          <BlogArticleView
            post={matchedBlogPost}
            lang={lang}
            onNavigate={navigate}
          />
        ) : currentPath === '/blog' ? (
          <BlogIndexView lang={lang} onNavigate={navigate} />
        ) : (
          <>
            {/* 1. HERO SECTION WITH 3D PERSPECTIVE MOTION */}
            <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 overflow-hidden perspective-stage">
              {/* Ambient 3D Floating Wireframe Hexagons in Background */}
              <motion.div
                aria-hidden="true"
                animate={{
                  y: [0, -18, 0],
                  rotateX: [15, 28, 15],
                  rotateY: [-15, 15, -15],
                  rotateZ: [0, 12, 0],
                }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                className="pointer-events-none absolute -top-10 left-[6%] w-40 h-40 hex-clip border border-[#0E3B3A]/10 dark:border-[#F2A900]/10 bg-gradient-to-br from-[#F2A900]/5 to-transparent"
              />
              <motion.div
                aria-hidden="true"
                animate={{
                  y: [0, 16, 0],
                  rotateX: [-20, 10, -20],
                  rotateY: [20, -12, 20],
                }}
                transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
                className="pointer-events-none absolute bottom-6 right-[4%] w-52 h-52 hex-clip border border-[#F2A900]/15 dark:border-[#1B5A57]/20 bg-gradient-to-tr from-[#0E3B3A]/5 to-transparent"
              />

              <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6">
                {/* Top Utility Bar: Karachi Location + Language Toggle + Theme Toggle */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-8 mb-8 border-b border-[#CFDAD6]/80 dark:border-[#1F3835]">
                  <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#12211F]/75 dark:text-[#F1F5F3]/75">
                    <span className="w-2 h-2 rounded-full bg-[#F2A900]" />
                    <span>KARACHI SOFTWARE HOUSE</span>
                    <span aria-hidden="true">·</span>
                    <span>6 AGENTIC AI DEVELOPERS</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-[#0E3B3A] dark:text-[#F2A900]">
                      10 AI PRODUCTS & SERVICES
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setLang((l) => (l === 'ru' ? 'en' : 'ru'))}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono-tabular font-semibold bg-[#FFFFFF] dark:bg-[#122220] border border-[#CFDAD6] dark:border-[#1F3835] hover:border-[#F2A900] transition-colors cursor-pointer"
                      title="Switch supporting copy between Roman Urdu mix and English"
                    >
                      <Globe className="w-3.5 h-3.5 text-[#F2A900]" />
                      <span>{lang === 'ru' ? 'Roman Urdu + EN' : 'English Only'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsDark((d) => !d)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono-tabular font-semibold bg-[#FFFFFF] dark:bg-[#122220] border border-[#CFDAD6] dark:border-[#1F3835] hover:border-[#F2A900] transition-colors cursor-pointer"
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

                {/* Main Split Hero Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                  {/* Left 7 Columns: Headline, Roman Urdu Subtext, CTAs with 3D Reveal */}
                  <motion.div
                    initial={{ opacity: 0, y: 24, rotateX: 10 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformPerspective: 1000 }}
                    className="lg:col-span-7 space-y-6"
                  >
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-[60px] font-extrabold tracking-tight leading-[1.06] text-[#12211F] dark:text-[#F1F5F3]">
                      {siteConfig.hero.headline}
                    </h1>

                    <p className="text-base sm:text-xl text-[#12211F]/85 dark:text-[#F1F5F3]/85 leading-relaxed max-w-[60ch]">
                      {siteConfig.hero.subtext[lang]}
                    </p>

                    {/* Primary & Secondary CTAs with 3D Spring Press */}
                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.04, y: -3 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate('/#contact')}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-display font-bold text-sm sm:text-base bg-[#F2A900] text-[#12211F] hover:bg-[#d99700] transition-colors shadow-[0_10px_25px_-6px_rgba(242,169,0,0.45)] cursor-pointer"
                      >
                        <span>Book a free demo</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>

                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/#services')}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-display font-bold text-sm sm:text-base bg-[#FFFFFF] dark:bg-[#122220] text-[#12211F] dark:text-[#F1F5F3] border border-[#CFDAD6] dark:border-[#1F3835] hover:border-[#0E3B3A] dark:hover:border-[#F2A900] transition-colors cursor-pointer"
                      >
                        <span>Explore 10 AI services</span>
                      </motion.button>
                    </div>

                    {/* Plain Typographic Trust Metrics */}
                    <div className="pt-6 border-t border-[#CFDAD6]/70 dark:border-[#1F3835] grid grid-cols-3 gap-4 max-w-lg">
                      <div>
                        <p className="font-mono-tabular font-bold text-lg sm:text-xl text-[#0E3B3A] dark:text-[#F2A900]">
                          10 Products
                        </p>
                        <p className="text-xs text-[#12211F]/70 dark:text-[#F1F5F3]/70">
                          Voice, WhatsApp & Vertical AI
                        </p>
                      </div>
                      <div>
                        <p className="font-mono-tabular font-bold text-lg sm:text-xl text-[#0E3B3A] dark:text-[#F2A900]">
                          72 Hours
                        </p>
                        <p className="text-xs text-[#12211F]/70 dark:text-[#F1F5F3]/70">
                          Free working demo turnaround
                        </p>
                      </div>
                      <div>
                        <p className="font-mono-tabular font-bold text-lg sm:text-xl text-[#0E3B3A] dark:text-[#F2A900]">
                          PKR Billing
                        </p>
                        <p className="text-xs text-[#12211F]/70 dark:text-[#F1F5F3]/70">
                          Local bank transfer, no USD cards
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right 5 Columns: Interactive 3D Honeycomb Graphic */}
                  <div className="lg:col-span-5 flex justify-center">
                    <HeroHoneycomb
                      lang={lang}
                      onSelectService={(slug) => navigate(`/services/${slug}`)}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 2. SERVICES SECTION (ALL 10 SOFTWARE HOUSE SOLUTIONS WITH 3D TILT) */}
            <section
              id="services"
              className="py-16 sm:py-24 border-t border-[#CFDAD6] dark:border-[#1F3835]"
            >
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-2 max-w-2xl">
                    <p className="text-xs font-mono-tabular font-semibold text-[#0E3B3A] dark:text-[#F2A900]">
                      01 · COMPLETE SOFTWARE HOUSE CATALOG (10 SOLUTIONS)
                    </p>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                      10 specialized AI agents & web systems built for Pakistan.
                    </h2>
                    <p className="text-sm sm:text-base text-[#12211F]/80 dark:text-[#F1F5F3]/80 leading-relaxed">
                      {lang === 'ru'
                        ? 'AI Receptionist aur WhatsApp Sales se le kar Karachi Real Estate, SafeHer B2B, Restaurant, E-Commerce, Education, Legal aur custom AI websites tak — har industry ka mukammal hal.'
                        : 'From high-demand AI Voice Receptionists and Karachi Real Estate AI to SafeHer B2B compliance, Restaurant managers, E-Commerce, Education, Legal, and full-stack AI websites.'}
                    </p>
                  </div>

                  {/* Category Filter Tabs */}
                  <div
                    className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#FFFFFF] dark:bg-[#122220] border border-[#CFDAD6] dark:border-[#1F3835]"
                    role="tablist"
                    aria-label="Filter software house services by category"
                  >
                    {[
                      { id: 'all', label: 'All 10 Solutions' },
                      { id: 'flagship', label: 'Flagship Demand' },
                      { id: 'industry', label: 'Industry Verticals' },
                      { id: 'b2b-web', label: 'SafeHer, Legal & Web' },
                    ].map((tab) => {
                      const active = activeCategory === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() =>
                            setActiveCategory(tab.id as 'all' | ServiceCategory)
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#0E3B3A] text-[#F1F5F3] dark:bg-[#F2A900] dark:text-[#12211F]'
                              : 'text-[#12211F]/75 dark:text-[#F1F5F3]/75 hover:text-[#12211F] dark:hover:text-[#F1F5F3]'
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 10 Service Cards Grid with Interactive 3D Tilt & Z-Depth */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service, idx) => {
                    const isGoldCard =
                      service.index === '01' ||
                      service.index === '02' ||
                      service.index === '03';
                    return (
                      <Tilt3DCard
                        key={service.slug}
                        intensity={8}
                        delay={(idx % 3) * 0.06}
                        onClick={() => navigate(`/services/${service.slug}`)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            navigate(`/services/${service.slug}`);
                          }
                        }}
                        tabIndex={0}
                        role="button"
                        ariaLabel={`View ${service.title} details`}
                        className={`group rounded-2xl p-6 flex flex-col justify-between gap-6 transition-colors duration-200 cursor-pointer ${
                          isGoldCard
                            ? 'bg-[#FFFFFF] dark:bg-[#122220] border-2 border-[#F2A900]/80 shadow-[0_16px_34px_-14px_rgba(242,169,0,0.24)]'
                            : 'bg-[#FFFFFF] dark:bg-[#122220] border border-[#CFDAD6] dark:border-[#1F3835] hover:border-[#F2A900] shadow-sm'
                        }`}
                      >
                        <div className="space-y-4 preserve-3d">
                          {/* Top Row: 3D Hex Icon floating in Z-space + Number + Demand Tag */}
                          <div
                            className="flex items-center justify-between gap-2"
                            style={{ transform: 'translateZ(26px)' }}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-11 h-11 hex-clip bg-gradient-to-br from-[#1B5A57] to-[#0E3B3A] text-[#F2A900] flex items-center justify-center shrink-0 group-hover:from-[#F2A900] group-hover:to-[#C88400] group-hover:text-[#12211F] transition-colors shadow-md">
                                {getServiceIcon(service.slug)}
                              </div>
                              <div>
                                <span className="font-mono-tabular text-xs font-bold text-[#0E3B3A] dark:text-[#F2A900]">
                                  SERVICE {service.index}
                                </span>
                                {service.demandTag && (
                                  <p className="flex items-center gap-1 text-[11px] font-mono-tabular font-semibold text-[#B45309] dark:text-[#F2A900]">
                                    <Sparkles className="w-3 h-3 text-[#F2A900]" />
                                    <span>{service.demandTag[lang]}</span>
                                  </p>
                                )}
                              </div>
                            </div>

                            <ArrowUpRight className="w-4 h-4 text-[#12211F]/40 dark:text-[#F1F5F3]/40 group-hover:text-[#F2A900] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                          </div>

                          {/* Title & 1-Sentence Pitch */}
                          <div
                            className="space-y-2"
                            style={{ transform: 'translateZ(16px)' }}
                          >
                            <h3 className="font-display text-xl font-bold text-[#12211F] dark:text-[#F1F5F3] group-hover:text-[#0E3B3A] dark:group-hover:text-[#F2A900] transition-colors">
                              {service.title}
                            </h3>
                            <p className="text-sm text-[#12211F]/80 dark:text-[#F1F5F3]/80 leading-relaxed">
                              {service.oneLiner[lang]}
                            </p>
                          </div>
                        </div>

                        {/* Bottom Metrics Row */}
                        <div
                          className="pt-4 border-t border-[#CFDAD6]/60 dark:border-[#1F3835] flex items-center justify-between text-xs font-mono-tabular text-[#12211F]/65 dark:text-[#F1F5F3]/65"
                          style={{ transform: 'translateZ(12px)' }}
                        >
                          <span className="truncate pr-2">{service.metricHighlight}</span>
                          <span className="font-semibold text-[#0E3B3A] dark:text-[#F2A900] group-hover:underline shrink-0">
                            See live script →
                          </span>
                        </div>
                      </Tilt3DCard>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* 3. DEMOS SECTION (3 FEATURED DEMO CARDS) */}
            <section
              id="demos"
              className="py-16 sm:py-24 border-t border-[#CFDAD6] dark:border-[#1F3835]"
            >
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
                <div className="max-w-2xl space-y-2">
                  <p className="text-xs font-mono-tabular font-semibold text-[#0E3B3A] dark:text-[#F2A900]">
                    02 · WATCH & TEST LIVE
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                    See our top 3 agents handle real Karachi customers.
                  </h2>
                  <p className="text-base text-[#12211F]/80 dark:text-[#F1F5F3]/80">
                    {lang === 'ru'
                      ? 'Har demo card mein 60–90 second ka preview hai aur neeche "Try it now" button hai jis se aap khud WhatsApp par test kar sakte hain.'
                      : 'Preview a 60–90 second conversation transcript or click "Try it now" to test the agent directly on WhatsApp.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {demoServices.map((service, idx) => (
                    <DemoVideoCard
                      key={service.slug}
                      service={service}
                      index={idx}
                      lang={lang}
                      onViewService={(slug) => navigate(`/services/${slug}`)}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 4. HOW WE WORK (4 STEPS WITH 3D TILT) */}
            <section
              id="process"
              className="py-16 sm:py-24 border-t border-[#CFDAD6] dark:border-[#1F3835] bg-[#FFFFFF]/50 dark:bg-[#122220]/40"
            >
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="space-y-2 max-w-xl">
                    <p className="text-xs font-mono-tabular font-semibold text-[#0E3B3A] dark:text-[#F2A900]">
                      03 · HOW WE WORK
                    </p>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                      From first call to live AI agent in 4 steps.
                    </h2>
                  </div>
                  <p className="text-sm font-mono-tabular font-semibold text-[#0E3B3A] dark:text-[#F2A900]">
                    ★ Note: Step 02 (Your first custom demo) is 100% free.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {siteConfig.processSteps.map((s, idx) => (
                    <Tilt3DCard
                      key={s.number}
                      intensity={7}
                      delay={idx * 0.07}
                      className="group bg-[#FFFFFF] dark:bg-[#122220] border border-[#CFDAD6] dark:border-[#1F3835] hover:border-[#F2A900] rounded-2xl p-6 space-y-4 flex flex-col justify-between transition-colors"
                    >
                      <div
                        className="space-y-3"
                        style={{ transform: 'translateZ(18px)' }}
                      >
                        <div className="flex items-center justify-between text-xs font-mono-tabular">
                          <span className="font-bold text-[#F2A900] text-sm">
                            STEP {s.number}
                          </span>
                          <span className="text-[#12211F]/65 dark:text-[#F1F5F3]/65">
                            {s.duration}
                          </span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-[#12211F] dark:text-[#F1F5F3]">
                          {s.title}
                        </h3>
                        <p className="text-sm text-[#12211F]/80 dark:text-[#F1F5F3]/80 leading-relaxed">
                          {s.description[lang]}
                        </p>
                      </div>
                    </Tilt3DCard>
                  ))}
                </div>
              </div>
            </section>

            {/* 5. PRICING SECTION (3 PLANS IN PKR WITH 3D TILT) */}
            <section
              id="pricing"
              className="py-16 sm:py-24 border-t border-[#CFDAD6] dark:border-[#1F3835]"
            >
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
                <div className="max-w-2xl space-y-2">
                  <p className="text-xs font-mono-tabular font-semibold text-[#0E3B3A] dark:text-[#F2A900]">
                    04 · TRANSPARENT PKR PRICING
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                    Simple setup + monthly care in PKR.
                  </h2>
                  <p className="text-base text-[#12211F]/80 dark:text-[#F1F5F3]/80">
                    {lang === 'ru'
                      ? 'Koi chhupi hui dollar fees nahi. Pehle free demo dekhein, phir apne business ke hisaab se plan chunein.'
                      : 'No surprise USD credit card bills. Test your free prototype demo first, then pick the plan that matches your volume.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                  {pricingPlans.map((plan, idx) => (
                    <Tilt3DCard
                      key={plan.id}
                      intensity={6}
                      delay={idx * 0.08}
                      className={`group rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-8 ${
                        plan.featured
                          ? 'bg-[#0E3B3A] text-[#F1F5F3] border-2 border-[#F2A900] shadow-xl'
                          : 'bg-[#FFFFFF] dark:bg-[#122220] text-[#12211F] dark:text-[#F1F5F3] border border-[#CFDAD6] dark:border-[#1F3835] hover:border-[#F2A900]'
                      }`}
                    >
                      <div
                        className="space-y-5"
                        style={{ transform: 'translateZ(18px)' }}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-display text-2xl font-bold">
                            {plan.name}
                          </h3>
                          {plan.featured && (
                            <span className="text-xs font-mono-tabular font-bold text-[#F2A900]">
                              MOST POPULAR
                            </span>
                          )}
                        </div>

                        <p
                          className={`text-sm leading-relaxed ${
                            plan.featured
                              ? 'text-[#F1F5F3]/85'
                              : 'text-[#12211F]/75 dark:text-[#F1F5F3]/75'
                          }`}
                        >
                          {plan.summary[lang]}
                        </p>

                        {/* Setup + Monthly Fee Box */}
                        <div
                          className={`p-4 rounded-xl border space-y-2 ${
                            plan.featured
                              ? 'bg-[#12211F]/50 border-[#1B5A57]'
                              : 'bg-[#F1F5F3] dark:bg-[#0B1514] border-[#CFDAD6] dark:border-[#1F3835]'
                          }`}
                        >
                          <div className="flex items-baseline justify-between">
                            <span className="text-xs font-mono-tabular opacity-75">
                              One-time Setup:
                            </span>
                            <span className="font-mono-tabular font-bold text-base sm:text-lg">
                              {plan.setupFeePkr}
                            </span>
                          </div>
                          <div className="flex items-baseline justify-between">
                            <span className="text-xs font-mono-tabular opacity-75">
                              Monthly Care:
                            </span>
                            <span
                              className={`font-mono-tabular font-bold text-lg sm:text-xl ${
                                plan.featured
                                  ? 'text-[#F2A900]'
                                  : 'text-[#0E3B3A] dark:text-[#F2A900]'
                              }`}
                            >
                              {plan.monthlyFeePkr}
                            </span>
                          </div>
                        </div>

                        <ul className="space-y-3 text-sm pt-2">
                          {plan.features[lang].map((feat) => (
                            <li key={feat} className="flex items-start gap-2.5">
                              <Check
                                className={`w-4 h-4 shrink-0 mt-0.5 ${
                                  plan.featured
                                    ? 'text-[#F2A900]'
                                    : 'text-[#0E3B3A] dark:text-[#F2A900]'
                                }`}
                              />
                              <span className="leading-snug">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        type="button"
                        onClick={() => navigate('/#contact')}
                        style={{ transform: 'translateZ(24px)' }}
                        className={`w-full py-3 px-4 rounded-xl font-display font-bold text-sm transition-colors cursor-pointer ${
                          plan.featured
                            ? 'bg-[#F2A900] text-[#12211F] hover:bg-[#d99700]'
                            : 'bg-[#0E3B3A] text-[#F1F5F3] dark:bg-[#1B5A57] hover:bg-[#12211F]'
                        }`}
                      >
                        {plan.ctaLabel}
                      </button>
                    </Tilt3DCard>
                  ))}
                </div>
              </div>
            </section>

            {/* 6. TEAM SECTION (6 HEXAGON AVATARS WITH 3D MOTION) */}
            <section
              id="team"
              className="py-16 sm:py-24 border-t border-[#CFDAD6] dark:border-[#1F3835] bg-[#FFFFFF]/40 dark:bg-[#122220]/30"
            >
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="max-w-2xl space-y-2">
                    <p className="text-xs font-mono-tabular font-semibold text-[#0E3B3A] dark:text-[#F2A900]">
                      05 · THE KARACHI TEAM
                    </p>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                      Meet the 6 engineers building your agents.
                    </h2>
                    <p className="text-base text-[#12211F]/80 dark:text-[#F1F5F3]/80">
                      {lang === 'ru'
                        ? 'Koi middleman ya account manager nahi — aap seedha Syeda Farzana Shah aur un ki 5 specialist Agentic AI developers ki team ke sath kaam karte hain.'
                        : 'No account managers or middlemen — you work directly with Team Lead Syeda Farzana Shah and our 5 Agentic AI developers in Karachi.'}
                    </p>
                  </div>
                </div>

                {/* Lead stands out across top row, 5 developers below */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {teamMembers.map((member, idx) => (
                    <HexAvatar
                      key={member.id}
                      member={member}
                      lang={lang}
                      index={idx}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 7. CONTACT SECTION */}
            <ContactSection
              lang={lang}
              preselectedService={preselectedService}
            />
          </>
        )}
      </main>

      <Footer
        onNavigate={navigate}
        lang={lang}
        onToggleLang={() => setLang((l) => (l === 'ru' ? 'en' : 'ru'))}
        isDark={isDark}
        onToggleDark={() => setIsDark((d) => !d)}
      />

      {/* Corner AI Chat Widget + Floating WhatsApp Button */}
      <AiChatWidget />
    </div>
  );
}
