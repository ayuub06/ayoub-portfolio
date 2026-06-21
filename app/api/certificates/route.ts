import { NextRequest, NextResponse } from 'next/server';
import { readCertificates, writeCertificates, Certificate } from '@/lib/certificates';
import { validateRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const certs = await readCertificates();
  return NextResponse.json(certs.sort((a, b) => a.order - b.order));
}

export async function POST(req: NextRequest) {
  if (!validateRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json() as Omit<Certificate, 'id' | 'order'>;
  const certs = await readCertificates();

  const maxId = certs.reduce((max, c) => {
    const n = parseInt(c.id, 10);
    return isNaN(n) ? max : Math.max(max, n);
  }, 0);
  const maxOrder = certs.reduce((max, c) => Math.max(max, c.order), 0);

  const newCert: Certificate = {
    ...body,
    id: String(maxId + 1).padStart(2, '0'),
    order: maxOrder + 1,
  };

  certs.push(newCert);
  await writeCertificates(certs);

  return NextResponse.json({ success: true, cert: newCert });
}
