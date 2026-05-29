import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const items = await prisma.testimonial.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const item = await prisma.testimonial.create({
    data: {
      name: body.name,
      role: body.role,
      city: body.city,
      text: body.text,
      rating: body.rating ?? 5,
      published: body.published ?? true,
      sortOrder: body.sortOrder ?? 0,
    },
  });
  return NextResponse.json(item);
}
