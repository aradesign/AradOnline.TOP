# استقرار مستقیم بدون GitHub

## روش ۱ — از مک خودت (پیشنهادی)

پروژه روی مک: `/Users/mohamad/Desktop/Develop/AradOnlie_web`

```bash
cd /Users/mohamad/Desktop/Develop/AradOnlie_web
chmod +x scripts/deploy-to-vps.sh
./scripts/deploy-to-vps.sh root@IP-سرور
```

اولین بار SSH از تو می‌پرسد «trust host» — `yes` بزن.

به‌روزرسانی بعدی (همان دستور — فقط فایل‌ها sync و rebuild):

```bash
./scripts/deploy-to-vps.sh root@IP-سرور
```

> `.env` و `data/` و `public/uploads/` روی سرور **پاک نمی‌شوند** (در rsync exclude هستند).

---

## روش ۲ — فقط با SSH دستی

### الف) فشرده و آپلود

روی مک:

```bash
cd /Users/mohamad/Desktop/Develop
tar --exclude=node_modules --exclude=.next --exclude=.git \
  -czf arad-web.tar.gz AradOnlie_web
scp arad-web.tar.gz root@IP-سرور:/var/www/
```

روی سرور:

```bash
ssh root@IP-سرور
cd /var/www
tar -xzf arad-web.tar.gz
mv AradOnlie_web AradOnline.TOP   # یا همان نام پوشه
cd AradOnline.TOP
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs nginx
npm i -g pm2
cp .env.example .env && nano .env
mkdir -p data public/uploads/images public/uploads/fonts
npm ci && npx prisma db push && npm run build
pm2 start ecosystem.config.cjs && pm2 save
cp deploy/nginx-arad.conf /etc/nginx/sites-available/arad
ln -sf /etc/nginx/sites-available/arad /etc/nginx/sites-enabled/arad
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

---

## کلید SSH (اگر پسورد نمی‌خواهی)

روی مک:

```bash
ssh-copy-id root@IP-سرور
```

بعد `./scripts/deploy-to-vps.sh` بدون پسورد کار می‌کند.
