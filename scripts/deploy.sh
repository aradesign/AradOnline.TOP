#!/usr/bin/env bash
# به‌روزرسانی امن روی VPS — دیتابیس و آپلودها حفظ می‌شوند (در git نیستند)
set -euo pipefail

APP_DIR="${APP_DIR:-$(cd "$(dirname "$0")/.." && pwd)}"
BRANCH="${DEPLOY_BRANCH:-main}"

cd "$APP_DIR"

echo "==> Pull latest ($BRANCH)"
git fetch origin
git checkout "$BRANCH"
git pull origin "$BRANCH"

echo "==> Install dependencies"
npm ci

echo "==> Ensure data directories"
mkdir -p data public/uploads/images public/uploads/fonts

echo "==> Database schema (non-destructive)"
npx prisma db push

echo "==> Build"
npm run build

echo "==> Restart app"
if command -v pm2 >/dev/null 2>&1; then
  pm2 restart arad-web 2>/dev/null || pm2 start ecosystem.config.cjs
  pm2 save
else
  echo "PM2 not found. Run: npm run start"
fi

echo "✅ Deploy finished"
