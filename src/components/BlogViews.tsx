import React from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { blogPosts, BlogPost } from '../data/blog';
import { LanguageMode } from '../data/site';

interface BlogIndexProps {
  lang: LanguageMode;
  onNavigate: (path: string) => void;
}

export const BlogIndexView: React.FC<BlogIndexProps> = ({ lang, onNavigate }) => {
  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
        <div className="space-y-4 max-w-2xl">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E3B3A] dark:text-[#F2A900] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#12211F] dark:text-[#F1F5F3]">
            Practical guides on AI agents for Pakistani businesses.
          </h1>
          <p className="text-base text-[#12211F]/80 dark:text-[#F1F5F3]/80 leading-relaxed">
            {lang === 'ru'
              ? 'Karachi ke clinics, e-commerce stores aur real estate agencies mein AI receptionists aur WhatsApp automation kaise kaam karti hai — seedhi aur asaan zaban mein.'
              : 'Plain, field-tested playbooks from our Karachi engineering team on deploying AI receptionists, WhatsApp sales agents, and real estate automation in Pakistan.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, idx) => (
            <article
              key={post.slug}
              className="bg-[#FFFFFF] dark:bg-[#122220] border border-[#CFDAD6] dark:border-[#1F3835] rounded-2xl p-6 flex flex-col justify-between gap-6 hover:border-[#F2A900] transition-colors"
            >
              <div className="space-y-3">
                {/* Unboxed metadata with typographic separators */}
                <div className="flex items-center gap-2 text-xs text-[#12211F]/65 dark:text-[#F1F5F3]/65 font-mono-tabular">
                  <span>0{idx + 1}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-[#0E3B3A] dark:text-[#F2A900]">
                    {post.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </div>

                <h2 className="font-display text-xl font-bold text-[#12211F] dark:text-[#F1F5F3] leading-snug">
                  <button
                    type="button"
                    onClick={() => onNavigate(`/blog/${post.slug}`)}
                    className="text-left hover:text-[#0E3B3A] dark:hover:text-[#F2A900] transition-colors cursor-pointer"
                  >
                    {post.title}
                  </button>
                </h2>

                <p className="text-sm text-[#12211F]/80 dark:text-[#F1F5F3]/80 leading-relaxed">
                  {post.excerpt[lang]}
                </p>
              </div>

              <div className="pt-4 border-t border-[#CFDAD6]/60 dark:border-[#1F3835] flex items-center justify-between text-xs">
                <span className="text-[#12211F]/65 dark:text-[#F1F5F3]/65">
                  {post.publishedAt}
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate(`/blog/${post.slug}`)}
                  className="inline-flex items-center gap-1 font-semibold text-[#0E3B3A] dark:text-[#F2A900] hover:underline cursor-pointer"
                >
                  <span>Read article</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

interface BlogArticleProps {
  post: BlogPost;
  lang: LanguageMode;
  onNavigate: (path: string) => void;
}

export const BlogArticleView: React.FC<BlogArticleProps> = ({
  post,
  onNavigate,
}) => {
  return (
    <article className="py-12 sm:py-20">
      <div className="max-w-[820px] mx-auto px-4 sm:px-6 space-y-10">
        <div className="space-y-4 pb-8 border-b border-[#CFDAD6] dark:border-[#1F3835]">
          <button
            type="button"
            onClick={() => onNavigate('/blog')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E3B3A] dark:text-[#F2A900] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All articles</span>
          </button>

          <div className="flex flex-wrap items-center gap-2 text-xs text-[#12211F]/65 dark:text-[#F1F5F3]/65">
            <span className="font-semibold text-[#0E3B3A] dark:text-[#F2A900]">
              {post.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{post.publishedAt}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>
              By {post.author} ({post.authorRole})
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#12211F] dark:text-[#F1F5F3]">
            {post.title}
          </h1>
        </div>

        {/* Article Sections */}
        <div className="space-y-10">
          {post.sections.map((sec, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-[#12211F] dark:text-[#F1F5F3]">
                {sec.heading}
              </h2>
              {sec.paragraphs.map((p, pIdx) => (
                <p
                  key={pIdx}
                  className="text-base text-[#12211F]/85 dark:text-[#F1F5F3]/85 leading-relaxed"
                >
                  {p}
                </p>
              ))}

              {sec.callout && (
                <div className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#122220] border border-[#CFDAD6] dark:border-[#1F3835] space-y-1.5 my-4">
                  <p className="text-xs font-mono-tabular font-bold text-[#0E3B3A] dark:text-[#F2A900]">
                    {sec.callout.label}
                  </p>
                  <p className="text-sm font-medium text-[#12211F] dark:text-[#F1F5F3] leading-relaxed">
                    {sec.callout.text}
                  </p>
                </div>
              )}

              {sec.bullets && (
                <ul className="space-y-2.5 pl-5 list-disc text-sm sm:text-base text-[#12211F]/85 dark:text-[#F1F5F3]/85">
                  {sec.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="leading-relaxed">
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0E3B3A] dark:bg-[#122220] border border-[#1B5A57] text-[#F1F5F3] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-lg">
            <h3 className="font-display text-xl font-bold">
              Want to test this AI agent on your own business?
            </h3>
            <p className="text-sm text-[#F1F5F3]/80">
              Our Karachi team builds your first working demo free of charge in 72 hours.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate(`/services/${post.relatedServiceSlug}`)}
              className="px-4 py-2.5 rounded-lg text-xs font-semibold bg-[#1B5A57] text-[#F1F5F3] hover:bg-[#12211F] transition-colors cursor-pointer"
            >
              See service details
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/#contact')}
              className="px-4 py-2.5 rounded-lg text-xs font-semibold bg-[#F2A900] text-[#12211F] hover:bg-[#d99700] transition-colors cursor-pointer"
            >
              Book a free demo
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
