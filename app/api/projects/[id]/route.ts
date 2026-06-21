import { NextRequest, NextResponse } from 'next/server';
import { readProjects, writeProjects, Project } from '@/lib/projects';
import { validateRequest } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!validateRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const update = await req.json() as Partial<Project>;
  const projects = await readProjects();
  const idx = projects.findIndex(p => p.id === params.id);

  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  projects[idx] = { ...projects[idx], ...update };
  await writeProjects(projects);

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!validateRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const projects = await readProjects();
  const filtered = projects.filter(p => p.id !== params.id);

  if (filtered.length === projects.length) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await writeProjects(filtered);
  return NextResponse.json({ success: true });
}
