import { NextRequest, NextResponse } from 'next/server';
import { readCertificates, writeCertificates } from '@/lib/certificates';
import { validateRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
  if (!validateRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { orderedIds } = await req.json() as { orderedIds: string[] };
  const certs = await readCertificates();
  const map = new Map(certs.map(c => [c.id, c]));

  const reordered = orderedIds.map((id, index) => {
    const cert = map.get(id);
    if (!cert) throw new Error(`Certificate ${id} not found`);
    return { ...cert, order: index + 1 };
  });

  await writeCertificates(reordered);
  return NextResponse.json({ success: true });
}
