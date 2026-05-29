import { NextResponse } from "next/server";
import { createAdminSession, verifyAdminPassword } from "@/lib/auth";

export async function POST(request: Request) {
  const { password } = await request.json();

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: "رمز عبور اشتباه است" }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ success: true });
}
