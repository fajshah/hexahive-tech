import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Crown, Sparkles, Code2 } from 'lucide-react';
import { TeamMember } from '../data/team';
import { LanguageMode } from '../data/site';
import { Tilt3DCard } from './Tilt3DCard';

interface HexAvatarProps {
  member: TeamMember;
  lang: LanguageMode;
  index?: number;
}

export const HexAvatar: React.FC<HexAvatarProps> = ({
  member,
  lang,
  index = 0,
}) => {
  const [imageError, setImageError] = useState(false);
  const isLead = Boolean(member.isLead);
  const showPhoto = Boolean(member.photoUrl && !imageError);

  return (
    <Tilt3DCard
      intensity={isLead ? 5 : 9}
      delay={index * 0.05}
      className={`group rounded-2xl transition-colors duration-300 ${
        isLead
          ? 'md:col-span-3 bg-gradient-to-br from-[#0E3B3A] via-[#122F2E] to-[#0B1E1D] text-[#F1F5F3] p-6 sm:p-8 border-2 border-[#F2A900] shadow-[0_24px_50px_-15px_rgba(242,169,0,0.3)]'
          : 'bg-[#FFFFFF] dark:bg-[#122220] text-[#12211F] dark:text-[#F1F5F3] p-6 border border-[#CFDAD6] dark:border-[#1F3835] hover:border-[#F2A900] shadow-[0_14px_32px_-12px_rgba(18,33,31,0.14)]'
      }`}
    >
      {/* Subtle 3D top specular highlight bar */}
      <div
        className={`pointer-events-none absolute inset-x-6 top-0 h-[1px] ${
          isLead
            ? 'bg-gradient-to-r from-transparent via-[#F2A900] to-transparent opacity-90'
            : 'bg-gradient-to-r from-transparent via-[#CFDAD6] dark:via-[#F2A900]/40 to-transparent opacity-60'
        }`}
      />

      <div
        className={`flex preserve-3d ${
          isLead
            ? 'flex-col md:flex-row md:items-center gap-6 sm:gap-8'
            : 'items-start gap-4 sm:gap-5'
        }`}
      >
        {/* 3D Layered Architectural Hexagon Avatar floating in Z-space */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 3.8 + index * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ transform: 'translateZ(28px)' }}
          className={`relative shrink-0 select-none transition-transform duration-300 group-hover:scale-105 ${
            isLead ? 'w-24 h-24 sm:w-28 sm:h-28' : 'w-16 h-16 sm:w-20 sm:h-20'
          }`}
        >
          {/* Ambient 3D Pedestal Glow under Hexagon */}
          <div
            className={`absolute -inset-2 hex-clip blur-md transition-opacity duration-300 ${
              isLead
                ? 'bg-[#F2A900]/45 opacity-90'
                : 'bg-[#F2A900]/25 opacity-0 group-hover:opacity-100'
            }`}
            aria-hidden="true"
          />

          {/* 3D Extruded Bottom Shadow Layer (gives physical thickness) */}
          <div
            className={`absolute inset-0 translate-y-1.5 hex-clip ${
              isLead ? 'bg-[#8F6300]' : 'bg-[#092423] dark:bg-[#050C0B]'
            }`}
            aria-hidden="true"
          />

          {/* Outer Beveled Rim */}
          <div
            className={`relative w-full h-full hex-clip p-[3px] ${
              isLead
                ? 'bg-gradient-to-b from-[#FFE082] via-[#F2A900] to-[#B37B00]'
                : 'bg-gradient-to-b from-[#E2ECE9] via-[#CFDAD6] to-[#8FA6A0] dark:from-[#2C5450] dark:via-[#1F3835] dark:to-[#0E3B3A] group-hover:from-[#FFE082] group-hover:via-[#F2A900] group-hover:to-[#B37B00]'
            }`}
          >
            {/* Middle recessed groove */}
            <div className="w-full h-full hex-clip bg-[#0B1514] p-[2px]">
              {/* Inner 3D Core Chamber (Initials or Swappable Photo) */}
              <div
                className={`relative w-full h-full hex-clip flex flex-col items-center justify-center overflow-hidden ${
                  isLead
                    ? 'bg-gradient-to-br from-[#1B5A57] via-[#0E3B3A] to-[#081F1E]'
                    : 'bg-gradient-to-br from-[#164A48] via-[#0E3B3A] to-[#092221]'
                }`}
              >
                {/* Top-left 3D glass reflection overlay */}
                <div
                  className="pointer-events-none absolute -top-1/2 -left-1/2 w-full h-full rotate-45 bg-gradient-to-b from-white/20 to-transparent"
                  aria-hidden="true"
                />

                {showPhoto ? (
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <>
                    <span
                      className={`font-display font-extrabold tracking-wider leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] ${
                        isLead
                          ? 'text-2xl sm:text-3xl text-[#F2A900]'
                          : 'text-lg sm:text-xl text-[#F1F5F3] group-hover:text-[#F2A900] transition-colors'
                      }`}
                    >
                      {member.initials}
                    </span>
                    <span className="mt-1 text-[9px] font-mono-tabular uppercase tracking-widest text-[#F2A900]/80">
                      {isLead ? 'LEAD' : 'AI DEV'}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Member Info */}
        <div
          className="space-y-2 min-w-0 flex-1"
          style={{ transform: 'translateZ(16px)' }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <h3
                className={`font-display font-bold leading-snug ${
                  isLead
                    ? 'text-2xl sm:text-3xl text-[#FFFFFF]'
                    : 'text-lg sm:text-xl text-[#12211F] dark:text-[#F1F5F3]'
                }`}
              >
                {member.name}
              </h3>

              {isLead && (
                <span className="inline-flex items-center gap-1.5 text-xs font-mono-tabular font-semibold text-[#F2A900]">
                  <Crown className="w-3.5 h-3.5 text-[#F2A900]" />
                  <span>Team Lead</span>
                </span>
              )}
            </div>

            {!isLead && (
              <span className="inline-flex items-center gap-1 text-xs font-mono-tabular font-semibold text-[#0E3B3A] dark:text-[#F2A900]">
                <Code2 className="w-3.5 h-3.5" />
                <span>
                  {member.devOrder ? `${member.devOrder} · ` : ''}
                  {member.initials}
                </span>
              </span>
            )}
          </div>

          <p
            className={`text-xs sm:text-sm font-semibold tracking-wide ${
              isLead
                ? 'text-[#F2A900]'
                : 'text-[#0E3B3A] dark:text-[#F2A900]'
            }`}
          >
            {member.role}
          </p>

          <p
            className={`text-sm leading-relaxed ${
              isLead
                ? 'text-[#F1F5F3]/90 max-w-3xl'
                : 'text-[#12211F]/80 dark:text-[#F1F5F3]/80'
            }`}
          >
            {member.skill[lang]}
          </p>

          {isLead && (
            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono-tabular text-[#F1F5F3]/75">
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F2A900]" />
                Multi-Agent Orchestration
              </span>
              <span>·</span>
              <span>Voice & WhatsApp Systems</span>
              <span>·</span>
              <span>Karachi Engineering Hub</span>
            </div>
          )}
        </div>
      </div>
    </Tilt3DCard>
  );
};
