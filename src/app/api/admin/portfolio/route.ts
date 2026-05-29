import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const items = await prisma.portfolioProject.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  let slug = body.slug?.trim() || slugify(body.title);
  const existing = await prisma.portfolioProject.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now()}`;

  const item = await prisma.portfolioProject.create({
    data: {
      title: body.title,
      slug,
      category: body.category,
      city: body.city,
      excerpt: body.excerpt || null,
      content: body.content || "",
      coverGradient: body.coverGradient || "from-teal-500/20 to-cyan-500/20",
      clientName: body.clientName || null,
      projectUrl: body.projectUrl || null,
      services: body.services || null,
      year: body.year || null,
      published: body.published ?? true,
      featured: body.featured ?? false,
      sortOrder: body.sortOrder ?? 0,
      thumbnailUrl: body.thumbnailUrl || null,
      screenshotUrl: body.screenshotUrl || null,
      galleryImages: body.galleryImages || null,
    },
  });

  return NextResponse.json(item);
}
