import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const items = await prisma.clientLogo.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  if (!body.name?.trim() || !body.logoUrl?.startsWith("/uploads/")) {
    return NextResponse.json({ error: "نام و لوگو الزامی است" }, { status: 400 });
  }

  const item = await prisma.clientLogo.create({
    data: {
      name: body.name.trim(),
      logoUrl: body.logoUrl,
      websiteUrl: body.websiteUrl?.trim() || null,
      published: body.published ?? true,
      sortOrder: body.sortOrder ?? 0,
    },
  });

  return NextResponse.json(item);
}
