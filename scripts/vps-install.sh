#!/usr/bin/env bash
# نصب یک‌مرحله‌ای روی VPS خام (Ubuntu/Debian)
# curl -fsSL https://raw.githubusercontent.com/aradesign/AradOnline.TOP/main/scripts/vps-install.sh | sudo bash
set -euo pipefail

APP_DIR="/var/www/AradOnline.TOP"
REPO="https://github.com/aradesign/AradOnline.TOP.git"
BRANCH="main"
LOG="/tmp/arad-install.log"

exec > >(tee -a "$LOG") 2>&1

on_error() {
  echo ""
  echo "❌ نصب متوقف شد. آخرین خطوط لاگ:"
  tail -30 "$LOG" 2>/dev/null || true
  echo ""
  echo "لاگ کامل: $LOG"
  echo "عیب‌یابی: bash <(curl -fsSL https://raw.githubusercontent.com/aradesign/AradOnline.TOP/main/scripts/vps-diagnose.sh)"
}
trap on_error ERR

if [[ "${EUID:-$(id -u)}" -ne 0 ]]; then
  echo "لطفاً با root اجرا کنید: sudo bash"
  exit 1
fi

echo "==> RAM / Swap (برای بیلد Next.js)"
RAM_MB=$(free -m | awk '/^Mem:/{print $2}')
if [[ "${RAM_MB:-0}" -lt 1800 ]] && [[ ! -f /swapfile ]]; then
  echo "    RAM=${RAM_MB}MB — ساخت swap 2GB"
  fallocate -l 2G /swapfile 2>/dev/null || dd if=/dev/zero of=/swapfile bs=1M count=2048 status=progress
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  grep -q swapfile /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

export DEBIAN_FRONTEND=noninteractive
echo "==> به‌روزرسانی بسته‌ها"
apt-get update -qq
apt-get install -y -qq ca-certificates curl git nginx build-essential || apt-get install -y curl git nginx

echo "==> Node.js 20"
if ! command -v node >/dev/null 2>&1 || [[ "$(node -v 2>/dev/null | cut -d. -f1 | tr -d v)" -lt 20 ]]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y -qq nodejs
fi
node -v
npm -v
command -v pm2 >/dev/null || npm install -g pm2

echo "==> فایروال"
if command -v ufw >/dev/null 2>&1; then
  ufw allow OpenSSH >/dev/null 2>&1 || true
  ufw allow 80/tcp >/dev/null 2>&1 || true
  ufw allow 443/tcp >/dev/null 2>&1 || true
  ufw --force enable >/dev/null 2>&1 || true
fi

echo "==> کلون پروژه"
mkdir -p /var/www
export GIT_TERMINAL_PROMPT=0
if [[ -d "$APP_DIR/.git" ]]; then
  cd "$APP_DIR"
  git fetch origin "$BRANCH"
  git reset --hard "origin/$BRANCH"
else
  rm -rf "$APP_DIR"
  git clone --depth 1 --branch "$BRANCH" "$REPO" "$APP_DIR"
  cd "$APP_DIR"
fi

echo "==> .env"
mkdir -p data public/uploads/images public/uploads/fonts
if [[ ! -f .env ]]; then
  SECRET=$(openssl rand -hex 32 2>/dev/null || head -c 32 /dev/urandom | xxd -p)
  ADMIN_PASS="arad$(openssl rand -hex 4 2>/dev/null || echo admin)"
  cat > .env <<EOF
DATABASE_URL="file:../data/prod.db"
ADMIN_PASSWORD="${ADMIN_PASS}"
SESSION_SECRET="${SECRET}"
PORT=3000
NODE_ENV=production
EOF
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  پسورد /admin: ${ADMIN_PASS}"
  echo "  فایل: $APP_DIR/.env"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
fi

echo "==> npm ci + build"
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=1024}"
npm ci
npx prisma generate
npx prisma db push
npm run build

if [[ ! -d .next ]]; then
  echo "خطا: .next ساخته نشد"
  exit 1
fi

echo "==> PM2"
pm2 delete arad-web 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save
sleep 4
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/ 2>/dev/null || echo "000")
echo "    HTTP localhost:3000 => $HTTP_CODE"
if [[ "$HTTP_CODE" != "200" ]]; then
  pm2 logs arad-web --lines 25 --nostream || true
  exit 1
fi
pm2 startup systemd -u root --hp /root 2>/dev/null | grep -E 'sudo|pm2' | tail -1 | bash || true

echo "==> Nginx"
cp -f deploy/nginx-arad.conf /etc/nginx/sites-available/arad
ln -sf /etc/nginx/sites-available/arad /etc/nginx/sites-enabled/arad
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl enable nginx
systemctl reload nginx

HTTP80=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1/ 2>/dev/null || echo "000")
IP=$(hostname -I 2>/dev/null | awk '{print $1}')
echo ""
echo "✅ نصب OK — http://${IP:-SERVER_IP} (nginx: $HTTP80)"
echo "   ادمین: http://${IP:-SERVER_IP}/admin"
trap - ERR
