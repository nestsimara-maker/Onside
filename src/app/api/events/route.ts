import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { eventSchema } from "@/lib/validation";

export async function GET(req: NextRequest) {
  const vertical = req.nextUrl.searchParams.get("vertical");
  const events = await prisma.event.findMany({
    where: vertical ? { vertical } : undefined,
    orderBy: { date: "asc" },
  });
  return NextResponse.json({ events });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = eventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const data = parsed.data;
  const date = new Date(data.date);
  if (Number.isNaN(date.getTime())) {
    return NextResponse.json(
      { error: "Validation failed", issues: { fieldErrors: { date: ["Invalid date"] } } },
      { status: 422 },
    );
  }

  const url = /^https?:\/\//.test(data.url) ? data.url : `https://${data.url}`;

  const event = await prisma.event.create({
    data: {
      title: data.title,
      vertical: data.vertical,
      description: data.description,
      date,
      location: data.location,
      organizer: data.organizer,
      url,
    },
  });

  return NextResponse.json({ event }, { status: 201 });
}
