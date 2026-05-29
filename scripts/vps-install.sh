#!/usr/bin/env bash
# نصب یک‌مرحله‌ای روی VPS خام (Ubuntu/Debian)
# استفاده: curl -fsSL https://raw.githubusercontent.com/aradesign/AradOnline.TOP/main/scripts/vps-install.sh | sudo bash
set -euo pipefail

APP_DIR="/var/www/AradOnline.TOP"
REPO="https://github.com/aradesign/AradOnline.TOP.git"
BRANCH="main"

if [[ "${EUID:-$(id -u)}" -ne 0 ]]; then
  echo "لطفاً با root اجرا کنید: sudo bash"
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive
echo "==> به‌روزرسانی سیستم"
apt-get update -qq
apt-get upgrade -y -qq

echo "==> نصب Node.js 20, Git, Nginx"
if ! command -v node >/dev/null 2>&1 || [[ "$(node -v | cut -d. -f1 | tr -d v)" -lt 20 ]]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
fi
apt-get install -y -qq nodejs git nginx curl
npm install -g pm2

echo "==> فایروال (SSH + HTTP)"
if command -v ufw >/dev/null 2>&1; then
  ufw allow OpenSSH >/dev/null 2>&1 || true
  ufw allow 80/tcp >/dev/null 2>&1 || true
  ufw allow 443/tcp >/dev/null 2>&1 || true
  echo "y" | ufw enable >/dev/null 2>&1 || true
fi

echo "==> کلون / به‌روزرسانی پروژه"
mkdir -p /var/www
if [[ -d "$APP_DIR/.git" ]]; then
  cd "$APP_DIR"
  git fetch origin
  git checkout "$BRANCH"
  git pull origin "$BRANCH"
else
  git clone --branch "$BRANCH" "$REPO" "$APP_DIR"
  cd "$APP_DIR"
fi

echo "==> تنظیم .env"
mkdir -p data public/uploads/images public/uploads/fonts
if [[ ! -f .env ]]; then
  SECRET=$(openssl rand -hex 32 2>/dev/null || head -c 32 /dev/urandom | xxd -p)
  ADMIN_PASS="arad$(openssl rand -hex 4 2>/dev/null || echo change-me)"
  cat > .env <<EOF
DATABASE_URL="file:../data/prod.db"
ADMIN_PASSWORD="${ADMIN_PASS}"
SESSION_SECRET="${SECRET}"
PORT=3000
NODE_ENV=production
EOF
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  پسورد پنل ادمین (/admin): ${ADMIN_PASS}"
  echo "  (در فایل $APP_DIR/.env ذخیره شد — حتماً بعداً عوض کنید)"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
else
  echo "  .env از قبل وجود دارد — دست نخورده ماند."
fi

echo "==> نصب وابستگی‌ها و بیلد"
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=768}"
npm ci
npx prisma generate
npx prisma db push
npm run build

if [[ ! -d .next ]]; then
  echo "خطا: بیلد ناموفق — پوشه .next وجود ندارد."
  exit 1
fi

echo "==> PM2"
pm2 delete arad-web 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save
sleep 3
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/ || echo "000")
if [[ "$HTTP_CODE" != "200" ]]; then
  echo "هشدار: اپ روی 3000 پاسخ $HTTP_CODE داد — pm2 logs arad-web"
  pm2 logs arad-web --lines 20 --nostream || true
fi
env PATH="$PATH:/usr/bin" pm2 startup systemd -u root --hp /root 2>/dev/null | tail -1 | bash || true

echo "==> Nginx (پورت 80)"
cp -f deploy/nginx-arad.conf /etc/nginx/sites-available/arad
ln -sf /etc/nginx/sites-available/arad /etc/nginx/sites-enabled/arad
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl enable nginx
systemctl reload nginx

IP=$(curl -4 -s --max-time 3 ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}')
echo ""
echo "✅ نصب تمام شد."
echo "   سایت:  http://${IP:-YOUR_SERVER_IP}"
echo "   ادمین: http://${IP:-YOUR_SERVER_IP}/admin"
echo "   مسیر:  ${APP_DIR}"
echo ""
