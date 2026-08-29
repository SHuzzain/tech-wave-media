import { NextResponse } from "next/server";
import { siteConfig } from "@/site.config";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  topic: z.string().max(120).optional(),
  message: z.string().min(10).max(5000),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check name, email, and a message of at least 10 characters." },
      { status: 400 }
    );
  }

  const { name, email, topic, message } = parsed.data;
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.contact_email;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.info("[contact]", { name, email, topic, message });
    return NextResponse.json({
      ok: true,
      stored: "log",
      hint: "Set RESEND_API_KEY and CONTACT_TO_EMAIL to send live email.",
    });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Tech Wave Media <noreply@techwavemedia.com>",
      to,
      reply_to: email,
      subject: `Contact: ${topic || "Website"} — ${name}`,
      text: `${message}\n\nFrom: ${name} <${email}>`,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Email provider rejected the message." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
