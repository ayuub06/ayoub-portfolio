import { Redis } from '@upstash/redis';
import fs from 'fs';
import path from 'path';
import SEED from '@/data/certificates.json';

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'certificates.json');
const REDIS_KEY = 'certificates';

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  status: 'Earned' | 'In Progress';
  imageUrl: string;
  credentialUrl: string;
  order: number;
}

let _redis: Redis | null | undefined;

function getRedis(): Redis | null {
  if (_redis !== undefined) return _redis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  _redis = url && token ? new Redis({ url, token }) : null;
  return _redis;
}

export async function readCertificates(): Promise<Certificate[]> {
  const redis = getRedis();

  if (redis) {
    const data = await redis.get<Certificate[]>(REDIS_KEY);
    if (data !== null) return data;
    // First-run seed: populate Redis from the bundled JSON.
    await redis.set(REDIS_KEY, SEED);
    return SEED as Certificate[];
  }

  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')) as Certificate[];
  } catch {
    return [];
  }
}

export async function writeCertificates(certs: Certificate[]): Promise<void> {
  const redis = getRedis();

  if (redis) {
    await redis.set(REDIS_KEY, certs);
    return;
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(certs, null, 2), 'utf-8');
}
