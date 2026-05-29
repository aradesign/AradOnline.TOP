# استقرار آراد وب روی VPS (سرور خام)

ریپو: https://github.com/aradesign/AradOnline.TOP

## ایده کلی

| لایه | پورت | توضیح |
|------|------|--------|
| **Nginx** | **80** | همان چیزی که در مرورگر می‌زنید: `http://IP-سرور` |
| Next.js (PM2) | 3000 | فقط داخل سرور — از بیرون باز نیست |

بعداً دامنه را به IP سرور وصل می‌کنید؛ فقط `server_name` در Nginx را عوض می‌کنید.

---

## ۱) اتصال SSH و به‌روزرسانی

```bash
ssh root@YOUR_SERVER_IP
apt update && apt upgrade -y
```

## ۲) نصب Node.js 20، Git، Nginx

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs git nginx
node -v   # باید v20.x باشد
npm i -g pm2
```

## ۳) فایروال (پورت 80 و 22)

```bash
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp   # برای SSL بعداً
ufw enable
ufw status
```

## ۴) کلون پروژه

```bash
mkdir -p /var/www
cd /var/www
git clone https://github.com/aradesign/AradOnline.TOP.git
cd AradOnline.TOP
```

## ۵) تنظیم `.env`

```bash
cp .env.example .env
nano .env
```

محتوای پیشنهادی production:

```env
DATABASE_URL="file:../data/prod.db"
ADMIN_PASSWORD="یک-پسورد-قوی-برای-ادمین"
SESSION_SECRET="حداقل-۳۲-کاراکتر-تصادفی-مثلا-openssl-rand-hex-32"
PORT=3000
NODE_ENV=production
```

تولید `SESSION_SECRET`:

```bash
openssl rand -hex 32
```

## ۶) دیتابیس، بیلد، اجرا

```bash
mkdir -p data public/uploads/images public/uploads/fonts
npm ci
npx prisma db push
npm run db:seed    # اختیاری — داده نمونه
npm run build
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup        # دستور خروجی را یک‌بار اجرا کنید
```

بررسی:

```bash
pm2 status
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3000
# باید 200 بدهد
```

## ۷) Nginx — دسترسی مستقیم با IP (پورت 80)

```bash
cp /var/www/AradOnline.TOP/deploy/nginx-arad.conf /etc/nginx/sites-available/arad
ln -sf /etc/nginx/sites-available/arad /etc/nginx/sites-enabled/arad
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

در مرورگر: **http://YOUR_SERVER_IP** (بدون `:3000`)

## ۸) بعداً — اتصال دامنه

1. در DNS، رکورد `A` دامنه → IP سرور  
2. ویرایش `/etc/nginx/sites-available/arad`:

```nginx
server_name aradonline.top www.aradonline.top;
```

3. SSL رایگان:

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d aradonline.top -d www.aradonline.top
```

---

## به‌روزرسانی (بدون از دست دادن داده)

```bash
cd /var/www/AradOnline.TOP
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

حفظ می‌شود: `data/prod.db`، `public/uploads/`، `.env`

## پنل ادمین

- `http://YOUR_SERVER_IP/admin` (یا بعداً با دامنه)
- ورود: همان `ADMIN_PASSWORD` در `.env`

## عیب‌یابی

```bash
pm2 logs arad-web
journalctl -u nginx -n 50
```

اگر سایت بالا نیامد:

```bash
cd /var/www/AradOnline.TOP
pm2 restart arad-web
systemctl status nginx
```
