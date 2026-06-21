import { NextRequest, NextResponse } from 'next/server';
import { validateRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
  if (!validateRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
  }

  // Production: Vercel Blob
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import('@vercel/blob');
    const ext = file.name.slice(file.name.lastIndexOf('.')) || '.jpg';
    const blob = await put(`portfolio/${Date.now()}${ext}`, file, { access: 'public' });
    return NextResponse.json({ path: blob.url });
  }

  // Local dev fallback: save to public/images/
  const { default: fs } = await import('fs');
  const { default: path } = await import('path');
  const bytes = await file.arrayBuffer();
  const ext = file.name.slice(file.name.lastIndexOf('.')) || '.jpg';
  const filename = `project-${Date.now()}${ext}`;
  const uploadDir = path.join(process.cwd(), 'public', 'images');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  fs.writeFileSync(path.join(uploadDir, filename), Buffer.from(bytes));
  return NextResponse.json({ path: `/images/${filename}` });
}
