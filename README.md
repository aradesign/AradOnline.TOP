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
| نمونه‌کارها | `/admin/portfolio` | CRUD + تامبنیل، اسکرین‌شات، گالری تصاویر |
| لوگوی مشتریان | `/admin/clients` | آپلود لوگو → کروسل صفحه اصلی |
| نظرات | `/admin/testimonials` | CRUD |
| فرم‌ها | `/admin/submissions` | لیست درخواست‌ها، خوانده/حذف |
| تنظیمات | `/admin/settings` | تماس، Hero، پیشنهاد ویژه |

## صفحات عمومی

- `/` — لندینگ (داده از دیتابیس)
- `/portfolio/[slug]` — قالب جزئیات هر نمونه‌کار

## استقرار روی VPS

راهنمای کامل: [DEPLOY.md](./DEPLOY.md)

```bash
./scripts/deploy.sh   # pull + build + restart — دیتابیس و uploads حفظ می‌شوند
```

## ارسال به GitHub

```bash
# یک‌بار: ساخت ریپو در github.com و سپس:
git remote add origin https://github.com/USERNAME/arad-web.git
git push -u origin main
```

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
