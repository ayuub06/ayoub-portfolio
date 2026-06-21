import { NextRequest, NextResponse } from 'next/server';
import { readProjects, writeProjects } from '@/lib/projects';
import { validateRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
  if (!validateRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { orderedIds } = await req.json() as { orderedIds: string[] };
  const projects = await readProjects();
  const map = new Map(projects.map(p => [p.id, p]));

  const reordered = orderedIds.map((id, index) => {
    const project = map.get(id);
    if (!project) throw new Error(`Project ${id} not found`);
    return { ...project, order: index + 1 };
  });

  await writeProjects(reordered);
  return NextResponse.json({ success: true });
}
