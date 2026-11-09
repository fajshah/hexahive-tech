export type LanguageMode = 'ru' | 'en';

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  city: string;
  whatsapp: string;
  whatsappClean: string;
  whatsappDefaultMessage: string;
  email: string;
  socials: {
    linkedin: string;
    instagram: string;
    github: string;
  };
  hero: {
    headline: string;
    subtext: {
      ru: string;
      en: string;
    };
    primaryCta: string;
    secondaryCta: string;
    locationLabel: {
      ru: string;
      en: string;
    };
  };
  metrics: Array<{
    value: string;
    label: {
      ru: string;
      en: string;
    };
    detail: {
      ru: string;
      en: string;
    };
  }>;
  processSteps: Array<{
    number: string;
    title: string;
    duration: string;
    description: {
      ru: string;
      en: string;
    };
    deliverable: {
      ru: string;
      en: string;
    };
  }>;
}

export const siteConfig: SiteConfig = {
  name: 'HexaHive Tech',
  shortName: 'HH',
  tagline: 'AI agents that answer calls, chats and leads for you.',
  city: 'Karachi, Pakistan',
  whatsapp: '+923153384425',
  whatsappClean: '923153384425',
  whatsappDefaultMessage:
    'Assalam-o-Alaikum HexaHive Tech team! Mujhe apne business ke liye free AI agent demo book karna hai.',
  email: 'hexahive@gmail.com',
  socials: {
    linkedin: 'https://linkedin.com/company/hexahive-tech',
    instagram: 'https://instagram.com/hexahive.tech',
    github: 'https://github.com/hexahive-tech',
  },
  hero: {
    headline: 'AI agents that answer calls, chats and leads for you.',
    subtext: {
      ru: 'Hum Karachi ki 6 agentic AI developers ki team hain. Aap ke business ke liye voice, WhatsApp aur sales agents banate hain jo 24/7 kaam karte hain.',
      en: 'We are a Karachi-based team of 6 agentic AI developers. We build custom voice, WhatsApp, and sales agents for your business that work 24/7 without missing a lead.',
    },
    primaryCta: 'Book a free demo',
    secondaryCta: 'See services',
    locationLabel: {
      ru: 'Karachi, Pakistan · 6 Specialized Agentic AI Engineers · First Demo Free',
      en: 'Karachi, Pakistan · 6 Specialized Agentic AI Engineers · First Demo Free',
    },
  },
  metrics: [
    {
      value: '< 3 sec',
      label: {
        ru: 'WhatsApp aur phone call pickup time',
        en: 'Average pickup & reply time on calls & WhatsApp',
      },
      detail: {
        ru: 'Raat 2 baje ya Sunday ko bhi customer wait nahi karega',
        en: 'Zero waiting even at 2 AM, weekends, or during load-shedding',
      },
    },
    {
      value: '3 Languages',
      label: {
        ru: 'Urdu, Roman Urdu aur English fluent agents',
        en: 'Fluent in Urdu, Roman Urdu & English',
      },
      detail: {
        ru: 'Voice notes aur Desi accents ko bilkul sahi samajhta hai',
        en: 'Understands local Pakistani accents, voice notes, and mixed phrasing',
      },
    },
    {
      value: '100% Free',
      label: {
        ru: 'Pehla working custom demo bilkul muft',
        en: 'First custom working demo is completely free',
      },
      detail: {
        ru: 'Pehle apne business data par chala kar dekhein, phir faisla karein',
        en: 'Test the agent on your own business scenarios before paying a rupee',
      },
    },
    {
      value: '7–10 Days',
      label: {
        ru: 'Discovery call se live deployment tak',
        en: 'From discovery call to live production launch',
      },
      detail: {
        ru: 'CRM, Google Sheets aur WhatsApp Business API ke sath connected',
        en: 'Integrated directly with your WhatsApp Business API, CRM, or Google Sheets',
      },
    },
  ],
  processSteps: [
    {
      number: '01',
      title: 'Discovery',
      duration: 'Day 1 (20 min call)',
      description: {
        ru: 'Hum aap ke business ki daily calls, WhatsApp queries aur sales flow samajhte hain — kahan leads drop ho rahi hain aur team ka waqt kahan zaya ho raha hai.',
        en: 'We map your daily inbound calls, WhatsApp inquiries, and sales bottlenecks to see exactly where leads drop off and where your staff loses hours.',
      },
      deliverable: {
        ru: 'Clear scope + agent workflow blueprint',
        en: 'Clear scope + custom agent workflow blueprint',
      },
    },
    {
      number: '02',
      title: 'Demo (Free)',
      duration: 'Days 2–4 (PKR 0 cost)',
      description: {
        ru: 'Pehla demo bilkul free hota hai. Hum aap ke asli FAQs, pricing aur products par ek working AI agent tayyar karte hain jisay aap khud phone ya WhatsApp kar ke test karte hain.',
        en: 'Your first demo is 100% free. We build a working prototype trained on your actual FAQs, prices, and catalog that you can call or message on WhatsApp yourself.',
      },
      deliverable: {
        ru: 'Live testable WhatsApp / Voice prototype',
        en: 'Live testable WhatsApp or Voice agent link',
      },
    },
    {
      number: '03',
      title: 'Launch',
      duration: 'Days 5–10',
      description: {
        ru: 'Jab aap demo se mutmain hon, hum agent ko aap ke official WhatsApp number, phone line, Shopify/WooCommerce store aur Google Sheets/CRM se connect kar ke live kar dete hain.',
        en: 'Once you approve the demo, we connect the agent to your official WhatsApp Business number, phone line, store, and Google Sheets or CRM.',
      },
      deliverable: {
        ru: 'Full production integration + staff handover',
        en: 'Full production deployment + team dashboard',
      },
    },
    {
      number: '04',
      title: 'Monthly care',
      duration: 'Ongoing 24/7 monitoring',
      description: {
        ru: 'Har hafte hum conversations review karte hain, naye offers/stock update karte hain, aur ensure karte hain ke agent bina ruke 24/7 behtareen jawab deta rahe.',
        en: 'Every week our Karachi engineers review transcripts, update your new stock or offers, fine-tune prompts, and monitor uptime 24/7.',
      },
      deliverable: {
        ru: 'Weekly performance report + unlimited prompt updates',
        en: 'Weekly conversion reports + prompt tuning',
      },
    },
  ],
};

export function getWhatsAppUrl(customMessage?: string): string {
  const msg = encodeURIComponent(customMessage || siteConfig.whatsappDefaultMessage);
  return `https://wa.me/${siteConfig.whatsappClean}?text=${msg}`;
}
