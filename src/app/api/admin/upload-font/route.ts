import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { isAdminAuthenticated } from "@/lib/auth";

const ALLOWED_EXT = [".woff", ".woff2", ".ttf", ".otf"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "فایلی انتخاب نشده" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "حداکثر حجم فایل ۵ مگابایت است" },
        { status: 400 }
      );
    }

    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXT.includes(ext)) {
      return NextResponse.json(
        { error: "فقط woff, woff2, ttf, otf مجاز است" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const safeName = file.name
      .replace(/[^a-zA-Z0-9._\u0600-\u06FF-]/g, "-")
      .slice(0, 80);
    const filename = `${Date.now()}-${safeName}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads", "fonts");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);

    const url = `/uploads/fonts/${filename}`;

    const formatMap: Record<string, string> = {
      ".woff2": "woff2",
      ".woff": "woff",
      ".ttf": "truetype",
      ".otf": "opentype",
    };

    return NextResponse.json({
      url,
      filename,
      format: formatMap[ext] || "woff2",
      suggestedFamily: path.basename(file.name, ext).replace(/[-_]/g, " "),
    });
  } catch {
    return NextResponse.json({ error: "خطا در آپلود" }, { status: 500 });
  }
}
