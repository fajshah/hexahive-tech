import React, { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { servicesData, ServiceItem } from '../data/services';
import { LanguageMode } from '../data/site';
import { EMBLEM_CLIP_POLYGON } from './BrandLogo';

interface HeroHoneycombProps {
  lang: LanguageMode;
  onSelectService: (slug: string) => void;
}

// Flat-top hexagon points generator around (cx, cy) with radius R
function getHexPoints(cx: number, cy: number, r: number): string {
  const angles = [0, 60, 120, 180, 240, 300];
  return angles
    .map((deg) => {
      const rad = (Math.PI / 180) * deg;
      const x = cx + r * Math.cos(rad);
      const y = cy + r * Math.sin(rad);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

export const HeroHoneycomb: React.FC<HeroHoneycombProps> = ({
  lang,
  onSelectService,
}) => {
  const [suiteMode, setSuiteMode] = useState<'core' | 'extended'>('core');
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const stageRef = useRef<HTMLDivElement>(null);

  // Interactive 3D Mouse Tilt Rig for the Honeycomb Stage
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 180, damping: 20, mass: 0.7 });
  const smoothY = useSpring(mouseY, { stiffness: 180, damping: 20, mass: 0.7 });

  const stageRotateX = useTransform(smoothY, [0, 1], [11, -11]);
  const stageRotateY = useTransform(smoothX, [0, 1], [-11, 11]);

  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(Math.max(0, Math.min(1, x)));
    mouseY.set(Math.max(0, Math.min(1, y)));
  };

  const handleStageMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Switch between Services 1–6 (Core AI Suite) and Services 5–10 (Industry & Web Suite)
  const displayedServices: ServiceItem[] =
    suiteMode === 'core' ? servicesData.slice(0, 6) : servicesData.slice(4, 10);

  const center = { x: 250, y: 235 };
  const hexRadius = 60;
  const ringDistance = 116;

  // 6 outer positions at angles: -90 (top), -30 (top-right), 30 (bottom-right), 90 (bottom), 150 (bottom-left), 210 (top-left)
  const outerAngles = [-90, -30, 30, 90, 150, 210];
  const outerPositions = outerAngles.map((deg) => {
    const rad = (Math.PI / 180) * deg;
    return {
      x: center.x + ringDistance * Math.cos(rad),
      y: center.y + ringDistance * Math.sin(rad),
    };
  });

  const activeService: ServiceItem =
    activeIndex !== null && displayedServices[activeIndex]
      ? displayedServices[activeIndex]
      : displayedServices[0];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Suite Switcher so all 10 services can be explored in the 6-cell 3D Honeycomb */}
      <div className="w-full max-w-[490px] mb-3 flex items-center justify-between gap-2 px-1">
        <span className="text-[11px] font-mono-tabular font-semibold tracking-wider text-[#12211F]/65 dark:text-[#F1F5F3]/65">
          3D HONEYCOMB ENGINE (10 SERVICES)
        </span>
        <div
          className="inline-flex items-center p-0.5 rounded-lg bg-[#FFFFFF] dark:bg-[#122220] border border-[#CFDAD6] dark:border-[#1F3835]"
          role="tablist"
          aria-label="Honeycomb service suite selector"
        >
          <button
            type="button"
            role="tab"
            aria-selected={suiteMode === 'core'}
            onClick={() => {
              setSuiteMode('core');
              setActiveIndex(0);
            }}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono-tabular font-semibold transition-colors cursor-pointer ${
              suiteMode === 'core'
                ? 'bg-[#0E3B3A] text-[#F1F5F3] dark:bg-[#F2A900] dark:text-[#12211F]'
                : 'text-[#12211F]/70 dark:text-[#F1F5F3]/70 hover:text-[#12211F] dark:hover:text-[#F1F5F3]'
            }`}
          >
            01–06 Core AI
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={suiteMode === 'extended'}
            onClick={() => {
              setSuiteMode('extended');
              setActiveIndex(0);
            }}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono-tabular font-semibold transition-colors cursor-pointer ${
              suiteMode === 'extended'
                ? 'bg-[#0E3B3A] text-[#F1F5F3] dark:bg-[#F2A900] dark:text-[#12211F]'
                : 'text-[#12211F]/70 dark:text-[#F1F5F3]/70 hover:text-[#12211F] dark:hover:text-[#F1F5F3]'
            }`}
          >
            05–10 Industry & Web
          </button>
        </div>
      </div>

      {/* 3D Interactive Perspective Honeycomb Stage */}
      <motion.div
        ref={stageRef}
        onMouseMove={handleStageMouseMove}
        onMouseLeave={handleStageMouseLeave}
        style={{
          rotateX: stageRotateX,
          rotateY: stageRotateY,
          transformPerspective: 1200,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full max-w-[490px] aspect-[500/470] select-none flex items-center justify-center"
      >
        {/* 3D Tilted Orbital Gyro Rings behind the Honeycomb */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute w-[92%] h-[92%] rounded-full border border-dashed border-[#0E3B3A]/25 dark:border-[#F2A900]/30 animate-orbit-3d"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute w-[78%] h-[78%] rounded-full border border-[#F2A900]/35 dark:border-[#1B5A57]/60 animate-orbit-3d-reverse"
        />

        {/* Continuous 3D Floating Wrapper */}
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full"
          style={{ transform: 'translateZ(22px)' }}
        >
          <svg
            viewBox="0 0 500 470"
            className="w-full h-full overflow-visible"
            role="group"
            aria-label="Interactive HexaHive Tech 3D Honeycomb Service Map"
          >
            <defs>
              {/* 3D Drop Shadow */}
              <filter id="hex3dShadow" x="-20%" y="-20%" width="140%" height="150%">
                <feDropShadow dx="0" dy="10" stdDeviation="7" floodColor="#081413" floodOpacity="0.26" />
              </filter>
              <filter id="honeyGlow" x="-25%" y="-25%" width="150%" height="150%">
                <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#F2A900" floodOpacity="0.45" />
              </filter>

              {/* 3D Gradients */}
              <linearGradient id="honeyActiveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD25A" />
                <stop offset="50%" stopColor="#F2A900" />
                <stop offset="100%" stopColor="#C88400" />
              </linearGradient>

              <linearGradient id="centerTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1B5A57" />
                <stop offset="60%" stopColor="#0E3B3A" />
                <stop offset="100%" stopColor="#072221" />
              </linearGradient>

              {/* Clip path for the uploaded official 3D HexaHive emblem */}
              <clipPath id="heroBrandEmblemClip">
                <polygon points={EMBLEM_CLIP_POLYGON} />
              </clipPath>
            </defs>

            {/* Connecting radial circuit traces + animated 3D data pulses */}
            {outerPositions.map((pos, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <g key={`line-${idx}`}>
                  <line
                    x1={center.x}
                    y1={center.y}
                    x2={pos.x}
                    y2={pos.y}
                    stroke={isSelected ? '#F2A900' : 'var(--border)'}
                    strokeWidth={isSelected ? '3' : '1.75'}
                    strokeDasharray={isSelected ? 'none' : '4 4'}
                  />
                  {/* Traveling Energy Pulse Dot along the circuit */}
                  <motion.circle
                    r={isSelected ? 4 : 2.5}
                    fill="#F2A900"
                    initial={{ cx: center.x, cy: center.y, opacity: 0 }}
                    animate={{
                      cx: [center.x, pos.x],
                      cy: [center.y, pos.y],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      delay: idx * 0.32,
                      ease: 'easeInOut',
                    }}
                  />
                </g>
              );
            })}

            {/* 6 Outer Service Hexagons with 3D Extruded Depth & Spring Lift */}
            {displayedServices.map((service, idx) => {
              const pos = outerPositions[idx];
              const isSelected = activeIndex === idx;
              // 3D base extrusion shifted down
              const depthPoints = getHexPoints(pos.x, pos.y + (isSelected ? 9 : 6), hexRadius);
              const outerPoints = getHexPoints(pos.x, pos.y, hexRadius);
              const innerBevelPoints = getHexPoints(pos.x, pos.y, hexRadius - 5);

              const words = service.shortTitle.split(' ');
              const line1 = words.slice(0, Math.ceil(words.length / 2)).join(' ');
              const line2 = words.slice(Math.ceil(words.length / 2)).join(' ');

              return (
                <motion.g
                  key={service.slug}
                  initial={{ opacity: 0, scale: 0.78, y: 18 }}
                  animate={{
                    opacity: 1,
                    scale: isSelected ? 1.06 : 1,
                    y: isSelected ? -6 : 0,
                  }}
                  whileHover={{ scale: 1.08, y: -8 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{
                    type: 'spring',
                    stiffness: 280,
                    damping: 20,
                    delay: idx * 0.04,
                  }}
                  style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                  className="cursor-pointer group"
                  onMouseEnter={() => setActiveIndex(idx)}
                  onFocus={() => setActiveIndex(idx)}
                  onClick={() => onSelectService(service.slug)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${service.title} - Click to view service details`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectService(service.slug);
                    }
                  }}
                >
                  {/* 3D Bottom Extrusion Wall */}
                  <polygon
                    points={depthPoints}
                    fill={isSelected ? '#9A6500' : '#0E3B3A'}
                    opacity={isSelected ? 0.95 : 0.45}
                  />

                  {/* Main Hexagon Face */}
                  <polygon
                    points={outerPoints}
                    fill={isSelected ? 'url(#honeyActiveGrad)' : 'var(--surface)'}
                    stroke={isSelected ? '#F2A900' : 'var(--border)'}
                    strokeWidth={isSelected ? '2.5' : '2'}
                    filter={isSelected ? 'url(#honeyGlow)' : 'url(#hex3dShadow)'}
                    className="transition-colors duration-200"
                  />

                  {/* Top Inner 3D Bevel Rim */}
                  <polygon
                    points={innerBevelPoints}
                    fill="none"
                    stroke={isSelected ? '#FFF3C4' : 'var(--border)'}
                    strokeOpacity={isSelected ? '0.7' : '0.45'}
                    strokeWidth="1"
                  />

                  {/* Service Number Index */}
                  <text
                    x={pos.x}
                    y={pos.y - 19}
                    textAnchor="middle"
                    className="font-mono-tabular text-[11px] font-bold pointer-events-none"
                    fill={isSelected ? '#12211F' : '#F2A900'}
                  >
                    {service.index}
                  </text>

                  {/* Short Service Name Line 1 */}
                  <text
                    x={pos.x}
                    y={pos.y + 1}
                    textAnchor="middle"
                    className="font-display text-[12.5px] font-bold pointer-events-none"
                    fill={isSelected ? '#12211F' : 'var(--ink)'}
                  >
                    {line1}
                  </text>

                  {/* Short Service Name Line 2 */}
                  {line2 && (
                    <text
                      x={pos.x}
                      y={pos.y + 17}
                      textAnchor="middle"
                      className="font-display text-[12.5px] font-bold pointer-events-none"
                      fill={isSelected ? '#12211F' : 'var(--ink)'}
                    >
                      {line2}
                    </text>
                  )}

                  {/* Demand Star Dot if Hot */}
                  {service.demandTag && (
                    <circle
                      cx={pos.x + 24}
                      cy={pos.y - 23}
                      r="3.5"
                      fill={isSelected ? '#12211F' : '#F2A900'}
                    />
                  )}
                </motion.g>
              );
            })}

            {/* Center Core Hexagon featuring the Official Uploaded 3D HexaHive Emblem */}
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: [1, 1.03, 1] }}
              transition={{
                opacity: { duration: 0.4 },
                scale: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' },
              }}
              style={{ transformOrigin: `${center.x}px ${center.y}px` }}
            >
              {/* 3D Extruded Base */}
              <polygon
                points={getHexPoints(center.x, center.y + 8, hexRadius + 4)}
                fill="#061918"
              />
              <polygon
                points={getHexPoints(center.x, center.y, hexRadius + 4)}
                fill="url(#centerTealGrad)"
                stroke="#F2A900"
                strokeWidth="3"
                filter="url(#hex3dShadow)"
              />
              <polygon
                points={getHexPoints(center.x, center.y, hexRadius - 4)}
                fill="none"
                stroke="#F2A900"
                strokeOpacity="0.4"
                strokeWidth="1"
              />
              {/* Embedded Official 3D HexaHive Tech Emblem inside the Center Core */}
              <svg
                x={center.x - 42}
                y={center.y - 47}
                width="84"
                height="84"
                viewBox="515 100 378 422"
              >
                <image
                  href="/assets/aistudio/image_0231e1d8.png"
                  x="0"
                  y="0"
                  width="1408"
                  height="768"
                  clipPath="url(#heroBrandEmblemClip)"
                  preserveAspectRatio="xMidYMid slice"
                />
              </svg>
              <text
                x={center.x}
                y={center.y + 42}
                textAnchor="middle"
                className="font-mono-tabular text-[8.5px] tracking-[0.18em] uppercase font-bold"
                fill="#F2A900"
              >
                HEXAHIVE
              </text>
            </motion.g>
          </svg>
        </motion.div>
      </motion.div>

      {/* 3D Flip Live Preview Readout Bar below Honeycomb */}
      <div className="w-full max-w-[490px] mt-1 perspective-stage" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.slug}
            initial={{ opacity: 0, rotateX: -18, y: 8 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, rotateX: 18, y: -8 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="w-full p-4 rounded-xl bg-[#FFFFFF] dark:bg-[#122220] border border-[#CFDAD6] dark:border-[#1F3835] shadow-md"
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono-tabular text-xs font-bold text-[#F2A900]">
                  {activeService.index}
                </span>
                <span className="text-xs text-[#CFDAD6] dark:text-[#1F3835]">·</span>
                <span className="font-display font-bold text-sm text-[#12211F] dark:text-[#F1F5F3]">
                  {activeService.title}
                </span>
                {activeService.demandTag && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono-tabular font-semibold text-[#0E3B3A] dark:text-[#F2A900]">
                    <Sparkles className="w-3 h-3 text-[#F2A900]" />
                    {activeService.demandTag[lang]}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => onSelectService(activeService.slug)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0E3B3A] dark:text-[#F2A900] hover:underline shrink-0 cursor-pointer"
              >
                <span>Explore</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-[#12211F]/80 dark:text-[#F1F5F3]/80 leading-relaxed">
              {activeService.oneLiner[lang]}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
