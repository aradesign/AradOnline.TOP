# راهنمای استقرار روی VPS (GitHub)

**ریپازیتوری:** https://github.com/aradesign/AradOnline.TOP

این سند تمام مراحل نصب روی سرور لینوکس (Ubuntu/Debian) را پوشش می‌دهد.  
**هیچ رمز یا secret واقعی در گیت ذخیره نمی‌شود** — فقط روی سرور در فایل `.env` (خارج از گیت).

---

## نصب یک‌خطی (سرور خام)

با SSH به سرور وصل شوید (`root` یا کاربری با `sudo`) و **فقط این دستور** را اجرا کنید:

```bash
curl -fsSL https://raw.githubusercontent.com/aradesign/AradOnline.TOP/main/scripts/vps-install.sh | sudo bash
```

اسکریپت به‌ترتیب انجام می‌دهد:

1. به‌روزرسانی سیستم  
2. نصب Node.js 20، Git، Nginx، PM2  
3. باز کردن پورت‌های 22، 80، 443 در فایروال (در صورت وجود UFW)  
4. کلون پروژه در `/var/www/AradOnline.TOP`  
5. ساخت `.env` (فقط بار اول) و **چاپ پسورد ادمین در همان ترمینال سرور**  
6. `npm ci` → Prisma → `build`  
7. اجرا با PM2  
8. تنظیم Nginx روی **پورت 80**

بعد از اتمام:

| آدرس | توضیح |
|------|--------|
| `http://IP-سرور` | سایت عمومی |
| `http://IP-سرور/admin` | پنل CMS |

پسورد ورود ادمین: در **خروجی همان ترمینال** و در `/var/www/AradOnline.TOP/.env` (کلید `ADMIN_PASSWORD`).  
آن را یادداشت کنید و در گیت یا تیکت عمومی نگذارید.

---

## معماری

```
مرورگر  →  :80  →  Nginx  →  :3000  →  Next.js (PM2)
                              ↑
                         فقط داخل سرور
```

- کاربر **هرگز** `:3000` را در مرورگر نمی‌زند.  
- بعداً دامنه را به IP وصل می‌کنید؛ Nginx همان می‌ماند.

---

## پیش‌نیازها

| مورد | نسخه / توضیح |
|------|----------------|
| سیستم‌عامل | Ubuntu 22.04+ یا Debian 12+ |
| RAM | حداقل ۱ گیگ (۲ گیگ راحت‌تر) |
| دسترسی | SSH با root یا sudo |
| دامنه | اختیاری — در نصب اول فقط IP کافی است |

---

## نصب دستی (گام‌به‌گام)

اگر اسکریپت یک‌خطی را نمی‌خواهید:

### ۱) اتصال و به‌روزرسانی

```bash
ssh root@IP-سرور
apt update && apt upgrade -y
```

### ۲) Node.js 20، Git، Nginx، PM2

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs git nginx curl
node -v    # v20.x
npm install -g pm2
```

### ۳) فایروال

```bash
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

### ۴) کلون از GitHub

```bash
mkdir -p /var/www
cd /var/www
git clone https://github.com/aradesign/AradOnline.TOP.git
cd AradOnline.TOP
```

### ۵) فایل محیط (`.env`)

```bash
cp .env.example .env
nano .env
```

مقادیر production (نمونه — **مقادیر واقعی را خودتان انتخاب کنید**):

```env
DATABASE_URL="file:../data/prod.db"
ADMIN_PASSWORD="<پسورد-قوی-ادمین>"
SESSION_SECRET="<رشته-تصادفی-۳۲+-کاراکتر>"
PORT=3000
NODE_ENV=production
```

تولید مقدار تصادفی برای `SESSION_SECRET`:

```bash
openssl rand -hex 32
```

> فایل `.env` در `.gitignore` است و هرگز نباید commit شود.

### ۶) دیتابیس، بیلد، اجرا

```bash
mkdir -p data public/uploads/images public/uploads/fonts
export NODE_OPTIONS=--max-old-space-size=768
npm ci
npx prisma generate
npx prisma db push
npm run db:seed          # اختیاری — فقط بار اول
npm run build
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup              # دستور چاپ‌شده را یک‌بار اجرا کنید
```

بررسی اپ:

```bash
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://127.0.0.1:3000/
# انتظار: HTTP 200
```

### ۷) Nginx (پورت 80)

```bash
cp deploy/nginx-arad.conf /etc/nginx/sites-available/arad
ln -sf /etc/nginx/sites-available/arad /etc/nginx/sites-enabled/arad
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl enable nginx
systemctl reload nginx
```

بررسی از بیرون:

```bash
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://127.0.0.1/
```

---

## به‌روزرسانی بعد از تغییرات گیت

روی سرور (داده‌ها حفظ می‌شوند):

```bash
cd /var/www/AradOnline.TOP
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

یا یک‌خطی:

```bash
curl -fsSL https://raw.githubusercontent.com/aradesign/AradOnline.TOP/main/scripts/vps-fix.sh | sudo bash
```

### چه چیزهایی حفظ می‌شوند؟

| مسیر | محتوا |
|------|--------|
| `data/prod.db` | دیتابیس SQLite |
| `public/uploads/` | تصاویر و فونت‌های آپلودشده |
| `.env` | رمز ادمین و تنظیمات محرمانه |

### چه چیزهایی از گیت می‌آید؟

کد برنامه، وابستگی‌ها (`npm ci`)، بیلد جدید (`.next`).

---

## اتصال دامنه + SSL (بعداً)

1. در DNS: رکورد `A` → IP سرور  
2. ویرایش `/etc/nginx/sites-available/arad` — خط `server_name`:

```nginx
server_name example.com www.example.com;
```

3. گواهی رایگان:

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d example.com -d www.example.com
```

---

## پنل مدیریت (CMS)

| مسیر | کاربرد |
|------|--------|
| `/admin` | ورود و داشبورد |
| `/admin/portfolio` | نمونه‌کار + تامبنیل + اسکرین‌شات + گالری |
| `/admin/clients` | لوگوی مشتریان (کروسل) |
| `/admin/settings` | رنگ، فونت، تماس، Hero |
| `/admin/submissions` | فرم‌های تماس |

ورود: مقدار `ADMIN_PASSWORD` در `.env` روی سرور.

---

## عیب‌یابی

### سایت 404 یا 502

```bash
cd /var/www/AradOnline.TOP
pm2 status
pm2 logs arad-web --lines 40
curl -I http://127.0.0.1:3000
curl -I http://127.0.0.1
```

رفع خودکار (بیلد + PM2 + Nginx):

```bash
curl -fsSL https://raw.githubusercontent.com/aradesign/AradOnline.TOP/main/scripts/vps-fix.sh | sudo bash
```

### لاگ‌ها

```bash
pm2 logs arad-web
journalctl -u nginx -n 50 --no-pager
```

### ری‌استارت سریع

```bash
pm2 restart arad-web
systemctl reload nginx
```

---

## توسعه محلی (مرجع)

```bash
git clone https://github.com/aradesign/AradOnline.TOP.git
cd AradOnline.TOP
cp .env.example .env
# ویرایش .env برای محیط local
npm install
npm run db:push
npm run db:seed
npm run dev
```

جزئیات بیشتر: [README.md](./README.md)

---

## امنیت

- `.env` را commit نکنید.  
- پسورد ادمین را فقط روی سرور نگه دارید.  
- بعد از نصب، در صورت نیاز `ADMIN_PASSWORD` را در `.env` عوض کنید و `pm2 restart arad-web` بزنید.  
- برای production حتماً `SESSION_SECRET` تصادفی و طولانی استفاده کنید.
