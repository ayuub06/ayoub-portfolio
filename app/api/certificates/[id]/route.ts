import { NextRequest, NextResponse } from 'next/server';
import { readCertificates, writeCertificates, Certificate } from '@/lib/certificates';
import { validateRequest } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!validateRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const update = await req.json() as Partial<Certificate>;
  const certs = await readCertificates();
  const idx = certs.findIndex(c => c.id === params.id);

  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  certs[idx] = { ...certs[idx], ...update };
  await writeCertificates(certs);

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!validateRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const certs = await readCertificates();
  const filtered = certs.filter(c => c.id !== params.id);

  if (filtered.length === certs.length) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await writeCertificates(filtered);
  return NextResponse.json({ success: true });
}
