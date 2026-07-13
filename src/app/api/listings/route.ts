import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { listingSchema } from "@/lib/validation";
import type { ListingCategory } from "@/generated/prisma/enums";

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get("category");
  const listings = await prisma.listing.findMany({
    where: category ? { category: category as ListingCategory } : undefined,
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ listings });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = listingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const data = parsed.data;
  const listing = await prisma.listing.create({
    data: {
      category: data.category as ListingCategory,
      name: data.name,
      tagline: data.tagline || null,
      description: data.description,
      website: data.website || null,
      email: data.email,
      location: data.location || null,
      tags: data.tags || null,
      needs: data.needs || null,
      offering: data.offering || null,
      fundingStage: data.fundingStage || null,
      investmentFocus: data.investmentFocus || null,
      ticketSize: data.ticketSize || null,
      program: data.program || null,
      fieldOfStudy: data.fieldOfStudy || null,
      availability: data.availability || null,
    },
  });

  return NextResponse.json({ listing }, { status: 201 });
}
