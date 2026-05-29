#!/usr/bin/env bash
# رفع 404 / 502 — اجرا روی سرور با root
set -euo pipefail

APP_DIR="/var/www/AradOnline.TOP"

if [[ "${EUID:-$(id -u)}" -ne 0 ]]; then
  echo "با root اجرا کنید: sudo bash"
  exit 1
fi

if [[ ! -d "$APP_DIR" ]]; then
  echo "پروژه پیدا نشد. اول vps-install.sh را اجرا کنید."
  exit 1
fi

cd "$APP_DIR"
echo "==> به‌روزرسانی کد"
git pull origin main

echo "==> بررسی .env"
mkdir -p data public/uploads/images public/uploads/fonts
if [[ ! -f .env ]]; then
  echo "فایل .env نیست — از vps-install استفاده کنید."
  exit 1
fi

echo "==> بیلد مجدد"
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=768}"
npm ci
npx prisma generate
npx prisma db push
npm run build

if [[ ! -d .next ]]; then
  echo "خطا: پوشه .next ساخته نشد — بیلد شکست خورده."
  exit 1
fi

echo "==> ری‌استارت PM2"
pm2 delete arad-web 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save

sleep 3
CODE=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/ || echo "000")
echo "    Next.js localhost:3000 => HTTP $CODE"
if [[ "$CODE" != "200" ]]; then
  echo "==> لاگ PM2 (۱۰ خط آخر):"
  pm2 logs arad-web --lines 15 --nostream || true
  exit 1
fi

echo "==> Nginx"
cp -f deploy/nginx-arad.conf /etc/nginx/sites-available/arad
ln -sf /etc/nginx/sites-available/arad /etc/nginx/sites-enabled/arad
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

CODE80=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1/ || echo "000")
echo "    Nginx localhost:80 => HTTP $CODE80"

IP=$(curl -4 -s --max-time 3 ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}')
echo ""
if [[ "$CODE80" == "200" ]]; then
  echo "✅ درست شد — http://${IP:-SERVER_IP}"
else
  echo "⚠️ هنوز مشکل دارد. خروجی: pm2 logs arad-web"
fi
