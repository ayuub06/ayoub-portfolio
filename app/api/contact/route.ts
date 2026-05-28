import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body as { name: string; email: string; message: string };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.CONTACT_EMAIL ?? 'ayoub.imourigue@example.com';

    if (!RESEND_API_KEY) {
      console.log('[Contact Form - DEV MODE]', { name, email, message });
      return NextResponse.json({ success: true });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: [TO_EMAIL],
        reply_to: email,
        subject: `[Portfolio] New message from ${name}`,
        html: `<div style="font-family:sans-serif;padding:24px;background:#0f172a;color:#e2e8f0;border-radius:12px"><h2 style="color:#22d3ee">New Portfolio Message</h2><p><strong>From:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p style="white-space:pre-wrap">${message}</p></div>`,
      }),
    });

    if (!res.ok) return NextResponse.json({ error: 'Failed to send.' }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
