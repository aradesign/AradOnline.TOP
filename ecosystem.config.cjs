const path = require("path");
const appDir = __dirname;

// بارگذاری .env برای PM2
try {
  const fs = require("fs");
  const envPath = path.join(appDir, ".env");
  if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const i = t.indexOf("=");
      if (i === -1) continue;
      const key = t.slice(0, i).trim();
      let val = t.slice(i + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = val;
    }
  }
} catch {
  /* ignore */
}

module.exports = {
  apps: [
    {
      name: "arad-web",
      cwd: appDir,
      script: "npm",
      args: "run start",
      instances: 1,
      autorestart: true,
      max_memory_restart: "600M",
      env: {
        NODE_ENV: "production",
        PORT: process.env.PORT || "3000",
        HOSTNAME: "0.0.0.0",
      },
    },
  ],
};
