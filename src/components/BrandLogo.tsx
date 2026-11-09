import React, { useId } from 'react';

interface BrandLogoMarkProps {
  className?: string;
}

// Exact outer silhouette polygon of the 6-hexagon + upward arrow emblem in /assets/aistudio/image_0231e1d8.png (1408x768)
export const EMBLEM_CLIP_POLYGON =
  '704,109 777,151 777,196 815,174 880,174 869,207 880,214 880,289 845,311 880,333 880,415 816,452 777,430 777,470 704,512 630,470 630,430 591,452 527,415 527,333 562,311 527,289 527,214 591,177 630,199 630,151';

export const BrandLogoMark: React.FC<BrandLogoMarkProps> = ({
  className = 'w-10 h-10',
}) => {
  const clipId = useId();

  return (
    <svg
      viewBox="515 100 378 422"
      className={`${className} shrink-0 select-none overflow-visible drop-shadow-[0_3px_6px_rgba(14,59,58,0.28)]`}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <polygon points={EMBLEM_CLIP_POLYGON} />
        </clipPath>
      </defs>
      <image
        href="/assets/aistudio/image_0231e1d8.png"
        x="0"
        y="0"
        width="1408"
        height="768"
        clipPath={`url(#${clipId})`}
        preserveAspectRatio="xMidYMid slice"
      />
    </svg>
  );
};

interface WhatsAppLogoProps {
  className?: string;
}

/**
 * Crisp vector WhatsApp logo icon
 */
export const WhatsAppLogo: React.FC<WhatsAppLogoProps> = ({
  className = 'w-5 h-5',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`${className} shrink-0`}
    aria-hidden="true"
  >
    <path d="M12.031 2C6.508 2 2.023 6.484 2.023 12.005c0 1.766.461 3.49 1.337 5.01L2 22l5.122-1.343a9.974 9.974 0 0 0 4.909 1.298h.004c5.522 0 10.007-4.484 10.007-10.005C22.042 6.484 17.553 2 12.031 2Zm5.845 14.147c-.246.693-1.434 1.326-1.988 1.409-.508.076-1.15.108-1.856-.116-.428-.136-.978-.318-1.682-.622-2.96-1.277-4.893-4.262-5.041-4.459-.148-.197-1.204-1.602-1.204-3.056 0-1.454.762-2.169 1.032-2.465.271-.296.59-.37.787-.37.197 0 .394.002.566.01.182.009.426-.069.666.508.246.592.836 2.046.909 2.194.074.148.123.321.025.518-.098.197-.148.321-.295.493-.148.173-.311.385-.443.518-.148.148-.302.309-.13.604.172.296.765 1.262 1.642 2.044 1.128 1.006 2.079 1.318 2.375 1.466.295.148.468.123.64-.074.172-.197.738-.862.935-1.158.197-.296.394-.246.664-.148.271.098 1.722.813 2.018.961.295.148.492.222.566.345.074.123.074.715-.172 1.408Z" />
  </svg>
);
