import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface LeadRecord {
  id: string;
  name: string;
  business: string;
  phone: string;
  service: string;
  message: string;
  createdAt: string;
}

const submittedLeads: LeadRecord[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Contact Form -> Resend Email + Google Sheets Webhook
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, business, phone, service, message } = req.body || {};

      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        res.status(400).json({ ok: false, error: 'Please enter your name.' });
        return;
      }
      if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
        res.status(400).json({ ok: false, error: 'Please enter a valid phone or WhatsApp number.' });
        return;
      }

      const lead: LeadRecord = {
        id: `HH-${Date.now().toString().slice(-6)}`,
        name: name.trim(),
        business: (business || 'Not specified').trim(),
        phone: phone.trim(),
        service: (service || 'General AI Agent Inquiry').trim(),
        message: (message || '').trim(),
        createdAt: new Date().toISOString(),
      };

      submittedLeads.unshift(lead);

      const delivery = {
        resend: 'placeholder_ready',
        googleSheets: 'placeholder_ready',
      };

      // 1. Send email via Resend if RESEND_API_KEY is configured (and not placeholder)
      const resendKey = process.env.RESEND_API_KEY;
      if (resendKey && !resendKey.startsWith('re_placeholder')) {
        try {
          const emailRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${resendKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: process.env.CONTACT_FROM_EMAIL || 'HexaHive Leads <onboarding@resend.dev>',
              to: [process.env.CONTACT_NOTIFY_EMAIL || 'hexahive@gmail.com'],
              subject: `[HexaHive Lead ${lead.id}] ${lead.name} — ${lead.service}`,
              html: `
                <h2>New Demo Request — HexaHive Tech</h2>
                <p><strong>Lead ID:</strong> ${lead.id}</p>
                <p><strong>Name:</strong> ${lead.name}</p>
                <p><strong>Business:</strong> ${lead.business}</p>
                <p><strong>Phone / WhatsApp:</strong> ${lead.phone}</p>
                <p><strong>Service Requested:</strong> ${lead.service}</p>
                <p><strong>Message:</strong> ${lead.message || 'No additional message'}</p>
                <p><strong>Submitted At:</strong> ${lead.createdAt}</p>
              `,
            }),
          });
          delivery.resend = emailRes.ok ? 'sent' : 'error';
        } catch {
          delivery.resend = 'error';
        }
      }

      // 2. Append row to Google Sheets Webhook if GOOGLE_SHEETS_WEBHOOK_URL is configured
      const sheetsWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
      if (sheetsWebhook && !sheetsWebhook.includes('YOUR_DEPLOYMENT_ID')) {
        try {
          const sheetRes = await fetch(sheetsWebhook, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(lead),
          });
          delivery.googleSheets = sheetRes.ok ? 'logged' : 'error';
        } catch {
          delivery.googleSheets = 'error';
        }
      }

      res.status(200).json({
        ok: true,
        leadId: lead.id,
        delivery,
        message:
          'Shukriya! Aap ki demo request receive ho gayi hai. Hamari Karachi team 2 ghante ke andar WhatsApp par rabta karegi.',
      });
    } catch {
      res.status(500).json({
        ok: false,
        error: 'Something went wrong while saving your request. Please try WhatsApp directly.',
      });
    }
  });

  // API Route: "Ask our agent" Corner Chat Widget
  app.post('/api/chat', async (req, res) => {
    const { message, lang } = req.body || {};
    const q = String(message || '').toLowerCase();
    const isEnglish = lang === 'en';

    let reply = '';
    let suggestedAction: { label: string; href: string } | null = null;

    if (q.includes('price') || q.includes('cost') || q.includes('pkr') || q.includes('kharcha') || q.includes('rate') || q.includes('plan')) {
      reply = isEnglish
        ? 'Our plans start with Starter (PKR 45,000 one-time setup + PKR 18,000/month for 1 AI agent) and Growth (PKR 85,000 setup + PKR 35,000/month for Voice + WhatsApp + CRM sync). Remember: your first custom working demo is 100% free before you pay anything!'
        : 'Hamara Starter plan PKR 45,000 setup + PKR 18,000/month se shuru hota hai (1 AI Agent), aur Growth plan PKR 85,000 setup + PKR 35,000/month hai (Voice + WhatsApp + Shopify/CRM). Sab se achi baat: pehla working demo bilkul FREE hai!';
      suggestedAction = { label: 'View PKR Pricing', href: '/#pricing' };
    } else if (q.includes('receptionist') || q.includes('voice') || q.includes('call') || q.includes('phone') || q.includes('clinic')) {
      reply = isEnglish
        ? 'Our AI Receptionist picks up incoming phone calls in under 2 seconds, speaks natural Urdu and English, answers fee/timing FAQs, and books appointments directly into Google Calendar.'
        : 'Hamara AI Receptionist har phone call 2 second mein uthata hai, bilkul natural Urdu aur English mein baat karta hai, aur Google Calendar mein appointment lock kar ke WhatsApp confirmation bhejta hai.';
      suggestedAction = { label: 'Explore AI Receptionist', href: '/services/ai-receptionist' };
    } else if (q.includes('whatsapp') || q.includes('voice note') || q.includes('meta') || q.includes('ad')) {
      reply = isEnglish
        ? 'Our WhatsApp Sales Agent connects to your official WhatsApp Business number, understands Urdu voice notes and product images, qualifies leads 24/7, and logs every hot buyer to Google Sheets.'
        : 'Hamara WhatsApp Sales Agent aap ke Meta Ads se aane wale messages aur Urdu voice notes ko sun kar 3 second mein jawab deta hai, catalog share karta hai aur qualified leads Google Sheet mein save karta hai.';
      suggestedAction = { label: 'Explore WhatsApp Agent', href: '/services/whatsapp-sales-agent' };
    } else if (q.includes('real estate') || q.includes('property') || q.includes('plot') || q.includes('flat') || q.includes('builder')) {
      reply = isEnglish
        ? 'For Real Estate agencies and builders in Karachi, Lahore & Islamabad, our agent qualifies buyers by budget and cash/installment plan, sends PDF floor plans, and books Zoom calls for Overseas Pakistanis 24/7.'
        : 'Real Estate builders aur dealers ke liye hamara agent buyers ka budget aur payment plan qualify karta hai, floor plans PDF bhejta hai, aur UK/Dubai ke Overseas investors ke liye 24/7 Zoom ya site visit book karta hai.';
      suggestedAction = { label: 'Explore Real Estate AI', href: '/services/real-estate-agent' };
    } else if (q.includes('shopify') || q.includes('ecommerce') || q.includes('cod') || q.includes('order') || q.includes('parcel')) {
      reply = isEnglish
        ? 'Our E-commerce Agent connects to Shopify & WooCommerce to verify Cash-on-Delivery (COD) orders automatically, fix incomplete Pakistani street addresses, and answer TCS/Leopards/PostEx tracking queries.'
        : 'Hamara E-commerce Agent Shopify/WooCommerce par aane wale COD orders ko foran confirm karta hai, adhoore addresses mein landmark add karwata hai, aur TCS/Leopards/PostEx tracking khud batata hai.';
      suggestedAction = { label: 'Explore E-Commerce AI', href: '/services/ecommerce-agent' };
    } else if (q.includes('hr') || q.includes('cv') || q.includes('hiring') || q.includes('interview') || q.includes('job')) {
      reply = isEnglish
        ? 'Our AI HR Agent screens CVs, conducts 5-minute automated WhatsApp/voice screening interviews (checking salary expectations and notice period), and hands you a ranked shortlist in Google Sheets.'
        : 'Hamara AI HR Agent ratusan CVs screen karta hai, WhatsApp aur voice par candidate se salary aur notice period poochta hai, aur top 10% candidates ki shortlist Google Sheet mein de deta hai.';
      suggestedAction = { label: 'Explore AI HR Agent', href: '/services/ai-hr-agent' };
    } else if (q.includes('safeher') || q.includes('safety') || q.includes('women') || q.includes('transport') || q.includes('sos')) {
      reply = isEnglish
        ? 'SafeHer B2B is our corporate women safety & commute guardian AI for software houses, BPOs, hospitals, and universities—automating night-shift arrival check-ins and 1-second SOS escalation.'
        : 'SafeHer B2B corporate offices, BPOs aur hospitals ki female staff ke liye automated night-shift commute check-ins, live SOS escalation aur confidential workplace safety compliance provide karta hai.';
      suggestedAction = { label: 'Explore SafeHer B2B', href: '/services/safeher-b2b' };
    } else if (q.includes('restaurant') || q.includes('food') || q.includes('cafe') || q.includes('menu') || q.includes('table')) {
      reply = isEnglish
        ? 'Our Restaurant AI Manager takes direct food orders on WhatsApp & voice calls (saving you 28-30% aggregator commission), books family/rooftop tables, and prints Kitchen Order Tickets.'
        : 'Hamara Restaurant AI Manager WhatsApp aur phone call par direct food orders leta hai (bina 30% delivery app commission ke), table reserve karta hai aur seedha kitchen POS mein order bhejta hai.';
      suggestedAction = { label: 'Explore Restaurant AI', href: '/services/restaurant-ai-manager' };
    } else if (q.includes('education') || q.includes('school') || q.includes('college') || q.includes('university') || q.includes('admission') || q.includes('student')) {
      reply = isEnglish
        ? 'Our Education AI Agent automates 24/7 admissions counseling, merit scholarship calculations, campus tour bookings, and parent fee challan reminders for schools, academies, and study-abroad firms.'
        : 'Education AI Agent schools, colleges, academies aur study-abroad consultants ke liye 24/7 admissions counseling, merit scholarship calculation aur fee challan reminders sambhalta hai.';
      suggestedAction = { label: 'Explore Education AI', href: '/services/education-ai-agent' };
    } else if (q.includes('legal') || q.includes('law') || q.includes('contract') || q.includes('agreement') || q.includes('secp') || q.includes('fbr') || q.includes('doc')) {
      reply = isEnglish
        ? 'Our Legal & Documentation Agent automates client intake, drafts commercial agreements (tenancy deeds, NDAs, employment contracts), and collects CNIC/NTN checklists for SECP & FBR filings.'
        : 'Hamara Legal / Documentation Agent rent agreements, NDAs, employment contracts ke first drafts 60 second mein tayyar karta hai aur SECP/FBR filings ke liye CNIC/NTN documents collect karta hai.';
      suggestedAction = { label: 'Explore Legal & Docs AI', href: '/services/legal-documentation-agent' };
    } else if (q.includes('website') || q.includes('web') || q.includes('portal') || q.includes('nextjs')) {
      reply = isEnglish
        ? 'We engineer high-speed Next.js/React websites and custom portals (95+ Lighthouse score) with a trained AI sales & quote agent built in from day one.'
        : 'Hum 95+ Lighthouse speed wali Next.js/React websites aur custom portals banate hain jin mein aap ke business ka trained AI sales agent pehle din se built-in hota hai.';
      suggestedAction = { label: 'Explore AI Websites', href: '/services/ai-websites' };
    } else if (q.includes('demo') || q.includes('free') || q.includes('test') || q.includes('start')) {
      reply = isEnglish
        ? 'Booking a demo is 100% free! Share your business type and WhatsApp number in our contact form, and our Karachi team led by Syeda Farzana Shah will build a working prototype in 3 days.'
        : 'Pehla custom demo 100% FREE hai! Aap bas apna WhatsApp number aur business details form mein dein — Syeda Farzana Shah aur hamari Karachi team 3 din mein aap ke data par working agent bana kar degi.';
      suggestedAction = { label: 'Book Free Demo', href: '/#contact' };
    } else {
      reply = isEnglish
        ? 'Assalam-o-Alaikum! I am the HexaHive Tech AI assistant. We build 10 specialized solutions in Karachi: 1) AI Voice Receptionist, 2) WhatsApp Sales Agent, 3) Real Estate AI, 4) AI HR Agent, 5) SafeHer B2B, 6) Restaurant AI Manager, 7) E-Commerce AI, 8) Education AI, 9) Legal/Docs Agent, and 10) AI Websites. Which one would you like to explore?'
        : 'Assalam-o-Alaikum! Main HexaHive Tech ka AI agent hoon. Hum Karachi mein 10 specialized solutions banate hain: 1) AI Receptionist, 2) WhatsApp Sales, 3) Real Estate AI, 4) AI HR, 5) SafeHer B2B, 6) Restaurant AI Manager, 7) E-Commerce AI, 8) Education AI, 9) Legal/Docs Agent, aur 10) AI Websites. Aap kis ke bare mein janna chahenge?';
      suggestedAction = { label: 'Explore All 10 Services', href: '/#services' };
    }

    res.status(200).json({
      ok: true,
      reply,
      suggestedAction,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*all', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HexaHive Tech server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
