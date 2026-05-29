# آراد وب (Arad Web)

لندینگ‌پیج + **CMS اختصاصی** برای مدیریت نمونه‌کارها، نظرات، تنظیمات و فرم‌های تماس.

## Tech Stack

- Next.js 15 (App Router)
- Prisma + SQLite
- Tailwind CSS + Framer Motion
- پنل مدیریت `/admin`

## راه‌اندازی

```bash
npm install
npm run db:push    # ساخت دیتابیس
npm run db:seed    # داده تستی
npm run dev
```

- **سایت:** http://localhost:3000
- **پنل مدیریت:** http://localhost:3000/admin
- **ورود پیش‌فرض:** `arad1404` (در `.env` → `ADMIN_PASSWORD`)

## پنل مدیریت (CMS)

| بخش | مسیر | امکانات |
|-----|------|---------|
| داشبورد | `/admin` | آمار و آخرین فرم‌ها |
| نمونه‌کارها | `/admin/portfolio` | CRUD + صفحه مستقل هر پروژه |
| نظرات | `/admin/testimonials` | CRUD |
| فرم‌ها | `/admin/submissions` | لیست درخواست‌ها، خوانده/حذف |
| تنظیمات | `/admin/settings` | تماس، Hero، پیشنهاد ویژه |

## صفحات عمومی

- `/` — لندینگ (داده از دیتابیس)
- `/portfolio/[slug]` — قالب جزئیات هر نمونه‌کار

## ساختار

```
prisma/
  schema.prisma
  seed.ts
  dev.db
src/
  app/
    admin/          # پنل CMS
    api/            # REST API
    portfolio/[slug]/
  components/admin/
  lib/
    prisma.ts
    auth.ts
    cms.ts
    settings.ts
```

## متغیرهای محیطی

```env
DATABASE_URL="file:./dev.db"
ADMIN_PASSWORD="arad1404"
SESSION_SECRET="random-secret"
```
