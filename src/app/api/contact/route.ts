import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, city, businessType, message } = body;

    if (!fullName?.trim() || !phone?.trim() || !city?.trim()) {
      return NextResponse.json(
        { error: "نام، تلفن و شهر الزامی است" },
        { status: 400 }
      );
    }

    await prisma.formSubmission.create({
      data: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        city: city.trim(),
        businessType: businessType?.trim() || "سایر",
        message: message?.trim() || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "خطا در ثبت درخواست" }, { status: 500 });
  }
}
