/**
 * lib/db.ts
 *
 * Lit et écrit le fichier admins.json sur le disque.
 * Toutes les routes API importent ce module pour persister les données.
 *
 * ⚠️  Fonctionne uniquement côté serveur (Node.js / Next.js Route Handlers).
 *     Ne jamais importer dans un composant 'use client'.
 */

import fs from 'fs';
import path from 'path';

// Chemin absolu vers admins.json (à la racine du projet dans data/)
const DB_PATH = path.join(process.cwd(), 'data', 'admins.json');

/** Lit et parse le JSON depuis le disque. */
export function readDb(): any {
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw);
}

/** Écrit l'objet complet dans admins.json (formaté avec 2 espaces). */
export function writeDb(data: any): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// ─── Helpers par entité ────────────────────────────────────────────────────

export const getEtudiants   = ()      => readDb().etudiants   as any[];
export const getEnseignants = ()      => readDb().enseignants as any[];
export const getFilieres    = ()      => readDb().filieres    as any[];
export const getSousAdmins  = ()      => readDb().sousAdmins  as any[];
export const getAdmin       = ()      => readDb().admin        as any;

export function saveEtudiants(etudiants: any[])     { const db = readDb(); db.etudiants   = etudiants;   writeDb(db); }
export function saveEnseignants(enseignants: any[]) { const db = readDb(); db.enseignants = enseignants; writeDb(db); }
export function saveFilieres(filieres: any[])       { const db = readDb(); db.filieres    = filieres;    writeDb(db); }
export function saveSousAdmins(sousAdmins: any[])   { const db = readDb(); db.sousAdmins  = sousAdmins;  writeDb(db); }
export function saveAdmin(admin: any)               { const db = readDb(); db.admin        = admin;       writeDb(db); }
