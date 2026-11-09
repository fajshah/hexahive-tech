export interface ConversationMessage {
  speaker: 'customer' | 'agent';
  senderLabel: string;
  time: string;
  text: string;
  note?: string;
}

export type ServiceCategory = 'flagship' | 'industry' | 'b2b-web';

export interface ServiceItem {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  category: ServiceCategory;
  demandTag?: {
    ru: string;
    en: string;
  };
  oneLiner: {
    ru: string;
    en: string;
  };
  metricHighlight: string;
  isFeaturedDemo?: boolean;
  demo?: {
    durationLabel: string;
    demoLines: {
      ru: string;
      en: string;
    };
    tryCtaLabel: string;
    tryActionType: 'whatsapp' | 'phone';
    tryTargetLabel: string;
    whatsappPreset: string;
    videoTranscriptPreview: Array<{
      timestamp: string;
      speaker: 'Caller' | 'AI Agent';
      line: string;
    }>;
  };
  problem: {
    headline: string;
    description: {
      ru: string;
      en: string;
    };
    painPoints: {
      ru: string[];
      en: string[];
    };
  };
  howItWorks: Array<{
    step: string;
    title: string;
    detail: {
      ru: string;
      en: string;
    };
  }>;
  conversationContext: {
    ru: string;
    en: string;
  };
  exampleConversation: ConversationMessage[];
  deliverables: string[];
}

export const servicesData: ServiceItem[] = [
  // 01. AI Receptionist / Voice Agent
  {
    slug: 'ai-receptionist',
    index: '01',
    title: 'AI Receptionist / Voice Agent',
    shortTitle: 'Voice Agent',
    category: 'flagship',
    demandTag: {
      ru: 'Sabse Zyada Demand · #1 Bestseller',
      en: 'Highest Demand · #1 Bestseller',
    },
    oneLiner: {
      ru: 'Har incoming phone call 2 second mein uthata hai, natural Urdu aur English mein baat karta hai aur appointments seedha calendar mein book karta hai.',
      en: 'Answers every incoming phone call in under 2 seconds in natural Urdu or English and books appointments directly into your calendar.',
    },
    metricHighlight: '0 Missed Calls · 24/7 Urdu & English Voice',
    isFeaturedDemo: true,
    demo: {
      durationLabel: '01:18',
      demoLines: {
        ru: 'Dekhein kaise AI Receptionist Clifton Dental Clinic ki call utha kar Urdu mein fee batata hai aur Dr. Ahmed ki slot confirm karta hai.',
        en: 'Watch our voice agent answer a call for a Clifton clinic in Urdu, explain consultation fees, and lock in an evening slot.',
      },
      tryCtaLabel: 'Try it now',
      tryActionType: 'whatsapp',
      tryTargetLabel: 'Request Voice Call Demo on WhatsApp',
      whatsappPreset:
        'Assalam-o-Alaikum! Mujhe AI Receptionist / Voice Agent ka live demo test karna hai.',
      videoTranscriptPreview: [
        {
          timestamp: '00:04',
          speaker: 'AI Agent',
          line: 'Assalam-o-Alaikum, Clifton Care Clinic. Main Amina baat kar rahi hoon, aap ki kya madad kar sakti hoon?',
        },
        {
          timestamp: '00:14',
          speaker: 'Caller',
          line: 'Walaikum Assalam, mujhe aaj shaam Dr. Tariq ke sath root canal checkup ke liye time chahiye.',
        },
        {
          timestamp: '00:23',
          speaker: 'AI Agent',
          line: 'Jee bilkul. Aaj shaam 6:30 PM aur 7:15 PM ka slot khali hai. Initial checkup fee Rs. 2,500 hai. Kaunsa time confirm karoon?',
        },
        {
          timestamp: '00:39',
          speaker: 'Caller',
          line: '7:15 PM kar dein, mera naam Bilal Siddiqui hai.',
        },
        {
          timestamp: '00:48',
          speaker: 'AI Agent',
          line: 'Shukriya Bilal sahab! Aap ki 7:15 PM ki appointment book ho gayi hai. WhatsApp par location pin aur confirmation bhej di hai.',
        },
      ],
    },
    problem: {
      headline: 'Missed phone calls after 6 PM aur busy lines aap ke customers competitors ko de deti hain.',
      description: {
        ru: 'Clinics, diagnostic labs, salons aur corporate offices mein front-desk receptionist ek waqt mein sirf ek call sun sakta hai. Peak hours, lunch break ya shaam 7 baje ke baad aane wali 40% calls miss ho jaati hain.',
        en: 'In clinics, hospitals, salons, and offices across Pakistan, a human receptionist can only answer one call at a time. Over 40% of calls during peak hours or after 7 PM go unanswered.',
      },
      painPoints: {
        ru: [
          'Peak hours mein phone line busy milti hai aur caller dobara try nahi karta',
          'Receptionist bar bar wohi timing, address aur fees ke sawal repeat kar ke thak jata hai',
          'Sunday ya raat ke waqt urgent booking aur lead capture nahi hoti',
        ],
        en: [
          'Callers hang up when lines are busy during peak afternoon hours',
          'Front-desk staff spend 70% of their day repeating fees, timings, and location directions',
          'Zero booking capture after office hours or on Sundays',
        ],
      },
    },
    howItWorks: [
      {
        step: '01',
        title: 'Instant Call Pickup (< 2 sec)',
        detail: {
          ru: 'Aap ke PTCL SIP trunk, UAN ya mobile number par aane wali call AI 2 second ke andar uthata hai — ek waqt mein 20 calls bhi.',
          en: 'Connects to your existing UAN, SIP trunk, or phone number and answers within 2 seconds—even if 20 people call simultaneously.',
        },
      },
      {
        step: '02',
        title: 'Natural Urdu & English Voice',
        detail: {
          ru: 'Customer Urdu mein bole ya English mein, AI bilkul natural lehje mein aap ki services, fees aur availability batata hai.',
          en: 'Speaks naturally in Pakistani Urdu and English, answering questions about pricing, consultants, and availability.',
        },
      },
      {
        step: '03',
        title: 'Calendar Sync & WhatsApp Confirmation',
        detail: {
          ru: 'Call khatam hote hi Google Calendar ya CRM mein entry ho jati hai aur customer ko WhatsApp par confirmation message chala jata hai.',
          en: 'Books the slot straight into Google Calendar or your booking sheet and sends an instant WhatsApp confirmation to the caller.',
        },
      },
    ],
    conversationContext: {
      ru: 'Scenario: Ek patient raat 9:30 baje Karachi ke dental clinic par call karta hai jab reception band ho chuki hai.',
      en: 'Scenario: A patient calls a Karachi dental clinic at 9:30 PM after the front desk has gone home.',
    },
    exampleConversation: [
      {
        speaker: 'agent',
        senderLabel: 'AI Receptionist (Voice Call)',
        time: '09:31 PM',
        text: 'Assalam-o-Alaikum! Pearl Dental Studio Clifton. Main AI Receptionist baat kar rahi hoon. Kya aap appointment book karna chahte hain?',
      },
      {
        speaker: 'customer',
        senderLabel: 'Caller (Kamran)',
        time: '09:31 PM',
        text: 'Jee, kal subah scaling aur polishing ke charges kya hain aur kis time aa sakte hain?',
      },
      {
        speaker: 'agent',
        senderLabel: 'AI Receptionist (Voice Call)',
        time: '09:32 PM',
        text: 'Ultrasonic scaling aur polishing ka complete package Rs. 4,500 hai. Kal subah Dr. Hira ke pass 11:00 AM aur 12:30 PM ka slot available hai. Kaunsa rakhna pasand karenge?',
      },
      {
        speaker: 'customer',
        senderLabel: 'Caller (Kamran)',
        time: '09:32 PM',
        text: '11:00 AM confirm kar dein, Kamran Ahmed naam hai.',
      },
      {
        speaker: 'agent',
        senderLabel: 'AI Receptionist (Voice Call)',
        time: '09:32 PM',
        text: 'Done Kamran sahab! Kal subah 11:00 AM Dr. Hira ke sath aap ka slot lock ho gaya hai. Isi number par WhatsApp reminder aur Google Maps pin bhej diya hai.',
        note: 'Google Calendar updated + WhatsApp location pin sent automatically',
      },
    ],
    deliverables: [
      'Custom Urdu + English voice persona trained on your pricing & FAQs',
      'Live Google Calendar / Google Sheets / Clinic CRM sync',
      'Automated post-call WhatsApp summary & location message',
      'Human call-transfer rules for urgent escalations',
    ],
  },

  // 02. WhatsApp AI Sales Agent
  {
    slug: 'whatsapp-sales-agent',
    index: '02',
    title: 'WhatsApp AI Sales Agent',
    shortTitle: 'WhatsApp Sales',
    category: 'flagship',
    demandTag: {
      ru: '24/7 Meta Ads Closer · Voice Note Ready',
      en: '24/7 Meta Ads Closer · Voice Note Ready',
    },
    oneLiner: {
      ru: 'Instagram/Facebook ads se aane wale WhatsApp messages aur Urdu voice notes ka 3 second mein jawab de kar order ya lead close karta hai.',
      en: 'Replies in 3 seconds to WhatsApp texts and Urdu voice notes from your ads, shares catalogs, and closes orders 24/7.',
    },
    metricHighlight: '3x Faster Lead Qualification · Voice Note Ready',
    isFeaturedDemo: true,
    demo: {
      durationLabel: '01:12',
      demoLines: {
        ru: 'Dekhein kaise WhatsApp Sales Agent customer ka Urdu voice note sun kar solar quote deta hai aur site survey book karta hai.',
        en: 'See our WhatsApp agent listen to an Urdu voice note, recommend the right solar package, and book a site survey in seconds.',
      },
      tryCtaLabel: 'Try it now',
      tryActionType: 'whatsapp',
      tryTargetLabel: 'Test on WhatsApp',
      whatsappPreset:
        'Assalam-o-Alaikum! Mujhe WhatsApp AI Sales Agent ka live demo test karna hai.',
      videoTranscriptPreview: [
        {
          timestamp: '00:05',
          speaker: 'Caller',
          line: '[Voice Note 0:07] "Bhai yeh solar inverter 5kW wale ki kya price hai aur Karachi mein installation samait kitna parega?"',
        },
        {
          timestamp: '00:09',
          speaker: 'AI Agent',
          line: 'Walaikum Assalam! 5kW Hybrid Inverter complete A-grade plates aur Karachi installation ke sath Rs. 685,000 ka hai. Aap ka monthly bijli bill kitna aata hai taake main exact savings bata sakoon?',
        },
        {
          timestamp: '00:28',
          speaker: 'Caller',
          line: 'Garmiyon mein 45,000 tak aa jata hai, Gulshan-e-Iqbal Block 13 mein ghar hai.',
        },
        {
          timestamp: '00:34',
          speaker: 'AI Agent',
          line: '45,000 bill ke liye 5kW system aap ka bill zero ke qareeb le aayega. Kal hamare engineer Gulshan mein hain — kya 4 PM free site survey rakh dein?',
        },
      ],
    },
    problem: {
      headline: 'Pakistani customers web forms nahi bharte — woh WhatsApp par message ya Urdu voice note bhejte hain.',
      description: {
        ru: 'Jab aap Meta Ads chalate hain aur customer "Price please?" ya Urdu voice note bhejta hai, agar 5 minute mein jawab na mile toh lead thandi ho jati hai. Sales team din bhar "Pp" aur "Details?" ka reply dete thak jati hai.',
        en: 'Pakistani buyers prefer WhatsApp messages and voice notes over web forms. If your sales team takes 2 hours to reply to a Meta Click-to-WhatsApp ad, that customer has already bought from a competitor.',
      },
      painPoints: {
        ru: [
          'Raat 10 baje se 2 baje ke darmiyan aane wali Meta ad leads subah tak waste ho jati hain',
          'Sales staff Urdu voice notes sunne aur bar bar catalog PDF bhejne mein ghanton lagata hai',
          'Follow-up na hone ki wajah se 60% warm leads wapis nahi aatin',
        ],
        en: [
          'Peak ad traffic arrives between 9 PM and 1 AM when your sales staff is offline',
          'Reps waste hours listening to voice notes and manually forwarding PDF catalogs',
          'No structured follow-up for warm leads who stop replying mid-conversation',
        ],
      },
    },
    howItWorks: [
      {
        step: '01',
        title: 'Official WhatsApp Cloud API Connection',
        detail: {
          ru: 'Aap ke business WhatsApp number par lagta hai — Meta ads, website button aur organic messages sab handle karta hai.',
          en: 'Connects to your official Meta WhatsApp Business API so every ad click and message gets a reply in under 3 seconds.',
        },
      },
      {
        step: '02',
        title: 'Urdu Voice Note & Screenshot Understanding',
        detail: {
          ru: 'Customer Urdu mein voice note bheje ya product ka screenshot, agent usay samajh kar sahi price aur stock batata hai.',
          en: 'Transcribes Urdu/English voice notes and recognizes product photos to give accurate prices and stock availability.',
        },
      },
      {
        step: '03',
        title: 'Lead Scoring & Instant Sheet/CRM Push',
        detail: {
          ru: 'Name, city, budget aur requirement collect kar ke Google Sheet mein likhta hai aur hot lead par aap ke closer ko alert karta hai.',
          en: 'Collects customer name, city, and budget, logs the row to Google Sheets, and pings your human closer when a deal is ready.',
        },
      },
    ],
    conversationContext: {
      ru: 'Scenario: Instagram ad dekh kar customer raat 11:45 PM par Urdu voice note bhejta hai.',
      en: 'Scenario: A buyer clicks an Instagram ad at 11:45 PM and sends an Urdu voice note.',
    },
    exampleConversation: [
      {
        speaker: 'customer',
        senderLabel: 'Customer (WhatsApp)',
        time: '11:45 PM',
        text: '🎤 [Voice Note 0:09]: "Assalam-o-Alaikum, yeh office chairs jo ad mein dikhayi hain, 12 pieces chahiye DHA Phase 6 office ke liye. Bulk discount milega?"',
      },
      {
        speaker: 'agent',
        senderLabel: 'HexaHive WhatsApp Agent',
        time: '11:45 PM',
        text: 'Walaikum Assalam! Jee bilkul, ErgoMesh Executive Chair ki single price Rs. 24,500 hai, lekin 12 pieces ke corporate order par 15% discount ke baad Rs. 20,800 per chair paregi — DHA Phase 6 free delivery + fitting ke sath.',
      },
      {
        speaker: 'customer',
        senderLabel: 'Customer (WhatsApp)',
        time: '11:47 PM',
        text: 'Warranty kitni hai aur sample dekh sakte hain?',
      },
      {
        speaker: 'agent',
        senderLabel: 'HexaHive WhatsApp Agent',
        time: '11:47 PM',
        text: '2 saal ki hydraulic aur mesh replacement warranty hai. Hum kal dopehar aap ke DHA Phase 6 office mein 1 sample chair bhej sakte hain check karne ke liye. Apna office address aur contact person ka naam share kar dein?',
      },
      {
        speaker: 'customer',
        senderLabel: 'Customer (WhatsApp)',
        time: '11:49 PM',
        text: 'Bukhari Commercial Lane 4, Building 18-C, 2nd Floor. Ask for Daniyal.',
      },
      {
        speaker: 'agent',
        senderLabel: 'HexaHive WhatsApp Agent',
        time: '11:49 PM',
        text: 'Noted Daniyal sahab! Kal 2:00 PM sample chair aap ke office pohanch jayegi, aur Rs. 249,600 ka quotation PDF upar bhej diya hai.',
        note: 'B2B Lead logged to Google Sheets + Corporate Sales Manager notified',
      },
    ],
    deliverables: [
      'Meta WhatsApp Business API setup & verified template flows',
      'Urdu voice-note transcription & Roman Urdu sales conversation engine',
      'Automated 24-hour & 72-hour polite follow-up sequences',
      'Real-time Google Sheets & CRM lead pipeline sync',
    ],
  },

  // 03. Real Estate Ka Agentic AI
  {
    slug: 'real-estate-agent',
    index: '03',
    title: 'Real Estate Ka Agentic AI',
    shortTitle: 'Real Estate AI',
    category: 'flagship',
    demandTag: {
      ru: 'Karachi Me GOLD Hai · High-Ticket Closer',
      en: 'Goldmine for Karachi Realtors & Builders',
    },
    oneLiner: {
      ru: 'DHA, Bahria, Clifton aur Scheme 33 ke buyers ka budget aur payment plan qualify kar ke sirf serious investors ki site visit ya Overseas Zoom call book karta hai.',
      en: 'Qualifies property buyers by budget, location, and installment plan, booking site visits and Overseas Pakistani Zoom calls 24/7.',
    },
    metricHighlight: 'Filters Window Shoppers · 24/7 Overseas Pak Closer',
    isFeaturedDemo: true,
    demo: {
      durationLabel: '01:26',
      demoLines: {
        ru: 'Dekhein kaise Real Estate AI Agent UK mein baithe Overseas Pakistani investor ko payment plan samjha kar Zoom call book karta hai.',
        en: 'Watch our Real Estate agent assist an Overseas Pakistani buyer in London, calculate installment plans, and book a site tour.',
      },
      tryCtaLabel: 'Try it now',
      tryActionType: 'whatsapp',
      tryTargetLabel: 'Try Real Estate AI on WhatsApp',
      whatsappPreset:
        'Assalam-o-Alaikum! Mujhe Real Estate Ka Agentic AI ka live demo dekhna hai.',
      videoTranscriptPreview: [
        {
          timestamp: '00:06',
          speaker: 'Caller',
          line: 'Hi, I saw your Bahria Town Karachi 2-bed apartment project from London. Down payment aur monthly installment kya hai?',
        },
        {
          timestamp: '00:15',
          speaker: 'AI Agent',
          line: 'Assalam-o-Alaikum! 2-Bed Luxury Apartment (1,150 sq.ft) ki total price PKR 1.45 Crore hai. 25% down payment (PKR 36.25 Lac) hai aur baqi 36 monthly installments mein PKR 2.2 Lac per month.',
        },
        {
          timestamp: '00:38',
          speaker: 'Caller',
          line: 'Possession kab tak hai aur corner unit available hai?',
        },
        {
          timestamp: '00:46',
          speaker: 'AI Agent',
          line: 'Possession December 2027 mein hai aur 5th aur 8th floor par Park-Facing Corner units available hain. Main floor plan PDF bhej raha hoon — kya aaj UK time 5 PM hamare project director ke sath 10-min video walkthrough rakh dein?',
        },
      ],
    },
    problem: {
      headline: 'Karachi ke builders aur dealers ka 80% waqt chaska party (window shoppers) par lag jata hai.',
      description: {
        ru: 'Karachi, Lahore aur Islamabad ke realtors ko rozana ratusan calls aur messages aate hain — jin mein se 80% sirf rate check karne wale hote hain. Dusri taraf UK, Dubai aur USA mein baithe Overseas Pakistanis jab raat 2 baje message karte hain toh unhein subah tak jawab nahi milta.',
        en: 'Property agencies and builders get flooded with low-intent leads from portals and Facebook ads, while high-value Overseas Pakistani investors messaging from UK, UAE, or North America time zones wait hours for a reply.',
      },
      painPoints: {
        ru: [
          'Overseas Pakistani investors time-zone farq ki wajah se raat 1–4 AM PKT par message karte hain',
          'Sales agents har caller ko floor plans, SBCA NOC aur payment schedule bhejte reh jate hain',
          'Bina budget qualify kiye site visits par petrol aur senior closers ka waqt zaya hota hai',
        ],
        en: [
          'Overseas Pakistani investors message at 2 AM PKT and lose interest if nobody responds',
          'Realtors manually send the same floor plans, payment schedules, and maps hundreds of times',
          'Agents waste afternoons on site visits with unqualified window shoppers',
        ],
      },
    },
    howItWorks: [
      {
        step: '01',
        title: 'Live Plot / Tower Inventory & Installment Calculator',
        detail: {
          ru: 'Aap ke plots, flats aur commercial projects ki live sheet se connected — customer ke budget ke mutabiq exact unit aur installment plan nikal kar deta hai.',
          en: 'Connected to your live inventory sheet—calculates down payments, quarterly installments, and available floors on the spot.',
        },
      },
      {
        step: '02',
        title: 'Buyer Qualification (Budget, Cash vs Installment)',
        detail: {
          ru: 'Polite andaz mein buyer ka budget, cash vs installment preference, aur buying timeline confirm karta hai.',
          en: 'Politely qualifies whether the buyer is looking for cash or installments, their exact budget range, and investment timeline.',
        },
      },
      {
        step: '03',
        title: 'Site Visit or Overseas Zoom Booking',
        detail: {
          ru: 'Sirf qualified investors ki site visit ya Zoom call aap ke senior closer ke calendar mein book karta hai.',
          en: 'Books on-site Karachi/Lahore visits or Overseas Zoom consultations directly onto your senior closer’s calendar.',
        },
      },
    ],
    conversationContext: {
      ru: 'Scenario: Dubai mein rehne wala investor Karachi project ke bare mein raat 1:20 AM PKT par rabta karta hai.',
      en: 'Scenario: An investor based in Dubai inquiries about a Karachi residential project at 1:20 AM PKT.',
    },
    exampleConversation: [
      {
        speaker: 'customer',
        senderLabel: 'Investor (Dubai +971)',
        time: '01:20 AM',
        text: 'Salam, aap ke Scheme 33 ya Malir Cantt ke qareeb 120 sq yards residential plots mein kuch ready-for-possession hai? Budget 1.2 se 1.5 Crore hai.',
      },
      {
        speaker: 'agent',
        senderLabel: 'HexaHive Real Estate Agent',
        time: '01:20 AM',
        text: 'Walaikum Assalam! Jee, aap ke 1.2–1.5 Crore budget mein Malir Link Road ke bilkul samne Gated Society Block B mein do leased 120 sq.yd plots available hain (PKR 1.32 Crore aur PKR 1.40 Crore West Open). Kya aap cash deal dekh rahe hain ya short installment?',
      },
      {
        speaker: 'customer',
        senderLabel: 'Investor (Dubai +971)',
        time: '01:22 AM',
        text: 'Cash deal hai, boundary wall aur utilities complete hain? Mera bhai Karachi mein hota hai woh kal visit kar sakta hai.',
      },
      {
        speaker: 'agent',
        senderLabel: 'HexaHive Real Estate Agent',
        time: '01:22 AM',
        text: 'Jee, 100% boundary wall, underground electricity aur sweet water chalu hai — fori construction start ho sakti hai. Main society map aur plot #42 ki drone video bhej raha hoon. Kal aap ke bhai ke liye dopehar 3:00 PM site visit confirm kar dein?',
      },
      {
        speaker: 'customer',
        senderLabel: 'Investor (Dubai +971)',
        time: '01:24 AM',
        text: 'Haan 3 PM theek hai. Unka naam Usman hai (+92-300-XXXXXXX).',
      },
      {
        speaker: 'agent',
        senderLabel: 'HexaHive Real Estate Agent',
        time: '01:24 AM',
        text: 'Shukriya! Kal 3:00 PM hamare Senior Advisor Salman sahab gate par Usman bhai ko receive karenge. Dono numbers par gate pass aur location pin bhej diya hai.',
        note: 'Qualified Cash Lead (PKR 1.4 Cr) assigned to Senior Closer Salman',
      },
    ],
    deliverables: [
      'Live plot/apartment inventory & installment calculator integration',
      'Automated PDF brochure, floor plan & drone video dispatch on WhatsApp',
      '24/7 Overseas Pakistani investor qualification across all time zones',
      'Automatic CRM assignment & site-visit calendar booking',
    ],
  },

  // 04. AI HR Agent
  {
    slug: 'ai-hr-agent',
    index: '04',
    title: 'AI HR Agent',
    shortTitle: 'AI HR Agent',
    category: 'flagship',
    demandTag: {
      ru: 'Automated CV & Voice Screening',
      en: 'Automated CV & Voice Screening',
    },
    oneLiner: {
      ru: 'Job applicants ke CVs screen karta hai, WhatsApp/voice par initial interview leta hai aur top 10% candidates shortlist karta hai.',
      en: 'Screens CVs, conducts 5-minute automated voice or WhatsApp pre-interviews, and hands your HR team a ranked shortlist.',
    },
    metricHighlight: '85% Faster Hiring · Voice & WhatsApp Screening',
    isFeaturedDemo: false,
    problem: {
      headline: 'Ek job post par 400 CVs aate hain — aur HR team sab ko phone kar ke basic sawal nahi pooch sakti.',
      description: {
        ru: 'Jab aap LinkedIn, Indeed ya WhatsApp par hiring post lagate hain, ratusan CVs aa jate hain. Har candidate ko call kar ke current salary, notice period aur communication skills check karne mein 2 hafte nikal jate hain.',
        en: 'A single job posting in Karachi generates 300+ applications. Calling candidates one by one just to check expected salary, notice period, and spoken English/Urdu takes weeks.',
      },
      painPoints: {
        ru: [
          'HR waqt ka 75% hissa irrelevant CVs aur basic screening calls mein zaya hota hai',
          'Achay candidates slow response ki wajah se dusri company join kar lete hain',
          'Internal staff HR policy, leave balance aur medical claim ke sawal bar bar poochta hai',
        ],
        en: [
          'Recruiters spend 75% of their week on repetitive 5-minute phone screenings',
          'Top candidates accept other offers while waiting for your first screening call',
          'HR teams get interrupted daily with routine employee leave and policy questions',
        ],
      },
    },
    howItWorks: [
      {
        step: '01',
        title: 'CV Parsing & Requirement Match',
        detail: {
          ru: 'Candidate email ya WhatsApp par CV bhejta hai — AI 5 second mein skills aur experience match karta hai.',
          en: 'Candidates send their CV via WhatsApp or web form; the agent parses experience, skills, and location in seconds.',
        },
      },
      {
        step: '02',
        title: 'Automated Voice / WhatsApp Screening Interview',
        detail: {
          ru: 'Shortlisted candidates se 4–5 role-specific sawal, expected PKR salary aur notice period poochta hai.',
          en: 'Conducts a structured 5-question screening interview via WhatsApp or voice call, recording audio samples.',
        },
      },
      {
        step: '03',
        title: 'Ranked Shortlist in Google Sheets / ATS',
        detail: {
          ru: 'HR manager ko top 10% candidates ka score, audio summary aur interview booking link mil jata hai.',
          en: 'Delivers a clean Google Sheet with candidate scores, salary expectations, and one-click final interview scheduling.',
        },
      },
    ],
    conversationContext: {
      ru: 'Scenario: Sales Executive role ke liye candidate WhatsApp par apna CV bhejta hai.',
      en: 'Scenario: A candidate applies for a Business Development role via WhatsApp.',
    },
    exampleConversation: [
      {
        speaker: 'customer',
        senderLabel: 'Candidate (Zainab)',
        time: '03:10 PM',
        text: 'Assalam-o-Alaikum, attaching my CV for the Senior Sales Executive position in Karachi.',
      },
      {
        speaker: 'agent',
        senderLabel: 'HexaHive HR Agent',
        time: '03:10 PM',
        text: 'Walaikum Assalam Zainab! Aap ka CV mil gaya hai — aap ka 3 years B2B sales experience hamari requirement se match karta hai. Shortlist complete karne ke liye 3 chotay sawal hain: 1) Aap ki current aur expected monthly salary (PKR) kya hai?',
      },
      {
        speaker: 'customer',
        senderLabel: 'Candidate (Zainab)',
        time: '03:12 PM',
        text: 'Current 135,000 PKR plus commission hai, expected 165,000 PKR base hai.',
      },
      {
        speaker: 'agent',
        senderLabel: 'HexaHive HR Agent',
        time: '03:12 PM',
        text: 'Noted (hamare budget bracket ke andar hai). 2) Aap ka notice period kitna hai, aur kya Shahrah-e-Faisal on-site office timing (10 AM – 7 PM) aap ke liye comfortable hai?',
      },
      {
        speaker: 'customer',
        senderLabel: 'Candidate (Zainab)',
        time: '03:14 PM',
        text: 'Notice period 15 days hai aur Shahrah-e-Faisal mere ghar se 15 min door hai.',
      },
      {
        speaker: 'agent',
        senderLabel: 'HexaHive HR Agent',
        time: '03:14 PM',
        text: 'Perfect! Aakhri step: please 30 second ka ek voice note bhejein jis mein apni sab se bari B2B deal close karne ka bataein. Is ke foran baad main Head of Sales ke sath aap ka final interview slot book kar doongi.',
        note: 'Candidate scored 92/100 + Voice evaluation attached to HR Sheet',
      },
    ],
    deliverables: [
      'Automated CV parser & role-criteria scoring engine',
      'WhatsApp & Voice pre-interview flow with spoken fluency check',
      'Ranked Google Sheets / ATS tracker with candidate audio links',
      'Internal employee FAQ & leave-policy assistant',
    ],
  },

  // 05. SafeHer B2B Version
  {
    slug: 'safeher-b2b',
    index: '05',
    title: 'SafeHer B2B Version',
    shortTitle: 'SafeHer B2B',
    category: 'b2b-web',
    demandTag: {
      ru: 'Corporate Women Safety & Transport AI',
      en: 'Corporate Women Safety & Transport AI',
    },
    oneLiner: {
      ru: 'Software houses, BPOs, hospitals aur universities ki female staff ke liye automated commute check-ins, SOS voice/WhatsApp escalation aur workplace harassment compliance agent.',
      en: 'Automated late-shift commute safety check-ins, instant SOS voice/WhatsApp escalation, and confidential workplace safety reporting for Pakistani enterprises.',
    },
    metricHighlight: 'Real-Time Commute Check-Ins · Instant SOS Dispatch',
    isFeaturedDemo: false,
    problem: {
      headline: 'Evening aur night shifts wali female employees ki safe pick-and-drop har BPO, hospital aur corporate office ki sab se bari zimmedari hai.',
      description: {
        ru: 'Karachi, Lahore aur Islamabad ke software houses, call centers (BPOs), banks aur hospitals mein female staff shaam ya raat ko company transport ya ride-hailing par ghar jati hain. Admin team manually har employee ko call kar ke "Ghar pohanch gayin?" check nahi kar sakti.',
        en: 'Software houses, BPOs, hospitals, and universities with evening shifts struggle to manually track whether every female team member reached home safely—or to provide a confidential, 24/7 SOS and compliance reporting channel.',
      },
      painPoints: {
        ru: [
          'Admin team rozana 50+ late-shift vans aur rides ko manually call kar ke track nahi kar sakti',
          'Emergency ya route deviation ki soorat mein panic button ya instant voice check-in nahi hota',
          'Workplace safety aur anti-harassment compliance (Protection Against Harassment Act) ki confidential reporting mushkil hoti hai',
        ],
        en: [
          'Transport admins cannot manually call 50+ employees every night to verify safe arrival',
          'Delayed response when a van or ride-hail deviates from route or stops unexpectedly',
          'Lack of a confidential, trauma-informed 24/7 reporting channel for workplace safety compliance',
        ],
      },
    },
    howItWorks: [
      {
        step: '01',
        title: 'Automated Commute Check-In on WhatsApp & Voice',
        detail: {
          ru: 'Shift khatam hote hi SafeHer AI employee se live location pin aur estimated arrival time leta hai aur waqt par "Safe Arrival" confirm karta hai.',
          en: 'Automatically initiates a WhatsApp & voice check-in when an employee leaves for home, tracking ETA and confirming safe arrival.',
        },
      },
      {
        step: '02',
        title: '1-Second SOS & Silent Distress Code Escalation',
        detail: {
          ru: 'Agar employee 2 minute tak check-in ka jawab na de ya secret distress word bole, toh AI foran Admin Head, Security aur family contact ko live coordinates ke sath call karta hai.',
          en: 'If a check-in is missed or a distress code is triggered, the AI immediately calls the Admin Head, security desk, and emergency family contact with live GPS.',
        },
      },
      {
        step: '03',
        title: 'Confidential HR Compliance & Safety Log',
        detail: {
          ru: 'Female staff kisi bhi waqt confidentially transport complaint ya workplace safety issue report kar sakti hain jo seedha Ombudsperson/HR committee ko jata hai.',
          en: 'Provides an encrypted, 24/7 conversational desk to log transport issues or workplace safety reports for corporate audit compliance.',
        },
      },
    ],
    conversationContext: {
      ru: 'Scenario: Raat 9:00 PM shift ke baad BPO employee company Coaster/ride mein ghar ja rahi hai.',
      en: 'Scenario: An employee leaves her Shahrah-e-Faisal office at 9:00 PM and SafeHer B2B monitors her commute.',
    },
    exampleConversation: [
      {
        speaker: 'agent',
        senderLabel: 'SafeHer B2B Guardian AI',
        time: '09:05 PM',
        text: 'Salam Hina! Aap ki 9:00 PM shift check-out ho gayi hai (Van #4 — Driver: Rasheed, Route: Shahrah-e-Faisal to Gulistan-e-Johar). Aap ka expected home arrival 9:40 PM hai. Ghar pohanchte hi "1" ya "Reached" likh dein, ya help ke liye "SOS" bhejein.',
      },
      {
        speaker: 'customer',
        senderLabel: 'Employee (Hina)',
        time: '09:38 PM',
        text: 'Reached home safely, thank you!',
      },
      {
        speaker: 'agent',
        senderLabel: 'SafeHer B2B Guardian AI',
        time: '09:38 PM',
        text: 'Alhamdulillah! Aap ka safe arrival Corporate Transport Dashboard mein mark ho gaya hai. Aaj ke सफर ya driver ki driving ke hawale se koi feedback toh nahi?',
      },
      {
        speaker: 'customer',
        senderLabel: 'Employee (Hina)',
        time: '09:39 PM',
        text: 'All good today, driver drove safely.',
      },
      {
        speaker: 'agent',
        senderLabel: 'SafeHer B2B Guardian AI',
        time: '09:39 PM',
        text: 'Shukriya Hina! Have a restful night. Admin transport log updated.',
        note: 'Commute #419 marked SAFE on HR & Transport Dashboard',
      },
    ],
    deliverables: [
      'Automated WhatsApp + Voice night-shift commute check-in system',
      'Instant multi-channel SOS escalation (calls Security, HR & Family simultaneously)',
      'Live Corporate Transport & Employee Safety Dashboard',
      'Confidential workplace safety & compliance reporting module',
    ],
  },

  // 06. Restaurant Ka AI Manager
  {
    slug: 'restaurant-ai-manager',
    index: '06',
    title: 'Restaurant Ka AI Manager',
    shortTitle: 'Restaurant AI',
    category: 'industry',
    demandTag: {
      ru: '0% Commission Direct Orders & Table Booking',
      en: '0% Commission Direct Orders & Table Booking',
    },
    oneLiner: {
      ru: 'WhatsApp aur phone call par direct food orders leta hai (bina 30% delivery app commission ke), table reserve karta hai aur kitchen POS mein order bhejta hai.',
      en: 'Takes direct food orders over WhatsApp and voice calls with zero aggregator commission, books tables, and routes tickets straight to your kitchen.',
    },
    metricHighlight: 'Save 28% Aggregator Commission · 24/7 Order Desk',
    isFeaturedDemo: false,
    problem: {
      headline: 'Delivery apps aap ke restaurant ka 28%–32% margin kha jati hain, aur Friday/Saturday night par phone line busy rehti hai.',
      description: {
        ru: 'Karachi ke Burns Road, Do Darya, Clifton, Sindhi Muslim aur Bahadurabad ke restaurants aur cafes jab third-party apps par depend karte hain toh har order par 30% commission kat jata hai. Aur jab loyal customer direct phone ya WhatsApp karta hai, toh rush hour mein staff phone nahi utha pata.',
        en: 'Restaurants in Karachi and Lahore lose nearly 30% of every order to delivery aggregators, while direct phone and WhatsApp orders get missed during 8 PM–11 PM dinner rush hours.',
      },
      painPoints: {
        ru: [
          'Dinner rush (8 PM – 12 AM) mein cashier phone call uthaye ya counter sambhale?',
          'WhatsApp par menu bhejna, platter customize karna aur delivery charges calculate karna manual staff ke liye slow hai',
          'Sehri, Iftar aur weekend family table reservations mix-up ho jati hain',
        ],
        en: [
          'Cashiers cannot answer 15 simultaneous phone calls during Friday & Saturday dinner rush',
          'Manually calculating delivery zones, platter add-ons, and JazzCash/EasyPaisa screenshots takes too long',
          'High aggregator commissions wipe out net profit on repeat neighbourhood customers',
        ],
      },
    },
    howItWorks: [
      {
        step: '01',
        title: 'Direct WhatsApp & Voice Menu Ordering',
        detail: {
          ru: 'Customer voice note ya message mein bole "2 Beef Smash Burgers aur 1 Loaded Fries DHA Phase 5 bhej dein" — AI foran bill aur delivery charges calculate karta hai.',
          en: 'Understands natural Roman Urdu & voice orders, suggests high-margin add-ons (drinks, dips, desserts), and calculates zone delivery fees.',
        },
      },
      {
        step: '02',
        title: 'Online Payment Screenshot / COD Verification & Kitchen Print',
        detail: {
          ru: 'Raast/Meezan/EasyPaisa transfer ya COD confirm kar ke seedha kitchen display ya POS printer par KOT (Kitchen Order Ticket) nikalta hai.',
          en: 'Verifies COD or bank transfer receipt and pushes the order straight to your kitchen sheet or POS printer.',
        },
      },
      {
        step: '03',
        title: 'Automated Table Reservations & Post-Meal Google Reviews',
        detail: {
          ru: 'Dine-in customers ke liye family/rooftop table reserve karta hai aur khane ke 2 ghante baad Google Maps 5-star review link bhejta hai.',
          en: 'Manages rooftop/family hall table bookings and automatically follows up after delivery to collect 5-star Google reviews.',
        },
      },
    ],
    conversationContext: {
      ru: 'Scenario: Friday raat 9:45 PM par customer Clifton ke BBQ & Burger restaurant ko WhatsApp voice note bhejta hai.',
      en: 'Scenario: A hungry customer sends an order on Friday night at 9:45 PM via WhatsApp.',
    },
    exampleConversation: [
      {
        speaker: 'customer',
        senderLabel: 'Foodie (Osama)',
        time: '09:45 PM',
        text: '🎤 [Voice Note 0:08]: "Bhai 1 Family BBQ Platter, 2 Garlic Mayo Zinger aur 4 Garam Naan PECHS Block 2 bhejna hai, kitni der mein aayega?"',
      },
      {
        speaker: 'agent',
        senderLabel: 'Restaurant AI Manager',
        time: '09:45 PM',
        text: 'Assalam-o-Alaikum Osama bhai! Aap ka order:\n• 1x Family BBQ Platter (Rs. 3,850)\n• 2x Garlic Mayo Zinger (Rs. 1,500)\n• 4x Roghni Naan (Rs. 320)\nPECHS Block 2 Delivery: Rs. 150 (35–40 mins).\nKya sath mein 1.5L Cold Drink + Extra Raita Deal (Rs. 280) add kar doon?',
      },
      {
        speaker: 'customer',
        senderLabel: 'Foodie (Osama)',
        time: '09:46 PM',
        text: 'Haan 1.5L Coke add kar do. COD hai, House 44-B, Street 6, PECHS Block 2.',
      },
      {
        speaker: 'agent',
        senderLabel: 'Restaurant AI Manager',
        time: '09:46 PM',
        text: 'Done! Total Bill Rs. 6,100 (Cash on Delivery). Order #KOT-309 kitchen mein chala gaya hai aur 10:25 PM tak garma-garam pohanch jayega!',
        note: 'Kitchen Order Ticket #KOT-309 printed + Rs. 1,700 aggregator commission saved',
      },
    ],
    deliverables: [
      'Interactive WhatsApp & Voice ordering agent trained on your full menu & deals',
      'Automated upsell engine (drinks, sides, desserts) increasing average order value by 18%',
      'Table reservation manager for dine-in, Iftar/Sehri buffets & corporate dinners',
      'Kitchen sheet / POS webhook sync + automated rider dispatch notification',
    ],
  },

  // 07. Agentic AI for E-Commerce
  {
    slug: 'ecommerce-agent',
    index: '07',
    title: 'Agentic AI for E-Commerce',
    shortTitle: 'E-Commerce AI',
    category: 'flagship',
    demandTag: {
      ru: '-35% COD Returns (RTO) · Shopify & Woo',
      en: '-35% COD Returns (RTO) · Shopify & Woo',
    },
    oneLiner: {
      ru: 'Shopify/WooCommerce orders ki COD confirmation, adhooray address ki correction, size guide aur TCS/Leopards/PostEx parcel tracking khud sambhalta hai.',
      en: 'Automates Cash-on-Delivery (COD) verification, fixes incomplete addresses to slash return-to-origin (RTO), and tracks parcels 24/7.',
    },
    metricHighlight: '-35% COD Returns (RTO) · Live Shopify & Courier Sync',
    isFeaturedDemo: false,
    problem: {
      headline: 'Pakistan e-commerce ka sab se bara dushman: Fake COD orders aur "Mera parcel kahan hai?" messages.',
      description: {
        ru: 'Shopify aur WooCommerce brands ka 20% se 35% profit fake ya unconfirmed Cash-on-Delivery (COD) returns mein doob jata hai. Aur support team din bhar TCS/Leopards/PostEx tracking links dhoond kar customers ko bhejti rehti hai.',
        en: 'Pakistani D2C brands lose 20–35% of margin to Cash-on-Delivery (COD) returns (RTO) and bogus addresses, while support reps drown in "Mera order kab aayega?" messages.',
      },
      painPoints: {
        ru: [
          'Adha adhoora address ("Near Jamia Masjid, Gulshan") jis ki wajah se rider parcel wapis le aata hai',
          'COD confirmation calls manually karne mein orders dispatch late ho jate hain',
          'Size exchange, fabric care aur live courier status ke hazaron messages',
        ],
        en: [
          'Incomplete addresses ("Near main market") cause rider delivery failures and double shipping losses',
          'Manual COD confirmation calls delay same-day dispatch',
          'Support inbox flooded with tracking requests during sale campaigns',
        ],
      },
    },
    howItWorks: [
      {
        step: '01',
        title: 'Instant COD Order Verification & Address Fix',
        detail: {
          ru: 'Shopify par order aate hi 10 second mein customer ko WhatsApp ya voice call kar ke order confirm karta hai aur agar address chota ho toh landmark mangwa kar Shopify mein update karta hai.',
          en: 'Triggers within 10 seconds of a Shopify/WooCommerce order to confirm COD intent and automatically fixes incomplete street addresses.',
        },
      },
      {
        step: '02',
        title: 'Live Courier Tracking (TCS, Leopards, PostEx, Trax)',
        detail: {
          ru: 'Customer jab bhi tracking pooche, order number ya phone number se live courier status nikal kar bata deta hai.',
          en: 'Looks up real-time courier status by phone number so customers never wait for a human agent.',
        },
      },
      {
        step: '03',
        title: 'Size Recommendation & Abandoned Cart Recovery',
        detail: {
          ru: 'Height/weight pooch kar sahi size suggest karta hai aur abandoned carts par WhatsApp reminder bhej kar sales recover karta hai.',
          en: 'Guides shoppers on sizing and follows up on abandoned checkouts via WhatsApp with a one-tap confirmation.',
        },
      },
    ],
    conversationContext: {
      ru: 'Scenario: Customer Shopify store par Rs. 6,400 ka lawn suit COD order karta hai lekin house number nahi likhta.',
      en: 'Scenario: A customer places a Rs. 6,400 COD order on Shopify with an incomplete address.',
    },
    exampleConversation: [
      {
        speaker: 'agent',
        senderLabel: 'HexaHive E-Commerce Agent',
        time: '04:02 PM',
        text: 'Assalam-o-Alaikum Ayesha! Zaynab Apparel se aap ka Order #ZA-8841 (Embroidered Lawn 3-Piece, Rs. 6,400 COD) receive hua hai. Same-day dispatch ke liye confirm kar dein — aur aap ke address mein sirf "Model Town Block C Lahore" likha hai, please House # aur qareebi landmark bata dein?',
      },
      {
        speaker: 'customer',
        senderLabel: 'Shopper (Ayesha)',
        time: '04:03 PM',
        text: 'Jee order confirm hai. House # 114-C, near central park gate 2, Model Town Lahore.',
      },
      {
        speaker: 'agent',
        senderLabel: 'HexaHive E-Commerce Agent',
        time: '04:03 PM',
        text: 'Bohat shukriya! Address update ho gaya hai ("House #114-C, Near Central Park Gate 2, Model Town Block C, Lahore") aur order Verified tag ke sath dispatch queue mein chala gaya hai. Aaj raat TCS tracking number isi chat mein aa jayega.',
        note: 'Shopify Order #ZA-8841 tagged [COD-VERIFIED] + shipping address updated automatically',
      },
    ],
    deliverables: [
      'Direct Shopify & WooCommerce webhook integration',
      'Automated COD verification + incomplete address correction flow',
      'Live courier tracking lookup (PostEx, Leopards, TCS, CallCourier, Trax)',
      'Abandoned cart WhatsApp recovery & size-guide assistant',
    ],
  },

  // 08. Education AI Agent
  {
    slug: 'education-ai-agent',
    index: '08',
    title: 'Education AI Agent',
    shortTitle: 'Education AI',
    category: 'industry',
    demandTag: {
      ru: 'Schools, Colleges, Academies & Study Abroad',
      en: 'Schools, Colleges, Academies & Study Abroad',
    },
    oneLiner: {
      ru: 'Schools, colleges, coaching centers aur study-abroad consultants ke liye admissions inquiries, fee structure, scholarship criteria aur student counseling 24/7 sambhalta hai.',
      en: 'Automates admission inquiries, fee challan reminders, course counseling, and study-abroad eligibility checks for Pakistani institutes.',
    },
    metricHighlight: '3x Faster Admissions · 24/7 Parent & Student Desk',
    isFeaturedDemo: false,
    problem: {
      headline: 'Admission season mein parents aur students ke hazaron sawal aate hain — aur counseling desk busy hone se enrollments miss ho jati hain.',
      description: {
        ru: 'O/A Level schools, MDCAT/ECAT academies, universities, IT institutes aur Study Abroad (UK/Australia/Canada) consultancies ko admission season mein rozana 500+ messages aate hain. Parents fee structure, transport routes aur scholarship poochte hain, jabke students eligibility check karwana chahte hain.',
        en: 'During admission cycles, schools, coaching academies, and study-abroad consultancies get overwhelmed by thousands of parent and student inquiries about fees, eligibility, deadlines, and campus tours.',
      },
      painPoints: {
        ru: [
          'Admission counselors rozana wohi fee structure, prospectus aur last date ke sawal repeat karte hain',
          'Study-abroad consultancies mein 70% leads ineligible CGPA ya low budget wali hoti hain',
          'Monthly fee challan reminders aur PTM (Parent-Teacher Meeting) confirmations mein admin ka hafton ka waqt lagta hai',
        ],
        en: [
          'Admission officers spend all day repeating fee structures, subject combinations, and deadlines',
          'Study-abroad counselors waste hours on applicants who do not meet basic IELTS or budget criteria',
          'Manual fee voucher reminders and parent notifications take days of admin effort',
        ],
      },
    },
    howItWorks: [
      {
        step: '01',
        title: 'Instant Admissions & Eligibility Counselor',
        detail: {
          ru: 'Student ke marks/percentage, preferred program aur city pooch kar exact scholarship slab aur fee structure batata hai.',
          en: 'Asks for the student’s previous grades and program interest, instantly calculating merit scholarship eligibility and net fees.',
        },
      },
      {
        step: '02',
        title: 'Campus Tour / Senior Counselor Slot Booking',
        detail: {
          ru: 'Qualified students aur parents ke liye campus visit ya visa counselor ke sath 1-on-1 appointment book karta hai.',
          en: 'Books campus visits for parents or 1-on-1 visa counseling sessions only with qualified students.',
        },
      },
      {
        step: '03',
        title: 'Automated Fee Reminders & Parent Updates',
        detail: {
          ru: 'Parents ko WhatsApp par fee challan, attendance alert aur exam schedule Roman Urdu ya English mein bhejta hai.',
          en: 'Sends automated WhatsApp fee voucher links, exam schedules, and PTM slots to parents.',
        },
      },
    ],
    conversationContext: {
      ru: 'Scenario: Ek walid (parent) apne betay ke A-Level / BS Computer Science admission aur scholarship ke liye message karte hain.',
      en: 'Scenario: A parent messages an institute on WhatsApp asking about BS Computer Science admissions and merit scholarships.',
    },
    exampleConversation: [
      {
        speaker: 'customer',
        senderLabel: 'Parent (Mr. Nadeem)',
        time: '07:15 PM',
        text: 'Assalam-o-Alaikum, mere betay ne Inter Pre-Engineering mein 84% marks liye hain. Aap ke BS AI / Computer Science program ki semester fee kya hai aur 84% par scholarship milegi?',
      },
      {
        speaker: 'agent',
        senderLabel: 'HexaHive Education AI Agent',
        time: '07:15 PM',
        text: 'Walaikum Assalam Nadeem sahab! MashaAllah 84% marks par aap ka beta hamari "High Achiever Tier-1 Scholarship" (50% Tuition Fee Waiver) ke liye eligible hai! Normal semester fee Rs. 140,000 hai, lekin 50% scholarship ke baad aap ko sirf Rs. 70,000 per semester dena hoga.',
      },
      {
        speaker: 'customer',
        senderLabel: 'Parent (Mr. Nadeem)',
        time: '07:17 PM',
        text: 'Bohat acha! Entry test kab hai aur campus aakar labs dekh sakte hain?',
      },
      {
        speaker: 'agent',
        senderLabel: 'HexaHive Education AI Agent',
        time: '07:17 PM',
        text: 'Agla Entry Test is Saturday subah 10:00 AM hai. Main prospectus PDF bhej raha hoon — kya kal dopehar 12:30 PM aap aur aap ke betay ke liye Campus Tour + Admissions Head se mulaqat book kar doon?',
      },
      {
        speaker: 'customer',
        senderLabel: 'Parent (Mr. Nadeem)',
        time: '07:18 PM',
        text: 'Jee kal 12:30 PM confirm kar dein. Student name: Hamza Nadeem.',
      },
      {
        speaker: 'agent',
        senderLabel: 'HexaHive Education AI Agent',
        time: '07:18 PM',
        text: 'Confirmed! Hamza Nadeem ka Campus Tour Pass aur Saturday Entry Test Roll Number slip isi WhatsApp par jari kar di gayi hai.',
        note: 'High-Merit Admission Lead logged + Campus Tour booked',
      },
    ],
    deliverables: [
      '24/7 WhatsApp & Website Admissions Counselor (Urdu + English)',
      'Automated Merit Scholarship & Study-Abroad Visa Eligibility Calculator',
      'Prospectus PDF dispatch, test registration & campus visit scheduler',
      'Parent portal automation for fee challans, PTM booking & exam alerts',
    ],
  },

  // 09. Legal / Documentation Agent
  {
    slug: 'legal-documentation-agent',
    index: '09',
    title: 'Legal / Documentation Agent',
    shortTitle: 'Legal & Docs AI',
    category: 'industry',
    demandTag: {
      ru: 'Contracts, Rent Deeds, SECP/FBR & Case Intake',
      en: 'Contracts, Rent Deeds, SECP/FBR & Case Intake',
    },
    oneLiner: {
      ru: 'Law firms, tax consultants aur corporate legal teams ke liye client intake, rent/sale agreements, NDA/employment contracts aur SECP/FBR document checklist तैयार karta hai.',
      en: 'Automates client case intake, drafts Pakistani commercial agreements (rent deeds, NDAs, employment contracts), and verifies SECP/FBR document checklists.',
    },
    metricHighlight: '90% Faster First Drafts · Automated Document Checklist',
    isFeaturedDemo: false,
    problem: {
      headline: 'Lawyers, tax consultants aur corporate teams ka adha waqt standard agreements draft karne aur clients se अधूरे documents mangwane mein nikal jata hai.',
      description: {
        ru: 'Law chambers, tax practitioners (FBR/NTN/SECP), real estate transfer offices aur corporate legal departments ko rozana standard NDAs, Commercial Tenancy Agreements, Employment Contracts aur Sale Deeds banani parti hain — aur clients se CNIC, utility bills aur bank statements collect karne mein hafton lag jate hain.',
        en: 'Pakistani law firms, tax consultants, and corporate legal teams spend hours drafting repetitive tenancy agreements, NDAs, and employment contracts, or chasing clients on WhatsApp for missing SECP/FBR documents.',
      },
      painPoints: {
        ru: [
          'Junior associates standard rent agreements, NDAs aur service contracts copy-paste karne mein ghanton lagate hain',
          'SECP company registration ya tax filing ke liye client adhe documents bhejta hai aur bar bar follow-up karna parta hai',
          'Naye legal clients jab initial consultation ke liye rabta karte hain toh un ke case facts structured form mein nahi milte',
        ],
        en: [
          'Associates lose billable hours drafting repetitive tenancy deeds, NDAs, and vendor contracts',
          'Clients send incomplete documents for SECP incorporation, trademark, or FBR tax filing',
          'Unstructured WhatsApp voice notes from prospective clients make case triage slow',
        ],
      },
    },
    howItWorks: [
      {
        step: '01',
        title: 'Guided Conversational Case & Document Intake',
        detail: {
          ru: 'Client se WhatsApp ya web portal par sawal pooch kar party names, CNIC numbers, property/contract terms aur CNIC photos collect aur verify karta hai.',
          en: 'Interviews the client via WhatsApp or web form to collect party details, CNICs, contract clauses, and required attachments.',
        },
      },
      {
        step: '02',
        title: 'Instant First-Draft Generation (Word / PDF)',
        detail: {
          ru: 'Pakistani contract templates ke mutabiq 60 second mein clean DOCX/PDF draft bana kar senior lawyer ke review ke liye bhej deta hai.',
          en: 'Generates a formatted DOCX/PDF agreement draft grounded in your firm’s approved Pakistani legal templates in 60 seconds.',
        },
      },
      {
        step: '03',
        title: 'Clause Risk Flagging & Missing Document Chase',
        detail: {
          ru: 'Agar kisi vendor contract mein risky clause ho toh highlight karta hai, aur pending documents par client ko automatic reminder bhejta hai.',
          en: 'Flags risky indemnity or termination clauses in incoming contracts and automatically chases clients for missing compliance files.',
        },
      },
    ],
    conversationContext: {
      ru: 'Scenario: Ek corporate client Clifton mein commercial office lease agreement aur SECP filing ke liye legal agent se rabta karta hai.',
      en: 'Scenario: A business owner uses the Legal & Documentation Agent to prepare a commercial office lease in Karachi.',
    },
    exampleConversation: [
      {
        speaker: 'customer',
        senderLabel: 'Client (Saad — Tech Founder)',
        time: '02:20 PM',
        text: 'Salam, humein Clifton Block 4 mein 2,200 sq.ft office ke liye Commercial Tenancy Agreement draft karwana hai. Monthly rent 3.5 Lac hai, 6 months advance aur 3 months security deposit.',
      },
      {
        speaker: 'agent',
        senderLabel: 'HexaHive Legal & Docs Agent',
        time: '02:20 PM',
        text: 'Walaikum Assalam Saad sahab! Sindh Rented Premises Ordinance, 1979 ke mutabiq aap ka Commercial Lease Draft tayyar karne ke liye 3 cheezein bata dein:\n1) Annual rent escalation kitne % tay hui hai (usually 10%)?\n2) Lock-in period aur notice period kitna rakhna hai?\n3) Landlord aur Tenant company ke CNIC / NTN ki photo bhej dein.',
      },
      {
        speaker: 'customer',
        senderLabel: 'Client (Saad — Tech Founder)',
        time: '02:23 PM',
        text: '10% annual increase hai, 2 months notice period. CNIC aur company NTN attach kar diya hai.',
      },
      {
        speaker: 'agent',
        senderLabel: 'HexaHive Legal & Docs Agent',
        time: '02:23 PM',
        text: 'Shukriya! CNIC aur NTN details extract ho gayi hain. 14-page Commercial Lease Agreement (with sub-letting & stamp duty schedule) ka draft Word aur PDF mein tayyar kar ke Advocate Rizwan ke review queue mein bhej diya hai. Kal subah 11 AM aap ko final vetted copy mil jayegi.',
        note: 'Commercial Lease Draft (.docx) generated + OCR verified CNIC/NTN attached',
      },
    ],
    deliverables: [
      'Automated Pakistani Contract & Agreement Drafter (Tenancy, Sale Deed, NDA, Employment, Service SLA)',
      'WhatsApp & Web Document Checklist Collector with CNIC/NTN OCR extraction',
      'SECP Incorporation, Trademark & FBR Tax Filing intake automation',
      'Incoming vendor contract summarizer & risky-clause highlighter for legal teams',
    ],
  },

  // 10. Making Websites (AI-Powered Web & Software Engineering)
  {
    slug: 'ai-websites',
    index: '10',
    title: 'AI-Powered Websites & Custom Portals',
    shortTitle: 'Making Websites',
    category: 'b2b-web',
    demandTag: {
      ru: '95+ Lighthouse · Built-In AI Sales Agent',
      en: '95+ Lighthouse · Built-In AI Sales Agent',
    },
    oneLiner: {
      ru: 'Aap ke software house, brand, clinic ya enterprise ke liye ultra-fast Next.js/React websites aur custom web portals jin mein AI sales agent pehle din se built-in hota hai.',
      en: 'High-speed, 3D-crafted Next.js/React websites, e-commerce stores, and custom web portals with a trained AI sales agent built in from day one.',
    },
    metricHighlight: '95+ Lighthouse Speed · Built-In AI Lead Closer',
    isFeaturedDemo: false,
    problem: {
      headline: 'Aam websites sirf digital brochure hoti hain — visitor aata hai, parhta hai aur bina rabta kiye chala jata hai.',
      description: {
        ru: 'Pakistani businesses website banwa to lete hain, lekin woh ya toh mobile par 8 second mein khulti hai ya us par sirf ek static "Contact Us" form hota hai jisay koi fill nahi karta. Hamari websites mein modern 3D UI/UX aur trained AI sales agent pehle din se shamil hota hai.',
        en: 'Most agency websites act like static brochures: slow on 4G mobile data and ending with a boring contact form nobody fills out. We engineer sub-second websites where an embedded AI agent actively answers questions, calculates quotes, and captures leads.',
      },
      painPoints: {
        ru: [
          'Slow WordPress templates jo mobile 4G par load hone mein 6–8 second lete hain',
          'Visitors ko apni exact requirement ya quote ka jawab nahi milta toh woh bounce kar jate hain',
          'Contact form ki leads email inbox mein pari rehti hain, WhatsApp ya Google Sheet mein nahi aatin',
        ],
        en: [
          'Bloated templates that take 7+ seconds to load on Pakistani mobile networks',
          'Visitors bounce when they cannot get an instant price estimate or answer',
          'Static contact forms with zero connection to WhatsApp or Google Sheets',
        ],
      },
    },
    howItWorks: [
      {
        step: '01',
        title: 'Clean, Mobile-First Next.js & TypeScript Engineering',
        detail: {
          ru: '90+ Lighthouse score, professional 3D UI/UX aur Roman Urdu / English copy jo aap ke customers ko foran convert kare.',
          en: 'Engineered with Next.js/React, TypeScript, and Tailwind for 90+ Lighthouse performance and instant loading on mobile.',
        },
      },
      {
        step: '02',
        title: 'Embedded AI Sales & Quote Agent',
        detail: {
          ru: 'Website ke andar laga AI widget visitor ke sawal ka jawab deta hai, price estimate banata hai aur WhatsApp number capture karta hai.',
          en: 'An embedded AI agent trained on your services answers visitor questions, calculates rough quotes, and captures phone numbers.',
        },
      },
      {
        step: '03',
        title: 'Direct Lead Routing to Email, CRM & Google Sheets',
        detail: {
          ru: 'Har form submission aur AI chat lead seedha aap ki Google Sheet, email (Resend) aur WhatsApp par aati hai.',
          en: 'Every form submission and chat lead lands instantly in your Google Sheet, inbox, and WhatsApp.',
        },
      },
    ],
    conversationContext: {
      ru: 'Scenario: Visitor company ki website par raat ko aata hai aur built-in AI widget se instant quote mangta hai.',
      en: 'Scenario: A visitor lands on your website and uses the built-in AI chat to get an instant project quote.',
    },
    exampleConversation: [
      {
        speaker: 'customer',
        senderLabel: 'Website Visitor',
        time: '08:15 PM',
        text: 'Mujhe apni export company ke liye modern corporate website + WhatsApp AI catalog agent banwana hai. Kitna time lagega?',
      },
      {
        speaker: 'agent',
        senderLabel: 'Built-In Website AI Agent',
        time: '08:15 PM',
        text: 'Hum aap ki complete Next.js Corporate Website (with product catalog, SEO, aur built-in AI Buyer Assistant) 10 se 12 din mein design aur deploy kar dete hain. Pehle 3 din mein hum aap ko homepage + AI agent ka free interactive demo dikhayenge. Apna WhatsApp number share kar dein?',
      },
      {
        speaker: 'customer',
        senderLabel: 'Website Visitor',
        time: '08:16 PM',
        text: '0321-XXXXXXX, Farhan textile exports.',
      },
      {
        speaker: 'agent',
        senderLabel: 'Built-In Website AI Agent',
        time: '08:16 PM',
        text: 'Shukriya Farhan sahab! Portfolio links aap ke WhatsApp par bhej diye hain aur hamari Team Lead Syeda Farzana Shah kal subah 11 AM aap ke sath 15-min discovery call kar lengi.',
        note: 'Website visitor converted to verified phone lead in 60 seconds',
      },
    ],
    deliverables: [
      'Custom responsive Next.js / React marketing website or B2B web portal (90+ Lighthouse)',
      'Built-in AI chat & instant quote calculator trained on your business',
      'Contact form wired to Resend Email + Google Sheets + WhatsApp alerts',
      'Full technical SEO, Open Graph social cards, sitemap.xml & LocalBusiness JSON-LD',
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return servicesData.find((s) => s.slug === slug);
}

export const featuredDemos = servicesData.filter((s) => s.isFeaturedDemo);
