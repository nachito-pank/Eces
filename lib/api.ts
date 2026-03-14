// lib/api.ts — Centralized fetch helpers for all Admin API routes

const BASE = '/api/admin';

async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }

  return res.json();
}

// ─── Étudiants ────────────────────────────────────────────────────────────────

export const etudiantsApi = {
  getAll: () => apiFetch<{ etudiants: any[] }>(`${BASE}/etudiants`),
  getById: (id: number) => apiFetch<{ etudiant: any }>(`${BASE}/etudiants/${id}`),
  create: (data: Record<string, unknown>) =>
    apiFetch<{ etudiant: any }>(`${BASE}/etudiants`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: number, data: Record<string, unknown>) =>
    apiFetch<{ etudiant: any }>(`${BASE}/etudiants/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    apiFetch<{ message: string }>(`${BASE}/etudiants/${id}`, { method: 'DELETE' }),
};

// ─── Enseignants ──────────────────────────────────────────────────────────────

export const enseignantsApi = {
  getAll: () => apiFetch<{ enseignants: any[] }>(`${BASE}/enseignants`),
  getById: (id: number) => apiFetch<{ enseignant: any }>(`${BASE}/enseignants/${id}`),
  create: (data: Record<string, unknown>) =>
    apiFetch<{ enseignant: any }>(`${BASE}/enseignants`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: number, data: Record<string, unknown>) =>
    apiFetch<{ enseignant: any }>(`${BASE}/enseignants/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    apiFetch<{ message: string }>(`${BASE}/enseignants/${id}`, { method: 'DELETE' }),
};

// ─── Filières ─────────────────────────────────────────────────────────────────

export const filieresApi = {
  getAll: () => apiFetch<{ filieres: any[] }>(`${BASE}/filieres`),
  getById: (id: number) => apiFetch<{ filiere: any }>(`${BASE}/filieres/${id}`),
  create: (data: Record<string, unknown>) =>
    apiFetch<{ filiere: any }>(`${BASE}/filieres`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: number, data: Record<string, unknown>) =>
    apiFetch<{ filiere: any }>(`${BASE}/filieres/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    apiFetch<{ message: string }>(`${BASE}/filieres/${id}`, { method: 'DELETE' }),
};

// ─── Sous-Admins ──────────────────────────────────────────────────────────────

export const sousAdminsApi = {
  getAll: () => apiFetch<{ sousAdmins: any[] }>(`${BASE}/sous-admins`),
  getById: (id: number) => apiFetch<{ sousAdmin: any }>(`${BASE}/sous-admins/${id}`),
  create: (data: Record<string, unknown>) =>
    apiFetch<{ sousAdmin: any }>(`${BASE}/sous-admins`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: number, data: Record<string, unknown>) =>
    apiFetch<{ sousAdmin: any }>(`${BASE}/sous-admins/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    apiFetch<{ message: string }>(`${BASE}/sous-admins/${id}`, { method: 'DELETE' }),
};

// ─── Profil Admin ─────────────────────────────────────────────────────────────

export const profilApi = {
  get: () => apiFetch<{ admin: any }>(`${BASE}/profil`),
  update: (data: { nom: string; email: string; motDePasse?: string }) =>
    apiFetch<{ admin: any }>(`${BASE}/profil`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};
