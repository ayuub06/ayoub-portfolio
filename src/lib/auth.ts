import { createHash } from 'crypto';
import { NextRequest } from 'next/server';

export function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

export function validateRequest(req: NextRequest): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const token = req.headers.get('Authorization')?.replace('Bearer ', '') ?? '';
  return token === hashPassword(password);
}
