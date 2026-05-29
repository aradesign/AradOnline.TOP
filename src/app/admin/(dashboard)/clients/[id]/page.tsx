import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ClientForm } from "@/components/admin/ClientForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditClientPage({ params }: Props) {
  const { id } = await params;
  const item = await prisma.clientLogo.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">ویرایش مشتری</h1>
      <ClientForm initial={item} />
    </div>
  );
}
