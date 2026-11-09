# HexaHive Tech — Marketing Website

Production-ready marketing website for **HexaHive Tech**, a Karachi-based team of 6 agentic AI developers building Voice Receptionists, WhatsApp Sales Agents, Real Estate Qualifiers, HR Screening Agents, E-Commerce COD Agents, and AI-enabled Websites for Pakistani businesses.

---

## 1. Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env

# 3. Start development server (runs on http://localhost:3000)
npm run dev

# 4. Type-check & build for production
npm run lint
npm run build
```

---

## 2. Environment Variables (`.env`)

| Variable | Description |
| :--- | :--- |
| `RESEND_API_KEY` | Resend API key used by `POST /api/contact` to email new lead notifications. |
| `CONTACT_NOTIFY_EMAIL` | Destination email address for leads (defaults to `hello@hexahive.tech`). |
| `CONTACT_FROM_EMAIL` | Verified sender email address in Resend (e.g. `leads@hexahive.tech`). |
| `GOOGLE_SHEETS_WEBHOOK_URL` | Google Apps Script Web App URL or Make/Zapier webhook URL to append leads to a Google Sheet. |
| `APP_URL` | Canonical production URL (`https://hexahive.tech`). |
| `VITE_PLAUSIBLE_DOMAIN` | Optional Plausible Analytics domain. |
| `VITE_GA_MEASUREMENT_ID` | Optional Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`). |

---

## 3. How to Edit Content (Single-File Configs)

All site copy, pricing, team profiles, service details, and blog posts are stored in clean TypeScript data files inside `/src/data/`:

1. **Contact Details & Hero/Process Copy (`/src/data/site.ts`)**:
   - Update `whatsapp` (`+92XXXXXXXXXX`), `whatsappClean` (`92300...`), `email` (`hello@hexahive.tech`), and `socials` (`linkedin`, `instagram`, `github`).
2. **Team Members (`/src/data/team.ts`)**:
   - Replace `[Name 1]` through `[Name 6]`, `initials`, `role`, and `skill` descriptions.
3. **PKR Pricing Plans (`/src/data/pricing.ts`)**:
   - Edit `setupFeePkr`, `monthlyFeePkr`, and included features for `Starter`, `Growth`, and `Custom`.
4. **Services & Demo Videos (`/src/data/services.ts`)**:
   - Edit all 6 services (`ai-receptionist`, `whatsapp-sales-agent`, `real-estate-agent`, `ai-hr-agent`, `ecommerce-agent`, `ai-websites`), their `/services/[slug]` problem statements, workflows, and example conversations.
5. **Blog Posts (`/src/data/blog.ts`)**:
   - Edit or add new articles rendered at `/blog` and `/blog/[slug]`.

---

## 4. Deployment (Vercel / Cloud Run)

1. Push this repository to GitHub.
2. Import the project into **Vercel** or **Google Cloud Run**.
3. Add your environment variables (`RESEND_API_KEY`, `GOOGLE_SHEETS_WEBHOOK_URL`, `CONTACT_NOTIFY_EMAIL`) in the deployment dashboard.
4. Deploy — `/sitemap.xml`, `/robots.txt`, `/og-image.svg`, and `LocalBusiness` JSON-LD for Karachi are pre-configured out of the box.
