import type { ListingCategory } from "@/generated/prisma/enums";

export type CategoryMeta = {
  slug: string;
  category: ListingCategory;
  label: string;
  singular: string;
  tagline: string;
  description: string;
  colorVar: string;
  fields: {
    needsLabel: string;
    offeringLabel: string;
  };
};

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: "companies",
    category: "COMPANY",
    label: "Companies",
    singular: "Company",
    tagline: "List your needs and promote your business",
    description:
      "Startups and SMEs looking for partners, capital, distribution, or talent inside the China market and beyond.",
    colorVar: "var(--color-cat-company)",
    fields: {
      needsLabel: "What are you looking for?",
      offeringLabel: "What do you offer?",
    },
  },
  {
    slug: "corporates",
    category: "CORPORATE",
    label: "Corporates",
    singular: "Corporate",
    tagline: "Announce tech needs, recruit talent, find investments",
    description:
      "Established enterprises sourcing technology, innovation partners, acquisition targets, or senior talent.",
    colorVar: "var(--color-cat-corporate)",
    fields: {
      needsLabel: "Technology / talent needs",
      offeringLabel: "What you bring to partners",
    },
  },
  {
    slug: "investors",
    category: "INVESTOR",
    label: "Investors",
    singular: "Investor",
    tagline: "Find companies to invest in",
    description:
      "Venture capital, private equity, and angel investors scouting their next portfolio company.",
    colorVar: "var(--color-cat-investor)",
    fields: {
      needsLabel: "Investment thesis / what you're sourcing",
      offeringLabel: "What you offer portfolio companies",
    },
  },
  {
    slug: "banks",
    category: "BANK",
    label: "Banks",
    singular: "Bank",
    tagline: "Promote your services and reach new clients",
    description:
      "Banks and financial institutions presenting corporate banking, trade finance, and cross-border products.",
    colorVar: "var(--color-cat-bank)",
    fields: {
      needsLabel: "Target clients",
      offeringLabel: "Products & services",
    },
  },
  {
    slug: "governments",
    category: "GOVERNMENT",
    label: "Governments",
    singular: "Government body",
    tagline: "Promote funds, grants, industrial parks & industries",
    description:
      "Municipal and provincial agencies, industrial parks, and trade bureaus promoting incentives to investors.",
    colorVar: "var(--color-cat-government)",
    fields: {
      needsLabel: "Priority industries",
      offeringLabel: "Funds, grants & incentives",
    },
  },
  {
    slug: "students",
    category: "STUDENT",
    label: "Students",
    singular: "Student",
    tagline: "Learn and find future work opportunities",
    description:
      "Students and recent graduates building skills and connecting with employers across Altura's network.",
    colorVar: "var(--color-cat-student)",
    fields: {
      needsLabel: "Looking for",
      offeringLabel: "Skills & background",
    },
  },
];

export function getCategoryBySlug(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export type ServiceMeta = {
  slug: string;
  title: string;
  summary: string;
  deliverables: string[];
};

export const SERVICES: ServiceMeta[] = [
  {
    slug: "entity-registration",
    title: "Entity Registration",
    summary:
      "WFOE, joint venture, and representative office formation, from name approval to business license.",
    deliverables: [
      "Structure & feasibility advisory",
      "Business scope & name approval",
      "Business license & company chops",
      "Registered address support",
    ],
  },
  {
    slug: "bank-account-opening",
    title: "Corporate Bank Account Opening",
    summary:
      "End-to-end coordination with domestic and international banks to get your corporate account live.",
    deliverables: [
      "Bank selection & introductions",
      "Document preparation",
      "In-person bank interview support",
      "Multi-currency & cross-border setup",
    ],
  },
  {
    slug: "taxation-accounting",
    title: "Taxation & Accounting",
    summary:
      "Ongoing bookkeeping, tax filing, and compliance so you stay in good standing every month.",
    deliverables: [
      "Monthly bookkeeping & reporting",
      "VAT & corporate income tax filing",
      "Payroll tax & social insurance",
      "Annual audit coordination",
    ],
  },
  {
    slug: "grants-subsidies",
    title: "Grants & Subsidies Applications",
    summary:
      "Identify and apply for government funds, R&D subsidies, and industrial park incentives.",
    deliverables: [
      "Eligibility screening",
      "Application drafting & submission",
      "Government liaison",
      "Post-award compliance",
    ],
  },
  {
    slug: "visa-residence",
    title: "Visa & Residence Permits",
    summary:
      "Work visas, residence permits, and family dependent visas for founders, staff, and their families.",
    deliverables: [
      "Work permit applications",
      "Residence permit renewals",
      "Dependent & family visas",
      "Talent visa programs",
    ],
  },
  {
    slug: "legal-translation",
    title: "Legal & Certified Translation",
    summary:
      "Certified translation and notarization of contracts, filings, and corporate documents.",
    deliverables: [
      "Certified document translation",
      "Contract & filing translation",
      "Notarization coordination",
      "Interpreter support for meetings",
    ],
  },
  {
    slug: "ip-trademark",
    title: "IP & Trademark Registration",
    summary:
      "Protect your brand and inventions with trademark, patent, and copyright registration.",
    deliverables: [
      "Trademark search & filing",
      "Patent application support",
      "Copyright registration",
      "IP enforcement guidance",
    ],
  },
  {
    slug: "hr-payroll",
    title: "HR, Payroll & Compliance",
    summary:
      "Employment contracts, payroll administration, and labor law compliance for local hires.",
    deliverables: [
      "Employment contract drafting",
      "Monthly payroll processing",
      "Social insurance & housing fund",
      "Labor law compliance advisory",
    ],
  },
];

export const EVENT_VERTICALS = [
  "Technology",
  "Finance & Investment",
  "Trade & Manufacturing",
  "Legal & Policy",
  "Talent & Careers",
  "Sustainability",
] as const;
