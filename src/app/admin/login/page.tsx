"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("رمز عبور اشتباه است");
    }
    setLoading(false);
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-section px-4"
      dir="rtl"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-card"
      >
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white">
            آ
          </div>
          <h1 className="text-xl font-bold text-slate-dark">ورود به پنل مدیریت</h1>
          <p className="mt-1 text-sm text-slate-muted">آراد وب CMS</p>
        </div>

        <label className="mb-2 block text-sm font-medium">رمز عبور</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          placeholder="رمز عبور را وارد کنید"
          required
        />

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-primary py-3 font-semibold text-white hover:bg-primary-light disabled:opacity-60"
        >
          {loading ? "در حال ورود..." : "ورود"}
        </button>

        <p className="mt-4 text-center text-xs text-slate-muted">
          پیش‌فرض توسعه: <code dir="ltr">arad1404</code>
        </p>
      </form>
    </div>
  );
}
