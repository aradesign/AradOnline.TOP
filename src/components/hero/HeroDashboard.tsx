"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  ShoppingCart,
  Eye,
  CheckCircle2,
  Clock,
  Globe,
  Wifi,
} from "lucide-react";
import { dashboardOrders } from "@/lib/data";

export function HeroDashboard() {
  return (
    <div className="relative mx-auto w-full max-w-[420px] lg:max-w-[460px]">
      <div className="hero-dashboard-glow absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/20 via-secondary-blue/10 to-secondary-orange/10 blur-2xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hero-dashboard-card relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_24px_64px_rgba(0,102,102,0.14)]"
      >
        <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-section-bg)] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white btn-neon">
              آ
            </div>
            <div>
              <p className="text-sm font-bold text-slate-dark">پنل فروشگاه</p>
              <p className="text-xs text-slate-muted">aradweb.ir/dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 dark:bg-green-950/40 dark:text-green-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            آنلاین
          </div>
        </div>

        <div className="grid grid-cols-3 gap-px border-b border-[var(--color-border)] bg-[var(--color-section-bg)]">
          {[
            { icon: TrendingUp, label: "فروش امروز", value: "۴.۲M", color: "text-primary" },
            { icon: ShoppingCart, label: "سفارش", value: "۲۸", color: "text-secondary-blue" },
            { icon: Eye, label: "بازدید", value: "۱.۲K", color: "text-secondary-orange" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[var(--color-surface)] px-3 py-4 text-center"
            >
              <stat.icon size={18} className={`mx-auto mb-1 ${stat.color}`} />
              <p className="text-lg font-bold text-slate-dark">{stat.value}</p>
              <p className="text-[10px] text-slate-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="border-b border-[var(--color-border)] px-5 py-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-muted">
              روند فروش هفتگی
            </span>
            <span className="rounded-md bg-green-50 px-2 py-0.5 text-xs font-bold text-green-600 dark:bg-green-950/40 dark:text-green-400">
              +۲۴٪
            </span>
          </div>
          <div className="flex h-16 items-end justify-between gap-1.5">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-md bg-gradient-to-t from-primary to-primary-light"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        <div className="px-5 py-4">
          <p className="mb-3 text-xs font-semibold text-slate-muted">
            آخرین سفارش‌ها
          </p>
          <div className="space-y-2.5">
            {dashboardOrders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.12 }}
                className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-section-bg)] px-3 py-2.5"
              >
                <div className="flex items-center gap-2.5">
                  {order.status === "paid" ? (
                    <CheckCircle2 size={18} className="text-green-500" />
                  ) : (
                    <Clock size={18} className="text-amber-500" />
                  )}
                  <div>
                    <p className="text-xs font-semibold text-slate-dark">
                      {order.customer}
                    </p>
                    <p className="text-[10px] text-slate-muted">{order.time}</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-dark">
                    {order.amount}
                  </p>
                  <p className="text-[10px] text-slate-muted">تومان</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -left-6 top-12 z-10 hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-lg sm:block lg:-left-10 dark:shadow-[var(--neon-glow-sm)]"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 dark:bg-green-950/50">
            <Wifi size={18} className="text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-[10px] text-slate-muted">وضعیت شبکه</p>
            <p className="text-xs font-bold text-green-600 dark:text-green-400">سایت فعال</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
        className="absolute -right-4 bottom-24 z-10 hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-lg sm:block lg:-right-8 dark:shadow-[var(--neon-glow-sm)]"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Globe size={18} className="text-primary" />
          </div>
          <div>
            <p className="text-[10px] text-slate-muted">سئو محلی</p>
            <p className="text-xs font-bold text-primary">رتبه ۱ گوگل</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
