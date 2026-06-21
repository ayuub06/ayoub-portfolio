import { NextRequest, NextResponse } from 'next/server';
import { readProjects, writeProjects, Project } from '@/lib/projects';
import { validateRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const projects = await readProjects();
  return NextResponse.json(projects.sort((a, b) => a.order - b.order));
}

export async function POST(req: NextRequest) {
  if (!validateRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json() as Omit<Project, 'id' | 'order'>;
  const projects = await readProjects();

  const maxId = projects.reduce((max, p) => {
    const n = parseInt(p.id, 10);
    return isNaN(n) ? max : Math.max(max, n);
  }, 0);
  const maxOrder = projects.reduce((max, p) => Math.max(max, p.order), 0);

  const newProject: Project = {
    ...body,
    id: String(maxId + 1).padStart(2, '0'),
    order: maxOrder + 1,
  };

  projects.push(newProject);
  await writeProjects(projects);

  return NextResponse.json({ success: true, project: newProject });
}
