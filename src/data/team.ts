export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  devOrder?: string;
  isLead?: boolean;
  /**
   * Optional photo URL. Leave empty ('') to show the 3D hexagon initials avatar.
   * When you have a real photo, set e.g. photoUrl: '/team/syeda-farzana.jpg'
   */
  photoUrl?: string;
  skill: {
    ru: string;
    en: string;
  };
  specialtyTag: string;
}

/**
 * HexaHive Tech Team — Karachi, Pakistan
 * To replace any initial avatar with a real photo later, simply add the image path to `photoUrl`.
 */
export const teamMembers: TeamMember[] = [
  {
    id: 'syeda-farzana-shah',
    name: 'Syeda Farzana Shah',
    role: 'Team Lead',
    initials: 'SF',
    isLead: true,
    photoUrl: '',
    specialtyTag: 'AI Architecture & Delivery Lead',
    skill: {
      ru: 'Multi-agent AI systems ki architecture design karti hain aur har client project ko discovery se live launch tak lead karti hain.',
      en: 'Architects production multi-agent AI systems and leads every client deployment from discovery to launch.',
    },
  },
  {
    id: 'usama',
    name: 'Usama',
    role: 'Agentic AI Developer',
    initials: 'US',
    devOrder: '01',
    photoUrl: '',
    specialtyTag: 'Full-Stack & Embedded Web AI',
    skill: {
      ru: 'High-speed websites aur HR screening agents banate hain jin mein built-in AI sales aur automation pehle din se kaam karti hai.',
      en: 'Builds high-converting web platforms and HR screening agents with deeply embedded AI chat and automation.',
    },
  },
  {
    id: 'maida',
    name: 'Maida',
    role: 'Agentic AI Developer',
    initials: 'MD',
    devOrder: '02',
    photoUrl: '',
    specialtyTag: 'WhatsApp Cloud & Sales Flows',
    skill: {
      ru: 'WhatsApp Cloud API, Urdu voice-note transcription aur automated catalog checkout flows ki specialist hain.',
      en: 'Specializes in Meta WhatsApp Cloud API, Urdu voice-note understanding, and automated sales workflows.',
    },
  },
  {
    id: 'areesha',
    name: 'Areesha',
    role: 'Agentic AI Developer',
    initials: 'AR',
    devOrder: '03',
    photoUrl: '',
    specialtyTag: 'Voice AI & Telephony',
    skill: {
      ru: 'Sub-second Urdu aur English voice receptionists banati hain jo phone line par bilkul insaan ki tarah baat karte hain.',
      en: 'Builds sub-second Urdu and English voice receptionists that sound natural over Pakistani phone lines.',
    },
  },
  {
    id: 'warda',
    name: 'Warda',
    role: 'Agentic AI Developer',
    initials: 'WD',
    devOrder: '04',
    photoUrl: '',
    specialtyTag: 'CRM & Real Estate Agents',
    skill: {
      ru: 'Real estate aur service businesses ke AI agents ko Google Sheets, HubSpot aur Zoho CRM ke sath real-time sync karti hain.',
      en: 'Connects AI qualification agents directly to Google Sheets, HubSpot, Zoho, and real estate inventory systems.',
    },
  },
  {
    id: 'fatima',
    name: 'Fatima',
    role: 'Agentic AI Developer',
    initials: 'FT',
    devOrder: '05',
    photoUrl: '',
    specialtyTag: 'E-Commerce & Roman Urdu NLP',
    skill: {
      ru: 'Shopify/WooCommerce COD confirmation agents aur natural Roman Urdu sales conversations train karti hain.',
      en: 'Engineers Shopify and WooCommerce COD verification agents and fine-tunes Roman Urdu sales conversations.',
    },
  },
];
