export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const { name, business, phone, service, message } = req.body || {};

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ ok: false, error: 'Please enter your name.' });
    }
    if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
      return res
        .status(400)
        .json({ ok: false, error: 'Please enter a valid phone or WhatsApp number.' });
    }

    const lead = {
      id: `HH-${Date.now().toString().slice(-6)}`,
      name: name.trim(),
      business: (business || 'Not specified').trim(),
      phone: phone.trim(),
      service: (service || 'General AI Agent Inquiry').trim(),
      message: (message || '').trim(),
      createdAt: new Date().toISOString(),
    };

    const delivery = {
      resend: 'placeholder_ready',
      googleSheets: 'placeholder_ready',
    };

    // 1. Send email via Resend if RESEND_API_KEY is configured
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

    return res.status(200).json({
      ok: true,
      leadId: lead.id,
      delivery,
      message:
        'Shukriya! Aap ki demo request receive ho gayi hai. Hamari Karachi team 2 ghante ke andar WhatsApp par rabta karegi.',
    });
  } catch {
    return res.status(500).json({
      ok: false,
      error: 'Something went wrong while saving your request. Please try WhatsApp directly.',
    });
  }
}
