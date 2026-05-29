# استقرار آراد وب روی VPS

## پیش‌نیاز

- Node.js 20+
- Git
- PM2 (`npm i -g pm2`)
- Nginx (پروکسی معکوس + SSL)

## نصب اولیه

```bash
cd /var/www
git clone https://github.com/YOUR_USER/arad-web.git
cd arad-web

cp .env.example .env
# ویرایش .env — پسورد ادمین و SESSION_SECRET

mkdir -p data public/uploads/images public/uploads/fonts
npm ci
npx prisma db push
npm run db:seed   # فقط بار اول (اختیاری)
npm run build
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

### `.env` روی سرور

```env
DATABASE_URL="file:../data/prod.db"
ADMIN_PASSWORD="پسورد-قوی-ادمین"
SESSION_SECRET="رشته-تصادفی-طولانی"
PORT=3000
```

> مسیر دیتابیس نسبت به پوشه `prisma/` است → فایل در `data/prod.db` ذخیره می‌شود.

## Nginx (نمونه)

```nginx
server {
    listen 80;
    server_name yourdomain.ir;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## به‌روزرسانی (بدون از دست دادن داده)

روی VPS:

```bash
cd /var/www/arad-web
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

این اسکریپت:
- `git pull` می‌زند
- بیلد می‌گیرد
- اسکیمای دیتابیس را به‌روز می‌کند (`db push`)
- PM2 را ری‌استارت می‌کند

**حفظ می‌شود (در git نیست):**
- `data/prod.db` — دیتابیس SQLite
- `public/uploads/` — تصاویر و فونت‌های آپلودشده
- `.env` — تنظیمات محرمانه

## پنل ادمین

- `/admin` — ورود با `ADMIN_PASSWORD`
- نمونه‌کار: تامبنیل، اسکرین‌شات، گالری
- مشتریان: لوگو برای کروسل
