"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export function DeleteButton({ url, label }: { url: string; label: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`حذف «${label}»؟`)) return;
    await fetch(url, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="rounded-lg p-2 text-red-500 hover:bg-red-50"
    >
      <Trash2 size={16} />
    </button>
  );
}
