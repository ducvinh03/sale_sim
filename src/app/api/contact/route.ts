import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/config";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim();
    const note = String(body.note ?? "").trim();
    const plan = String(body.plan ?? "").trim();
    const numbers = Array.isArray(body.numbers) ? body.numbers : [];

    if (!name && !phone && !email && !note && numbers.length === 0) {
      return NextResponse.json(
        { success: false, message: "Dữ liệu yêu cầu không hợp lệ." },
        { status: 400 },
      );
    }

    const from = process.env.EMAIL_FROM || "onboarding@resend.dev";
    const to = process.env.EMAIL_TO || siteConfig.contactEmail;

    const subject = `Yêu cầu tư vấn SIM MobiFone Sơn La${name ? ` - ${name}` : ""}`;
    const text = [
      "Yêu cầu tư vấn SIM MobiFone Sơn La",
      "",
      name ? `Họ tên: ${name}` : "",
      phone ? `Số điện thoại: ${phone}` : "",
      email ? `Email: ${email}` : "",
      plan ? `Gói cước quan tâm: ${plan}` : "",
      numbers.length > 0 ? `Số đã chọn: ${numbers.join(", ")}` : "",
      note ? `Ghi chú: ${note}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const resendClient = getResendClient();

    if (!resendClient) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Chưa cấu hình RESEND_API_KEY. Vui lòng thêm biến môi trường và thử lại.",
        },
        { status: 500 },
      );
    }

    const result = await resendClient.emails.send({
      from,
      to,
      subject,
      text,
      replyTo: email || undefined,
    });

    if (result.error) {
      return NextResponse.json(
        {
          success: false,
          message: result.error.message || "Gửi email thất bại.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email đã được gửi thành công.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Không thể gửi email lúc này.";

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
