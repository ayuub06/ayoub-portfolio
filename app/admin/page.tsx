'use client';
import { useState, useEffect, useRef, CSSProperties } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Project {
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

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  status: 'Earned' | 'In Progress';
  imageUrl: string;
  credentialUrl: string;
  order: number;
}

interface ProjectFormState {
  name: string;
  description: string;
  tagsInput: string;
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
  status: 'Live' | 'In Progress' | 'Private';
}

interface CertFormState {
  name: string;
  issuer: string;
  status: 'Earned' | 'In Progress';
  imageUrl: string;
  credentialUrl: string;
}

// ─── Shared constants ─────────────────────────────────────────────────────────

const EMPTY_PROJECT: ProjectFormState = {
  name: '', description: '', tagsInput: '', githubUrl: '', liveUrl: '', imageUrl: '', status: 'In Progress',
};

const EMPTY_CERT: CertFormState = {
  name: '', issuer: '', status: 'Earned', imageUrl: '', credentialUrl: '',
};

const PROJECT_STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Live: { bg: 'rgba(16,185,129,0.15)', color: '#34d399' },
  Private: { bg: 'rgba(100,116,139,0.15)', color: '#94a3b8' },
  'In Progress': { bg: 'rgba(245,158,11,0.15)', color: '#fbbf24' },
};

const CERT_STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Earned: { bg: 'rgba(16,185,129,0.15)', color: '#34d399' },
  'In Progress': { bg: 'rgba(245,158,11,0.15)', color: '#fbbf24' },
};

// ─── Shared styles ────────────────────────────────────────────────────────────

const inputStyle: CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8,
  padding: '10px 14px',
  color: '#e8eaf0',
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
};

const labelStyle: CSSProperties = {
  display: 'block',
  fontSize: 11,
  fontWeight: 600,
  color: 'rgba(148,163,184,0.7)',
  marginBottom: 6,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
};

function iconBtn(disabled: boolean, danger = false): CSSProperties {
  return {
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${danger ? 'rgba(248,113,113,0.25)' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: 6,
    color: disabled ? 'rgba(148,163,184,0.25)' : danger ? '#f87171' : 'rgba(148,163,184,0.8)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: 13,
    padding: '5px 9px',
    lineHeight: 1,
    transition: 'all 0.15s',
  };
}

function authHeaders(token: string): HeadersInit {
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
}

// ─── Shared image upload widget ───────────────────────────────────────────────

function ImageField({
  token,
  imageUrl,
  onImageUrl,
}: {
  token: string;
  imageUrl: string;
  onImageUrl: (url: string) => void;
}) {
  const [preview, setPreview] = useState(imageUrl);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => { setPreview(imageUrl); }, [imageUrl]);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setErr('');
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      if (!res.ok) throw new Error('Upload failed');
      const { path } = await res.json() as { path: string };
      onImageUrl(path);
      setPreview(path);
    } catch {
      setErr('Upload failed — try a URL instead');
      setPreview(imageUrl);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <input
            value={imageUrl}
            onChange={e => { onImageUrl(e.target.value); setPreview(e.target.value); }}
            placeholder="/images/my-cert.jpg or paste an image URL"
            style={{ ...inputStyle, marginBottom: 8 }}
          />
          <button type="button" onClick={() => ref.current?.click()} disabled={uploading} className="btn-outline" style={{ fontSize: 12, padding: '7px 14px' }}>
            {uploading ? 'Uploading…' : 'Upload file'}
          </button>
          <span style={{ fontSize: 12, color: 'rgba(148,163,184,0.4)', marginLeft: 10 }}>or paste a URL above</span>
          <input ref={ref} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
        </div>
        {preview && (
          <div style={{ width: 110, height: 76, borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0, background: 'rgba(255,255,255,0.05)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
      </div>
      {err && <p style={{ color: '#f87171', fontSize: 12, marginTop: 6 }}>{err}</p>}
    </div>
  );
}

// ─── Row (shared between projects and certs) ──────────────────────────────────

function Row({
  name,
  subtitle,
  imageUrl,
  statusLabel,
  statusStyle,
  isFirst,
  isLast,
  onEdit,
  onDelete,
  onMove,
}: {
  name: string;
  subtitle: string;
  imageUrl: string;
  statusLabel: string;
  statusStyle: { bg: string; color: string };
  isFirst: boolean;
  isLast: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onMove: (dir: 'up' | 'down') => void;
}) {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, marginBottom: 8, transition: 'border-color 0.2s' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(34,211,238,0.15)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
    >
      <div style={{ width: 60, height: 42, borderRadius: 6, overflow: 'hidden', background: 'rgba(255,255,255,0.04)', flexShrink: 0 }}>
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(148,163,184,0.2)', fontSize: 18 }}>□</div>
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#f0f2f8', fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
          <span style={{ fontSize: 11, fontWeight: 600, background: statusStyle.bg, color: statusStyle.color, padding: '2px 8px', borderRadius: 20, border: `1px solid ${statusStyle.color}30`, flexShrink: 0 }}>{statusLabel}</span>
        </div>
        <div style={{ fontSize: 12, color: 'rgba(148,163,184,0.5)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{subtitle}</div>
      </div>
      <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
        <button onClick={() => onMove('up')} disabled={isFirst} title="Move up" style={iconBtn(isFirst)}>↑</button>
        <button onClick={() => onMove('down')} disabled={isLast} title="Move down" style={iconBtn(isLast)}>↓</button>
        <button onClick={onEdit} style={iconBtn(false)}>Edit</button>
        <button onClick={onDelete} style={iconBtn(false, true)}>Delete</button>
      </div>
    </div>
  );
}

// ─── Login form ───────────────────────────────────────────────────────────────

function LoginForm({ onLogin }: { onLogin: (token: string) => void }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error((data as { error: string }).error ?? 'Login failed');
      sessionStorage.setItem('admin_token', (data as { token: string }).token);
      onLogin((data as { token: string }).token);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Login failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080c14', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 380, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 40 }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#22d3ee', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'inline-block', width: 24, height: 1, background: '#22d3ee' }} />
            Admin
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 26, fontWeight: 800, color: '#f0f2f8', letterSpacing: '-0.03em', margin: 0 }}>Portfolio Admin</h1>
          <p style={{ color: 'rgba(148,163,184,0.6)', fontSize: 14, marginTop: 6 }}>Enter your admin password to continue.</p>
        </div>
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Password" required autoFocus style={inputStyle} />
          {err && <p style={{ color: '#f87171', fontSize: 13, margin: 0 }}>{err}</p>}
          <button type="submit" disabled={busy} className="btn-primary" style={{ justifyContent: 'center', marginTop: 4 }}>
            <span>{busy ? 'Logging in…' : 'Login'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Project form ─────────────────────────────────────────────────────────────

function ProjectForm({ initial, token, onSave, onCancel }: { initial?: Project; token: string; onSave: () => void; onCancel: () => void }) {
  const [form, setForm] = useState<ProjectFormState>(
    initial ? { ...initial, tagsInput: initial.tags.join(', ') } : EMPTY_PROJECT
  );
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  function set(field: keyof ProjectFormState, val: string) {
    setForm(f => ({ ...f, [field]: val }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        tags: form.tagsInput.split(',').map(t => t.trim()).filter(Boolean),
        githubUrl: form.githubUrl.trim(),
        liveUrl: form.liveUrl.trim(),
        imageUrl: form.imageUrl,
        status: form.status,
      };
      const res = await fetch(initial ? `/api/projects/${initial.id}` : '/api/projects', {
        method: initial ? 'PUT' : 'POST',
        headers: authHeaders(token),
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(((await res.json()) as { error: string }).error ?? 'Save failed');
      onSave();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(34,211,238,0.15)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
      <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 17, color: '#f0f2f8', marginBottom: 20, marginTop: 0 }}>
        {initial ? `Editing — ${initial.name}` : 'Add New Project'}
      </h3>
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px', gap: 14 }}>
          <div>
            <label style={labelStyle}>Project Name *</label>
            <input value={form.name} onChange={e => set('name', e.target.value)} required placeholder="My Awesome App" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Status</label>
            <select value={form.status} onChange={e => set('status', e.target.value as ProjectFormState['status'])} style={inputStyle}>
              <option value="Live">Live</option>
              <option value="In Progress">In Progress</option>
              <option value="Private">Private</option>
            </select>
          </div>
        </div>
        <div>
          <label style={labelStyle}>Description *</label>
          <textarea value={form.description} onChange={e => set('description', e.target.value)} required rows={3} placeholder="What does this project do?" style={{ ...inputStyle, resize: 'vertical' }} />
        </div>
        <div>
          <label style={labelStyle}>Tags (comma-separated)</label>
          <input value={form.tagsInput} onChange={e => set('tagsInput', e.target.value)} placeholder="React, Node.js, TypeScript" style={inputStyle} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <label style={labelStyle}>GitHub URL</label>
            <input value={form.githubUrl} onChange={e => set('githubUrl', e.target.value)} placeholder="https://github.com/…" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Live URL</label>
            <input value={form.liveUrl} onChange={e => set('liveUrl', e.target.value)} placeholder="https://…" style={inputStyle} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Image</label>
          <ImageField token={token} imageUrl={form.imageUrl} onImageUrl={url => set('imageUrl', url)} />
        </div>
        {err && <p style={{ color: '#f87171', fontSize: 13, margin: 0 }}>{err}</p>}
        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
          <button type="submit" disabled={saving} className="btn-primary" style={{ fontSize: 13, padding: '9px 20px' }}>
            <span>{saving ? 'Saving…' : initial ? 'Save Changes' : 'Add Project'}</span>
          </button>
          <button type="button" onClick={onCancel} className="btn-outline" style={{ fontSize: 13, padding: '9px 20px' }}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

// ─── Certificate form ─────────────────────────────────────────────────────────

function CertForm({ initial, token, onSave, onCancel }: { initial?: Certificate; token: string; onSave: () => void; onCancel: () => void }) {
  const [form, setForm] = useState<CertFormState>(initial ? { ...initial } : EMPTY_CERT);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  function set(field: keyof CertFormState, val: string) {
    setForm(f => ({ ...f, [field]: val }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        issuer: form.issuer.trim(),
        status: form.status,
        imageUrl: form.imageUrl,
        credentialUrl: form.credentialUrl.trim(),
      };
      const res = await fetch(initial ? `/api/certificates/${initial.id}` : '/api/certificates', {
        method: initial ? 'PUT' : 'POST',
        headers: authHeaders(token),
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(((await res.json()) as { error: string }).error ?? 'Save failed');
      onSave();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(34,211,238,0.15)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
      <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 17, color: '#f0f2f8', marginBottom: 20, marginTop: 0 }}>
        {initial ? `Editing — ${initial.name}` : 'Add New Certificate'}
      </h3>
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px', gap: 14 }}>
          <div>
            <label style={labelStyle}>Certificate Name *</label>
            <input value={form.name} onChange={e => set('name', e.target.value)} required placeholder="e.g. AWS Cloud Practitioner" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Status</label>
            <select value={form.status} onChange={e => set('status', e.target.value as CertFormState['status'])} style={inputStyle}>
              <option value="Earned">Earned</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>
        </div>
        <div>
          <label style={labelStyle}>Issuer *</label>
          <input value={form.issuer} onChange={e => set('issuer', e.target.value)} required placeholder="e.g. Amazon Web Services" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Credential URL (LinkedIn / certificate link)</label>
          <input value={form.credentialUrl} onChange={e => set('credentialUrl', e.target.value)} placeholder="https://www.linkedin.com/in/…" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Certificate Image</label>
          <ImageField token={token} imageUrl={form.imageUrl} onImageUrl={url => set('imageUrl', url)} />
        </div>
        {err && <p style={{ color: '#f87171', fontSize: 13, margin: 0 }}>{err}</p>}
        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
          <button type="submit" disabled={saving} className="btn-primary" style={{ fontSize: 13, padding: '9px 20px' }}>
            <span>{saving ? 'Saving…' : initial ? 'Save Changes' : 'Add Certificate'}</span>
          </button>
          <button type="button" onClick={onCancel} className="btn-outline" style={{ fontSize: 13, padding: '9px 20px' }}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

// ─── Projects section ─────────────────────────────────────────────────────────

function ProjectsSection({ token }: { token: string }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [reordering, setReordering] = useState(false);

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function load() {
    setLoading(true);
    try {
      const data = await fetch('/api/projects').then(r => r.json());
      setProjects(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(p: Project) {
    if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
    await fetch(`/api/projects/${p.id}`, { method: 'DELETE', headers: authHeaders(token) });
    load();
  }

  async function handleMove(p: Project, dir: 'up' | 'down') {
    if (reordering) return;
    setReordering(true);
    const sorted = [...projects].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex(x => x.id === p.id);
    if (dir === 'up' && idx === 0) { setReordering(false); return; }
    if (dir === 'down' && idx === sorted.length - 1) { setReordering(false); return; }
    const swap = dir === 'up' ? idx - 1 : idx + 1;
    [sorted[idx], sorted[swap]] = [sorted[swap], sorted[idx]];
    await fetch('/api/projects/reorder', {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({ orderedIds: sorted.map(x => x.id) }),
    });
    setReordering(false);
    load();
  }

  const sorted = [...projects].sort((a, b) => a.order - b.order);

  return (
    <div>
      {showAdd && (
        <ProjectForm token={token} onSave={() => { setShowAdd(false); load(); }} onCancel={() => setShowAdd(false)} />
      )}
      {editing && (
        <ProjectForm initial={editing} token={token} onSave={() => { setEditing(null); load(); }} onCancel={() => setEditing(null)} />
      )}
      {!showAdd && !editing && (
        <button onClick={() => { setShowAdd(true); setEditing(null); }} className="btn-primary" style={{ marginBottom: 28, fontSize: 13, padding: '9px 20px' }}>
          <span>+ Add New Project</span>
        </button>
      )}
      <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(148,163,184,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
        {sorted.length} project{sorted.length !== 1 ? 's' : ''}
      </p>
      {loading ? (
        <p style={{ color: 'rgba(148,163,184,0.4)', fontSize: 14 }}>Loading…</p>
      ) : sorted.length === 0 ? (
        <p style={{ color: 'rgba(148,163,184,0.4)', fontSize: 14 }}>No projects yet.</p>
      ) : sorted.map((p, i) => (
        <Row
          key={p.id}
          name={p.name}
          subtitle={p.tags.slice(0, 4).join(', ')}
          imageUrl={p.imageUrl}
          statusLabel={p.status}
          statusStyle={PROJECT_STATUS_STYLE[p.status] ?? PROJECT_STATUS_STYLE['Private']}
          isFirst={i === 0}
          isLast={i === sorted.length - 1}
          onEdit={() => { setEditing(p); setShowAdd(false); }}
          onDelete={() => handleDelete(p)}
          onMove={dir => handleMove(p, dir)}
        />
      ))}
    </div>
  );
}

// ─── Certificates section ─────────────────────────────────────────────────────

function CertsSection({ token }: { token: string }) {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Certificate | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [reordering, setReordering] = useState(false);

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function load() {
    setLoading(true);
    try {
      const data = await fetch('/api/certificates').then(r => r.json());
      setCerts(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(c: Certificate) {
    if (!confirm(`Delete "${c.name}"? This cannot be undone.`)) return;
    await fetch(`/api/certificates/${c.id}`, { method: 'DELETE', headers: authHeaders(token) });
    load();
  }

  async function handleMove(c: Certificate, dir: 'up' | 'down') {
    if (reordering) return;
    setReordering(true);
    const sorted = [...certs].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex(x => x.id === c.id);
    if (dir === 'up' && idx === 0) { setReordering(false); return; }
    if (dir === 'down' && idx === sorted.length - 1) { setReordering(false); return; }
    const swap = dir === 'up' ? idx - 1 : idx + 1;
    [sorted[idx], sorted[swap]] = [sorted[swap], sorted[idx]];
    await fetch('/api/certificates/reorder', {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({ orderedIds: sorted.map(x => x.id) }),
    });
    setReordering(false);
    load();
  }

  const sorted = [...certs].sort((a, b) => a.order - b.order);

  return (
    <div>
      {showAdd && (
        <CertForm token={token} onSave={() => { setShowAdd(false); load(); }} onCancel={() => setShowAdd(false)} />
      )}
      {editing && (
        <CertForm initial={editing} token={token} onSave={() => { setEditing(null); load(); }} onCancel={() => setEditing(null)} />
      )}
      {!showAdd && !editing && (
        <button onClick={() => { setShowAdd(true); setEditing(null); }} className="btn-primary" style={{ marginBottom: 28, fontSize: 13, padding: '9px 20px' }}>
          <span>+ Add New Certificate</span>
        </button>
      )}
      <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(148,163,184,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
        {sorted.length} certificate{sorted.length !== 1 ? 's' : ''}
      </p>
      {loading ? (
        <p style={{ color: 'rgba(148,163,184,0.4)', fontSize: 14 }}>Loading…</p>
      ) : sorted.length === 0 ? (
        <p style={{ color: 'rgba(148,163,184,0.4)', fontSize: 14 }}>No certificates yet.</p>
      ) : sorted.map((c, i) => (
        <Row
          key={c.id}
          name={c.name}
          subtitle={c.issuer}
          imageUrl={c.imageUrl}
          statusLabel={c.status}
          statusStyle={CERT_STATUS_STYLE[c.status] ?? CERT_STATUS_STYLE['Earned']}
          isFirst={i === 0}
          isLast={i === sorted.length - 1}
          onEdit={() => { setEditing(c); setShowAdd(false); }}
          onDelete={() => handleDelete(c)}
          onMove={dir => handleMove(c, dir)}
        />
      ))}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

type Tab = 'projects' | 'certs';

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('projects');

  useEffect(() => {
    const stored = sessionStorage.getItem('admin_token');
    if (stored) setToken(stored);
  }, []);

  function logout() {
    sessionStorage.removeItem('admin_token');
    setToken(null);
  }

  if (!token) {
    return <LoginForm onLogin={t => { sessionStorage.setItem('admin_token', t); setToken(t); }} />;
  }

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: 'projects', label: 'Projects' },
    { id: 'certs', label: 'Certificates' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#080c14', padding: '32px 20px', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#22d3ee', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ display: 'inline-block', width: 24, height: 1, background: '#22d3ee' }} />
              Admin Panel
            </div>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 30, fontWeight: 800, color: '#f0f2f8', letterSpacing: '-0.03em', margin: 0 }}>
              Portfolio
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <a href="/" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: 13, padding: '9px 16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              View site ↗
            </a>
            <button onClick={logout} className="btn-outline" style={{ fontSize: 13, padding: '9px 16px', color: '#f87171', borderColor: 'rgba(248,113,113,0.25)' }}>
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 32, padding: 4, background: 'rgba(255,255,255,0.03)', borderRadius: 10, width: 'fit-content', border: '1px solid rgba(255,255,255,0.07)' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 20px',
                borderRadius: 7,
                border: 'none',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s',
                background: activeTab === tab.id ? 'linear-gradient(135deg, #22d3ee22, #7c3aed22)' : 'transparent',
                color: activeTab === tab.id ? '#22d3ee' : 'rgba(148,163,184,0.6)',
                boxShadow: activeTab === tab.id ? 'inset 0 0 0 1px rgba(34,211,238,0.2)' : 'none',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active section */}
        {activeTab === 'projects' ? (
          <ProjectsSection token={token} />
        ) : (
          <CertsSection token={token} />
        )}

        {/* Vercel warning */}
        <div style={{ marginTop: 56, padding: '18px 20px', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 12 }}>
          <p style={{ fontSize: 13, color: '#fbbf24', fontWeight: 700, margin: '0 0 4px' }}>⚠ Vercel production note</p>
          <p style={{ fontSize: 12, color: 'rgba(251,191,36,0.65)', lineHeight: 1.7, margin: 0 }}>
            Vercel&apos;s filesystem is <strong style={{ color: 'rgba(251,191,36,0.9)' }}>read-only at runtime</strong> — changes saved here persist only in local development.
            To persist edits in production, set up <strong style={{ color: 'rgba(251,191,36,0.9)' }}>Vercel KV</strong> (free tier) and swap the read/write calls in{' '}
            <code style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: 4 }}>src/lib/projects.ts</code> and{' '}
            <code style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: 4 }}>src/lib/certificates.ts</code>.
          </p>
        </div>

      </div>
    </div>
  );
}
