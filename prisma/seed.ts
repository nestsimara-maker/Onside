import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "node:path";

const adapter = new PrismaBetterSqlite3({
  url: path.join(process.cwd(), "dev.db"),
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.contactMessage.deleteMany();
  await prisma.serviceInquiry.deleteMany();
  await prisma.event.deleteMany();
  await prisma.listing.deleteMany();

  await prisma.listing.createMany({
    data: [
      {
        category: "COMPANY",
        name: "Nomad Freight",
        tagline: "Cross-border logistics software for SMEs",
        description:
          "We build tracking and customs-documentation software for small importers moving goods between Southeast Asia and China. Live in 4 ports, looking to expand into Ningbo and Qingdao.",
        website: "https://nomadfreight.example.com",
        email: "team@nomadfreight.example.com",
        location: "Shenzhen, China",
        tags: "logistics, SaaS, cross-border",
        needs: "Warehouse partners in Ningbo, seed funding",
        offering: "White-label customs tracking API",
        fundingStage: "Seed",
      },
      {
        category: "COMPANY",
        name: "Verdant Foods",
        tagline: "Plant-based ingredients for foodservice",
        description:
          "Verdant supplies plant-based protein ingredients to restaurant chains and food manufacturers. We're localizing our supply chain in the Greater Bay Area and looking for distribution partners.",
        website: "https://verdantfoods.example.com",
        email: "hello@verdantfoods.example.com",
        location: "Guangzhou, China",
        tags: "foodtech, sustainability, B2B",
        needs: "Distribution partners, cold-chain logistics",
        offering: "Private-label plant protein formulations",
        fundingStage: "Series A",
      },
      {
        category: "COMPANY",
        name: "Kite Language Labs",
        tagline: "AI-assisted business Mandarin training",
        description:
          "We help foreign executives and their teams reach working fluency in business Mandarin using an AI tutor plus live coaching. Used by 60+ companies onboarding staff in China.",
        website: "https://kitelanguage.example.com",
        email: "founders@kitelanguage.example.com",
        location: "Shanghai, China",
        tags: "edtech, HR, AI",
        needs: "Corporate HR partnerships, distribution",
        offering: "Enterprise language training platform",
        fundingStage: "Pre-seed",
      },
      {
        category: "CORPORATE",
        name: "Meridian Industrial Group",
        tagline: "Global manufacturer of precision components",
        description:
          "Meridian operates 14 manufacturing sites worldwide. Our China innovation office is sourcing automation and quality-inspection technology to modernize two Suzhou plants.",
        website: "https://meridian-industrial.example.com",
        email: "innovation@meridian-industrial.example.com",
        location: "Suzhou, China",
        tags: "manufacturing, automation, enterprise",
        needs: "Computer-vision QA startups, robotics integrators",
        offering: "Pilot lines, co-development budget, procurement access",
      },
      {
        category: "CORPORATE",
        name: "Beacon Retail Holdings",
        tagline: "Pan-Asian retail & e-commerce group",
        description:
          "Beacon operates department stores and a fast-growing e-commerce arm across five markets. We're recruiting a VP of Data Science and scouting personalization technology.",
        website: "https://beaconretail.example.com",
        email: "careers@beaconretail.example.com",
        location: "Hong Kong",
        tags: "retail, e-commerce, data",
        needs: "VP Data Science, personalization / recommendation tech",
        offering: "Access to 40M+ customer base for pilots",
      },
      {
        category: "INVESTOR",
        name: "Pinnacle Ridge Capital",
        tagline: "Early-stage VC backing cross-border founders",
        description:
          "Pinnacle Ridge invests in seed and Series A companies building bridges between China and Southeast Asia — logistics, fintech, and supply chain software.",
        website: "https://pinnacleridge.example.com",
        email: "deals@pinnacleridge.example.com",
        location: "Singapore",
        tags: "venture capital, seed, series A",
        needs: "Logistics, fintech, and supply-chain software founders",
        offering: "Capital, regional GTM support, banking introductions",
        investmentFocus: "Cross-border logistics, fintech, B2B SaaS",
        ticketSize: "$250K – $3M",
      },
      {
        category: "INVESTOR",
        name: "Jade Harbor Ventures",
        tagline: "Growth equity for consumer & hardtech",
        description:
          "Jade Harbor writes growth-stage checks into consumer brands and hardtech companies scaling manufacturing in the Greater Bay Area.",
        website: "https://jadeharbor.example.com",
        email: "invest@jadeharbor.example.com",
        location: "Shenzhen, China",
        tags: "growth equity, consumer, hardtech",
        needs: "Series B+ consumer and hardtech companies",
        offering: "Growth capital, manufacturing network access",
        investmentFocus: "Consumer brands, hardtech, robotics",
        ticketSize: "$5M – $25M",
      },
      {
        category: "BANK",
        name: "Continental Trust Bank",
        tagline: "Corporate banking for foreign-invested enterprises",
        description:
          "Continental Trust offers multi-currency corporate accounts, trade finance, and FX hedging built specifically for foreign-invested enterprises operating in China.",
        website: "https://continentaltrust.example.com",
        email: "corporate@continentaltrust.example.com",
        location: "Shanghai, China",
        tags: "corporate banking, trade finance, FX",
        needs: "Foreign-invested SMEs and scale-ups",
        offering: "Multi-currency accounts, trade finance, FX hedging",
      },
      {
        category: "BANK",
        name: "Silk Road Commercial Bank",
        tagline: "Cross-border payments & lending",
        description:
          "Silk Road Commercial Bank specializes in cross-border settlement and working-capital lending for exporters trading along the Belt and Road corridor.",
        website: "https://silkroadbank.example.com",
        email: "sme@silkroadbank.example.com",
        location: "Beijing, China",
        tags: "payments, lending, trade",
        needs: "Exporters and trading companies",
        offering: "Cross-border settlement, working-capital loans",
      },
      {
        category: "GOVERNMENT",
        name: "Qianhai Free Trade Zone Authority",
        tagline: "Tax incentives & office space for fintech and logistics",
        description:
          "The Qianhai FTZ Authority offers a reduced corporate tax rate, subsidized office space, and fast-track licensing for qualifying fintech, logistics, and professional-services companies.",
        website: "https://qianhai.example.gov.cn",
        email: "invest@qianhai.example.gov.cn",
        location: "Shenzhen, China",
        tags: "free trade zone, tax incentive, fintech",
        needs: "Fintech, logistics, professional services firms",
        offering: "15% corporate tax rate, subsidized office space",
        program: "Qianhai Qualified FIE Tax Incentive — up to 40% rent subsidy for 3 years",
      },
      {
        category: "GOVERNMENT",
        name: "Suzhou Industrial Park Bureau",
        tagline: "Industrial park for advanced manufacturing & biotech",
        description:
          "Suzhou Industrial Park provides land-use grants, R&D subsidies, and talent-relocation funds to advanced manufacturing and biotech companies setting up production.",
        website: "https://sipac.example.gov.cn",
        email: "investment@sipac.example.gov.cn",
        location: "Suzhou, China",
        tags: "industrial park, biotech, manufacturing",
        needs: "Advanced manufacturing and biotech investors",
        offering: "Land-use grants, R&D subsidies, talent relocation funds",
        program: "SIP Biotech Acceleration Fund — up to RMB 20M per qualifying project",
      },
      {
        category: "STUDENT",
        name: "Mei Lin Zhou",
        tagline: "MBA candidate, cross-border finance",
        description:
          "Second-year MBA student focused on cross-border M&A and trade finance. Previously interned at a Shanghai-based investment bank. Fluent in Mandarin, English, and French.",
        email: "meilin.zhou@example.edu",
        location: "Shanghai, China",
        tags: "finance, MBA, cross-border",
        needs: "Summer internship in investment banking or corporate finance",
        offering: "Trilingual, deal-modeling experience, M&A coursework",
        fieldOfStudy: "MBA, Finance",
        availability: "Summer internship",
      },
      {
        category: "STUDENT",
        name: "Arjun Patel",
        tagline: "Computer science senior, supply-chain ML",
        description:
          "Final-year computer science student building demand-forecasting models as part of a capstone with a logistics startup. Looking for a full-time role in applied ML after graduation.",
        email: "arjun.patel@example.edu",
        location: "Shenzhen, China",
        tags: "computer science, machine learning, logistics",
        needs: "Full-time applied ML role after graduation",
        offering: "Python, forecasting models, logistics domain project",
        fieldOfStudy: "Computer Science",
        availability: "Full-time, starts in 6 months",
      },
    ],
  });

  const inTwoWeeks = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d;
  };

  await prisma.event.createMany({
    data: [
      {
        title: "China Tech Bridge Summit",
        vertical: "Technology",
        description:
          "A two-day summit connecting overseas tech founders with China-based manufacturers, distributors, and enterprise buyers.",
        date: inTwoWeeks(18),
        location: "Shenzhen, China",
        organizer: "Bay Area Tech Council",
        url: "https://example.com/china-tech-bridge-summit",
        featured: true,
      },
      {
        title: "Cross-Border Capital Forum",
        vertical: "Finance & Investment",
        description:
          "VCs, banks, and growth-stage founders discuss cross-border fundraising, FX strategy, and exit pathways.",
        date: inTwoWeeks(31),
        location: "Hong Kong",
        organizer: "Pinnacle Ridge Capital",
        url: "https://example.com/cross-border-capital-forum",
      },
      {
        title: "Free Trade Zone Investor Day",
        vertical: "Legal & Policy",
        description:
          "Qianhai and Suzhou authorities present tax incentives, land grants, and licensing fast-tracks for new investors.",
        date: inTwoWeeks(45),
        location: "Shenzhen, China",
        organizer: "Qianhai Free Trade Zone Authority",
        url: "https://example.com/ftz-investor-day",
      },
      {
        title: "Advanced Manufacturing Expo",
        vertical: "Trade & Manufacturing",
        description:
          "Factory tours, supplier matchmaking, and automation showcases across the Yangtze River Delta manufacturing corridor.",
        date: inTwoWeeks(60),
        location: "Suzhou, China",
        organizer: "Suzhou Industrial Park Bureau",
        url: "https://example.com/advanced-manufacturing-expo",
      },
      {
        title: "Campus to Career: China Talent Fair",
        vertical: "Talent & Careers",
        description:
          "University students meet recruiters from corporates and scale-ups hiring across finance, engineering, and operations.",
        date: inTwoWeeks(24),
        location: "Shanghai, China",
        organizer: "Altura Talent Network",
        url: "https://example.com/campus-to-career-fair",
      },
      {
        title: "Green Supply Chain Symposium",
        vertical: "Sustainability",
        description:
          "Manufacturers and investors share strategies for decarbonizing cross-border supply chains.",
        date: inTwoWeeks(52),
        location: "Guangzhou, China",
        organizer: "Verdant Foods",
        url: "https://example.com/green-supply-chain-symposium",
      },
    ],
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
