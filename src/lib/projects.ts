import { Redis } from '@upstash/redis';
import fs from 'fs';
import path from 'path';
import SEED from '@/data/projects.json';

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'projects.json');
const REDIS_KEY = 'projects';

export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
  status: 'Live' | 'In Progress' | 'Private';
  order: number;
}

// Module-level singleton — created once per cold start.
let _redis: Redis | null | undefined;

function getRedis(): Redis | null {
  if (_redis !== undefined) return _redis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  _redis = url && token ? new Redis({ url, token }) : null;
  return _redis;
}

export async function readProjects(): Promise<Project[]> {
  const redis = getRedis();

  if (redis) {
    const data = await redis.get<Project[]>(REDIS_KEY);
    if (data !== null) return data;
    // First-run seed: populate Redis from the bundled JSON so existing data is preserved.
    await redis.set(REDIS_KEY, SEED);
    return SEED as Project[];
  }

  // Local dev fallback — read from filesystem.
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')) as Project[];
  } catch {
    return [];
  }
}

export async function writeProjects(projects: Project[]): Promise<void> {
  const redis = getRedis();

  if (redis) {
    await redis.set(REDIS_KEY, projects);
    return;
  }

  // Local dev fallback — write to filesystem.
  fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2), 'utf-8');
}
