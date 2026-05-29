#!/usr/bin/env bash
# گزارش وضعیت — روی سرور: bash vps-diagnose.sh
APP_DIR="/var/www/AradOnline.TOP"

echo "=== سیستم ==="
uname -a
free -h
df -h / /var/www 2>/dev/null || df -h /

echo ""
echo "=== Node / PM2 / Nginx ==="
command -v node && node -v || echo "node: MISSING"
command -v pm2 && pm2 status || echo "pm2: not running"
systemctl is-active nginx 2>/dev/null || echo "nginx: unknown"

echo ""
echo "=== پروژه ==="
if [[ -d "$APP_DIR" ]]; then
  ls -la "$APP_DIR/.env" 2>/dev/null || echo ".env: MISSING"
  ls -d "$APP_DIR/.next" 2>/dev/null || echo ".next: MISSING (build failed)"
  ls -la "$APP_DIR/data/" 2>/dev/null | head -5
else
  echo "پوشه $APP_DIR وجود ندارد — نصب نشده"
fi

echo ""
echo "=== HTTP ==="
echo -n "localhost:3000 => "
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3000/ 2>/dev/null || echo "000"
echo -n "localhost:80 => "
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1/ 2>/dev/null || echo "000"

echo ""
echo "=== PM2 logs (last 20) ==="
pm2 logs arad-web --lines 20 --nostream 2>/dev/null || echo "(no logs)"

echo ""
echo "=== Nginx error (last 10) ==="
tail -10 /var/log/nginx/error.log 2>/dev/null || echo "(no log)"
