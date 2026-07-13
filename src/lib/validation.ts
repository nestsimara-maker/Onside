import { z } from "zod";
import { CATEGORIES } from "@/lib/constants";

const categoryValues = CATEGORIES.map((c) => c.category) as [string, ...string[]];

export const listingSchema = z.object({
  category: z.enum(categoryValues),
  name: z.string().trim().min(2, "Required").max(120),
  tagline: z.string().trim().max(160).optional().or(z.literal("")),
  description: z.string().trim().min(20, "Tell us a bit more (20+ characters)").max(2000),
  website: z.string().trim().max(200).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email"),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  tags: z.string().trim().max(200).optional().or(z.literal("")),
  needs: z.string().trim().max(500).optional().or(z.literal("")),
  offering: z.string().trim().max(500).optional().or(z.literal("")),
  fundingStage: z.string().trim().max(80).optional().or(z.literal("")),
  investmentFocus: z.string().trim().max(200).optional().or(z.literal("")),
  ticketSize: z.string().trim().max(80).optional().or(z.literal("")),
  program: z.string().trim().max(500).optional().or(z.literal("")),
  fieldOfStudy: z.string().trim().max(120).optional().or(z.literal("")),
  availability: z.string().trim().max(80).optional().or(z.literal("")),
});

export type ListingInput = z.infer<typeof listingSchema>;

export const serviceInquirySchema = z.object({
  service: z.string().trim().min(2).max(120),
  name: z.string().trim().min(2, "Required").max(120),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email"),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type ServiceInquiryInput = z.infer<typeof serviceInquirySchema>;

export const eventSchema = z.object({
  title: z.string().trim().min(2, "Required").max(160),
  vertical: z.string().trim().min(2, "Required").max(60),
  description: z.string().trim().min(10, "Tell us a bit more").max(2000),
  date: z.string().trim().min(1, "Required"),
  location: z.string().trim().min(2, "Required").max(160),
  organizer: z.string().trim().min(2, "Required").max(160),
  url: z
    .string()
    .trim()
    .min(1, "Required")
    .refine((v) => /^https?:\/\/.+\..+/.test(v), "Enter a full URL (https://...)"),
});

export type EventInput = z.infer<typeof eventSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Required").max(120),
  email: z.string().trim().email("Enter a valid email"),
  subject: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a bit more").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;
