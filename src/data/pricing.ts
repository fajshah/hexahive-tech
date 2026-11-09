export interface PricingPlan {
  id: string;
  name: string;
  featured?: boolean;
  setupFeePkr: string;
  monthlyFeePkr: string;
  bestFor: {
    ru: string;
    en: string;
  };
  summary: {
    ru: string;
    en: string;
  };
  features: {
    ru: string[];
    en: string[];
  };
  ctaLabel: string;
}

/**
 * Pricing configuration in PKR — easy to edit setup fee + monthly fee in one file.
 */
export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    featured: false,
    setupFeePkr: 'PKR 45,000',
    monthlyFeePkr: 'PKR 18,000 / mo',
    bestFor: {
      ru: 'Clinics, salons, small stores aur single-channel WhatsApp ya Web chat ke liye',
      en: 'Best for clinics, salons, boutiques, and single-channel WhatsApp or Web automation',
    },
    summary: {
      ru: 'Ek dedicated AI agent jo 24/7 FAQs, bookings aur lead capture sambhalta hai.',
      en: 'One dedicated AI agent handling 24/7 FAQs, appointment booking, and lead capture.',
    },
    features: {
      ru: [
        '1 Custom AI Agent (WhatsApp ya Website Chat)',
        'Up to 1,500 customer conversations / month',
        'Roman Urdu + English + Urdu voice note support',
        'Instant lead export to Google Sheets & WhatsApp group',
        'First working demo 100% free before setup fee',
      ],
      en: [
        '1 Custom AI Agent (WhatsApp or Website Chat)',
        'Up to 1,500 customer conversations / month',
        'Roman Urdu, English & Urdu voice note support',
        'Instant lead sync to Google Sheets & WhatsApp group',
        'First working demo 100% free before setup fee',
      ],
    },
    ctaLabel: 'Book Starter demo',
  },
  {
    id: 'growth',
    name: 'Growth',
    featured: true,
    setupFeePkr: 'PKR 85,000',
    monthlyFeePkr: 'PKR 35,000 / mo',
    bestFor: {
      ru: 'Growing e-commerce brands, real estate agencies aur busy service businesses ke liye',
      en: 'Best for growing e-commerce brands, real estate agencies, and high-volume sales teams',
    },
    summary: {
      ru: 'Voice + WhatsApp agents CRM/Shopify integration aur automated follow-ups ke sath.',
      en: 'Voice + WhatsApp agents with Shopify/CRM sync, catalog lookup, and automated follow-ups.',
    },
    features: {
      ru: [
        '2 AI Agents (e.g. Voice Receptionist + WhatsApp Sales)',
        'Up to 5,000 conversations or 1,200 voice minutes / mo',
        'Shopify, WooCommerce, Zoho ya HubSpot live integration',
        'Automated COD order confirmation & warm lead follow-ups',
        'Weekly prompt tuning & conversation audit by Karachi team',
      ],
      en: [
        '2 AI Agents (e.g. Voice Receptionist + WhatsApp Sales)',
        'Up to 5,000 conversations or 1,200 voice minutes / mo',
        'Live Shopify, WooCommerce, Zoho, or HubSpot integration',
        'Automated COD order verification & warm lead follow-ups',
        'Weekly prompt tuning & transcript review by our Karachi team',
      ],
    },
    ctaLabel: 'Book Growth demo',
  },
  {
    id: 'custom',
    name: 'Custom',
    featured: false,
    setupFeePkr: 'PKR 160,000+',
    monthlyFeePkr: 'PKR 65,000+ / mo',
    bestFor: {
      ru: 'Builders, hospitals, multi-branch franchises aur enterprise workflows ke liye',
      en: 'Best for developers/builders, hospitals, multi-branch retail, and custom ERP workflows',
    },
    summary: {
      ru: 'Multi-agent systems custom APIs, outbound calling campaigns aur dedicated engineer ke sath.',
      en: 'Full multi-agent system with outbound voice campaigns, custom ERP APIs, and SLA support.',
    },
    features: {
      ru: [
        'Unlimited custom AI agents (Voice, WhatsApp, HR, Web)',
        'High-volume inbound + outbound calling lines',
        'Custom database, ERP, ya hospital management integration',
        'Dedicated HexaHive engineer on slack/WhatsApp channel',
        'Custom SLA, data privacy controls & on-site Karachi workshop',
      ],
      en: [
        'Multi-agent architecture (Voice, WhatsApp, HR & Web)',
        'High-volume inbound & outbound calling lines',
        'Custom database, ERP, or hospital system integration',
        'Dedicated HexaHive engineer in your WhatsApp/Slack channel',
        'Custom SLA, security compliance & on-site Karachi workshop',
      ],
    },
    ctaLabel: 'Request custom scope',
  },
];
