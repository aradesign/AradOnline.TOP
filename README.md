# آراد وب (Arad Web)

لندینگ‌پیج + **CMS اختصاصی** — نمونه‌کار، لوگوی مشتریان، نظرات، تنظیمات تم/فونت، فرم تماس.

**ریپازیتوری:** https://github.com/aradesign/AradOnline.TOP

---

## استقرار روی VPS (توصیه‌شده)

همهٔ مراحل نصب، به‌روزرسانی، دامنه، SSL و عیب‌یابی در یک فایل:

### [DEPLOY.md](./DEPLOY.md)

### نصب یک‌خطی روی سرور خام

```bash
curl -fsSL https://raw.githubusercontent.com/aradesign/AradOnline.TOP/main/scripts/vps-install.sh | sudo bash
```

- سایت: `http://IP-سرور`  
- ادمین: `http://IP-سرور/admin`  
- پسورد ادمین: **فقط در ترمینال سرور** هنگام نصب اول چاپ می‌شود (فایل `.env` روی سرور).

### به‌روزرسانی بعد از `git push`

```bash
cd /var/www/AradOnline.TOP && ./scripts/deploy.sh
```

---

## توسعه محلی

```bash
git clone https://github.com/aradesign/AradOnline.TOP.git
cd AradOnline.TOP
cp .env.example .env
# ADMIN_PASSWORD و SESSION_SECRET را در .env تنظیم کنید
npm install
npm run db:push
npm run db:seed    # اختیاری
npm run dev
```

| آدرس | |
|------|--|
| سایت | http://localhost:3000 |
| پنل | http://localhost:3000/admin |

---

## Tech Stack

- Next.js 15 (App Router)
- Prisma + SQLite
- Tailwind CSS + Framer Motion
- تم روشن/تاریک + CMS رنگ و فونت

---

## پنل مدیریت

| بخش | مسیر |
|-----|------|
| داشبورد | `/admin` |
| نمونه‌کارها | `/admin/portfolio` — تامبنیل، اسکرین‌شات، گالری |
| لوگوی مشتریان | `/admin/clients` — کروسل صفحه اصلی |
| نظرات | `/admin/testimonials` |
| فرم‌ها | `/admin/submissions` |
| تنظیمات | `/admin/settings` |

---

## صفحات عمومی

- `/` — لندینگ
- `/portfolio/[slug]` — جزئیات پروژه

---

## متغیرهای محیطی

نمونه در `.env.example` (کپی به `.env`). **فایل `.env` commit نشود.**

| متغیر | کاربرد |
|--------|--------|
| `DATABASE_URL` | مسیر SQLite |
| `ADMIN_PASSWORD` | ورود پنل `/admin` |
| `SESSION_SECRET` | امضای کوکی نشست (۳۲+ کاراکتر تصادفی) |
| `PORT` | پورت داخلی Next (پیش‌فرض 3000؛ Nginx روی 80) |
| `NODE_ENV` | `production` روی سرور |

---

## اسکریپت‌ها

| اسکریپت | کاربرد |
|---------|--------|
| `scripts/vps-install.sh` | نصب کامل از GitHub (یک‌خطی بالا) |
| `scripts/deploy.sh` | `git pull` + build + restart |
| `scripts/vps-fix.sh` | رفع 404/502 |
| `npm run dev` | توسعه |
| `npm run build` | بیلد production |

---

## ساختار پروژه

```
prisma/           schema + seed
src/app/          صفحات و API
src/components/   UI + admin + sections
src/lib/          prisma, auth, cms, settings
deploy/           پیکربندی Nginx
scripts/          نصب و deploy
data/             دیتابیس production (روی سرور، خارج از git)
public/uploads/   فایل‌های آپلود (خارج از git)
```

---

## مجوز و مشارکت

پروژه خصوصی آراد وب — تغییرات را از طریق GitHub و deploy روی VPS منتشر کنید.
