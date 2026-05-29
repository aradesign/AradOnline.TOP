#!/usr/bin/env bash
# استقرار مستقیم از لپ‌تاپ به VPS — بدون GitHub
#
# استفاده:
#   export VPS_HOST=root@123.45.67.89
#   ./scripts/deploy-to-vps.sh
#
# یا:
#   ./scripts/deploy-to-vps.sh root@123.45.67.89
#
set -euo pipefail

VPS_HOST="${1:-${VPS_HOST:-}}"
APP_DIR="/var/www/AradOnline.TOP"
LOCAL_DIR="$(cd "$(dirname "$0")/.." && pwd)"

if [[ -z "$VPS_HOST" ]]; then
  echo "آدرس سرور را بدهید:"
  echo "  ./scripts/deploy-to-vps.sh root@IP-سرور"
  echo "  یا: export VPS_HOST=root@IP-سرور && ./scripts/deploy-to-vps.sh"
  exit 1
fi

echo "==> تست SSH به $VPS_HOST"
ssh -o ConnectTimeout=10 "$VPS_HOST" "echo OK"

echo "==> نصب پیش‌نیاز روی سرور (Node, Nginx, PM2)"
ssh "$VPS_HOST" 'bash -s' <<'REMOTE_BOOT'
set -e
export DEBIAN_FRONTEND=noninteractive
if ! command -v node >/dev/null 2>&1 || [[ "$(node -v | cut -d. -f1 | tr -d v)" -lt 20 ]]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
apt-get update -qq
apt-get install -y -qq git nginx curl rsync 2>/dev/null || apt-get install -y -qq git nginx curl
command -v pm2 >/dev/null || npm install -g pm2
mkdir -p /var/www
REMOTE_BOOT

echo "==> آپلود پروژه (rsync) — بدون node_modules و .next"
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.git' \
  --exclude 'prisma/dev.db' \
  --exclude 'prisma/dev.db-journal' \
  --exclude 'data/*.db' \
  --exclude '.env' \
  --exclude '.env.local' \
  "$LOCAL_DIR/" "$VPS_HOST:$APP_DIR/"

echo "==> بیلد و اجرا روی سرور"
ssh "$VPS_HOST" "bash -s" <<REMOTE_SETUP
set -e
cd $APP_DIR
mkdir -p data public/uploads/images public/uploads/fonts

if [[ ! -f .env ]]; then
  SECRET=\$(openssl rand -hex 32 2>/dev/null || echo "change-me-secret-32chars-minimum!!")
  ADMIN_PASS="arad\$(openssl rand -hex 4 2>/dev/null || echo admin)"
  cat > .env <<EOF
DATABASE_URL="file:../data/prod.db"
ADMIN_PASSWORD="\${ADMIN_PASS}"
SESSION_SECRET="\${SECRET}"
PORT=3000
NODE_ENV=production
EOF
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  پسورد ادمین /admin: \${ADMIN_PASS}"
  echo "  ذخیره در: $APP_DIR/.env"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
fi

export NODE_OPTIONS="--max-old-space-size=768"
npm ci
npx prisma generate
npx prisma db push
npm run build

pm2 delete arad-web 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup 2>/dev/null | tail -1 | bash || true

cp -f deploy/nginx-arad.conf /etc/nginx/sites-available/arad
ln -sf /etc/nginx/sites-available/arad /etc/nginx/sites-enabled/arad
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

sleep 2
echo "تست اپ: \$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3000/)"
echo "تست Nginx: \$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1/)"
REMOTE_SETUP

echo ""
echo "✅ تمام — در مرورگر: http://IP-سرور"
echo "   ادمین: http://IP-سرور/admin"
