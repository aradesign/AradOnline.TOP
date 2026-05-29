import { prisma } from "./prisma";

export async function getPublishedPortfolio() {
  return prisma.portfolioProject.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
}

export async function getPortfolioBySlug(slug: string) {
  return prisma.portfolioProject.findFirst({
    where: { slug, published: true },
  });
}

export async function getPublishedTestimonials() {
  return prisma.testimonial.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
}

export async function getPublishedClientLogos() {
  return prisma.clientLogo.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
}

export async function getUnreadSubmissionsCount() {
  return prisma.formSubmission.count({ where: { read: false } });
}
