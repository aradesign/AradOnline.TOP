import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PortfolioForm } from "@/components/admin/PortfolioForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditPortfolioPage({ params }: Props) {
  const { id } = await params;
  const item = await prisma.portfolioProject.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-dark">ویرایش پروژه</h1>
      <PortfolioForm initial={item} />
    </div>
  );
}
