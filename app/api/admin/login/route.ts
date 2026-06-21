import { NextRequest, NextResponse } from 'next/server';
import { hashPassword } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { password } = await req.json() as { password: string };
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: 'Admin not configured — set ADMIN_PASSWORD in your .env.local file.' },
      { status: 500 }
    );
  }

  if (!password || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid password.' }, { status: 401 });
  }

  return NextResponse.json({ token: hashPassword(password) });
}
