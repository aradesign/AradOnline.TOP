import { prisma } from "@/lib/prisma";
import { SubmissionsList } from "@/components/admin/SubmissionsList";

export default async function AdminSubmissionsPage() {
  const items = await prisma.formSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-slate-dark">درخواست‌های فرم</h1>
      <p className="mb-8 text-slate-muted">لیست ورودی‌های مشاوره رایگان</p>
      <SubmissionsList initial={items} />
    </div>
  );
}
