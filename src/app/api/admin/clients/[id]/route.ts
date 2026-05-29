import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await request.json();

  const item = await prisma.clientLogo.update({
    where: { id },
    data: {
      name: body.name,
      logoUrl: body.logoUrl,
      websiteUrl: body.websiteUrl || null,
      published: body.published,
      sortOrder: body.sortOrder,
    },
  });

  return NextResponse.json(item);
}

export async function DELETE(_req: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await prisma.clientLogo.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
