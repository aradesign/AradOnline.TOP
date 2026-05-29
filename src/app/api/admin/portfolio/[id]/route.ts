import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const item = await prisma.portfolioProject.findUnique({ where: { id } });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(request: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await request.json();

  const item = await prisma.portfolioProject.update({
    where: { id },
    data: {
      title: body.title,
      slug: body.slug,
      category: body.category,
      city: body.city,
      excerpt: body.excerpt || null,
      content: body.content,
      coverGradient: body.coverGradient,
      clientName: body.clientName || null,
      projectUrl: body.projectUrl || null,
      services: body.services || null,
      year: body.year || null,
      published: body.published,
      featured: body.featured,
      sortOrder: body.sortOrder,
      thumbnailUrl: body.thumbnailUrl || null,
      screenshotUrl: body.screenshotUrl || null,
      galleryImages: body.galleryImages || null,
    },
  });

  return NextResponse.json(item);
}

export async function DELETE(_req: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await prisma.portfolioProject.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
