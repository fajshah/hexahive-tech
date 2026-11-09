export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { message, lang } = req.body || {};
  const q = String(message || '').toLowerCase();
  const isEnglish = lang === 'en';

  let reply = '';
  let suggestedAction: { label: string; href: string } | null = null;

  if (
    q.includes('price') ||
    q.includes('cost') ||
    q.includes('pkr') ||
    q.includes('kharcha') ||
    q.includes('rate') ||
    q.includes('plan')
  ) {
    reply = isEnglish
      ? 'Our plans start with Starter (PKR 45,000 one-time setup + PKR 18,000/month for 1 AI agent) and Growth (PKR 85,000 setup + PKR 35,000/month for Voice + WhatsApp + CRM sync). Remember: your first custom working demo is 100% free before you pay anything!'
      : 'Hamara Starter plan PKR 45,000 setup + PKR 18,000/month se shuru hota hai (1 AI Agent), aur Growth plan PKR 85,000 setup + PKR 35,000/month hai (Voice + WhatsApp + Shopify/CRM). Sab se achi baat: pehla working demo bilkul FREE hai!';
    suggestedAction = { label: 'View PKR Pricing', href: '/#pricing' };
  } else if (
    q.includes('receptionist') ||
    q.includes('voice') ||
    q.includes('call') ||
    q.includes('phone') ||
    q.includes('clinic')
  ) {
    reply = isEnglish
      ? 'Our AI Receptionist picks up incoming phone calls in under 2 seconds, speaks natural Urdu and English, answers fee/timing FAQs, and books appointments directly into Google Calendar.'
      : 'Hamara AI Receptionist har phone call 2 second mein uthata hai, bilkul natural Urdu aur English mein baat karta hai, aur Google Calendar mein appointment lock kar ke WhatsApp confirmation bhejta hai.';
    suggestedAction = { label: 'Explore AI Receptionist', href: '/services/ai-receptionist' };
  } else if (
    q.includes('whatsapp') ||
    q.includes('voice note') ||
    q.includes('meta') ||
    q.includes('ad')
  ) {
    reply = isEnglish
      ? 'Our WhatsApp Sales Agent connects to your official WhatsApp Business number, understands Urdu voice notes and product images, qualifies leads 24/7, and logs every hot buyer to Google Sheets.'
      : 'Hamara WhatsApp Sales Agent aap ke Meta Ads se aane wale messages aur Urdu voice notes ko sun kar 3 second mein jawab deta hai, catalog share karta hai aur qualified leads Google Sheet mein save karta hai.';
    suggestedAction = { label: 'Explore WhatsApp Agent', href: '/services/whatsapp-sales-agent' };
  } else if (
    q.includes('real estate') ||
    q.includes('property') ||
    q.includes('plot') ||
    q.includes('flat') ||
    q.includes('builder')
  ) {
    reply = isEnglish
      ? 'For Real Estate agencies and builders in Karachi, Lahore & Islamabad, our agent qualifies buyers by budget and cash/installment plan, sends PDF floor plans, and books Zoom calls for Overseas Pakistanis 24/7.'
      : 'Real Estate builders aur dealers ke liye hamara agent buyers ka budget aur payment plan qualify karta hai, floor plans PDF bhejta hai, aur UK/Dubai ke Overseas investors ke liye 24/7 Zoom ya site visit book karta hai.';
    suggestedAction = { label: 'Explore Real Estate AI', href: '/services/real-estate-agent' };
  } else {
    reply = isEnglish
      ? 'Assalam-o-Alaikum! I am the HexaHive Tech AI assistant. We build 10 specialized solutions in Karachi: 1) AI Voice Receptionist, 2) WhatsApp Sales Agent, 3) Real Estate AI, 4) AI HR Agent, 5) SafeHer B2B, 6) Restaurant AI Manager, 7) E-Commerce AI, 8) Education AI, 9) Legal/Docs Agent, and 10) AI Websites. Which one would you like to explore?'
      : 'Assalam-o-Alaikum! Main HexaHive Tech ka AI agent hoon. Hum Karachi mein 10 specialized solutions banate hain: 1) AI Receptionist, 2) WhatsApp Sales, 3) Real Estate AI, 4) AI HR, 5) SafeHer B2B, 6) Restaurant AI Manager, 7) E-Commerce AI, 8) Education AI, 9) Legal/Docs Agent, aur 10) AI Websites. Aap kis ke bare mein janna chahenge?';
    suggestedAction = { label: 'Explore All 10 Services', href: '/#services' };
  }

  return res.status(200).json({
    ok: true,
    reply,
    suggestedAction,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  });
}
