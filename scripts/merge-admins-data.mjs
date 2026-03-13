import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dataDir = path.join(root, "data");

const adminsPath = path.join(dataDir, "admins.json");
const enseignantsPath = path.join(dataDir, "enseignants.json");
const etudiantPath = path.join(dataDir, "etudiant.json");
const sousAdminsPath = path.join(dataDir, "sous-admins.json");

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function uniqBy(arr, keyFn) {
  const seen = new Set();
  const out = [];
  for (const item of arr || []) {
    const k = keyFn(item);
    if (k == null) continue;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(item);
  }
  return out;
}

const admins = readJson(adminsPath);
const enseignants = readJson(enseignantsPath);
const etudiant = readJson(etudiantPath);
const sousAdmins = readJson(sousAdminsPath);

// Fusion: on copie les sections manquantes (ou on complète sans doublons).
admins.cours = uniqBy(
  [...(admins.cours || []), ...((enseignants.cours || enseignants) ?? [])],
  (c) => c.id ?? `${c.title}-${c.filiere}-${c.level}`
);

admins.actualites = uniqBy(
  [...(admins.actualites || []), ...(sousAdmins.actualites || [])],
  (a) => a.id ?? `${a.titre}-${a.datePublication}`
);

admins.emploiDuTemps = uniqBy(
  [...(admins.emploiDuTemps || []), ...(sousAdmins.emploiDuTemps || [])],
  (e) => e.id ?? `${e.filiere}-${e.niveau}-${e.code}`
);

admins.messages = uniqBy(
  [...(admins.messages || []), ...(sousAdmins.messages || [])],
  (m) => m.id ?? `${m.expediteur}-${m.dateEnvoi}-${m.destinataire}`
);

admins.emploiDuTempsSessions = uniqBy(
  [...(admins.emploiDuTempsSessions || []), ...(sousAdmins.emploiDuTempsSessions || [])],
  (s) => s.id ?? `${s.filiere}-${s.niveau}-${s.matiere}-${s.date}-${s.session}`
);

admins.espaceEtudiantDemo = admins.espaceEtudiantDemo || etudiant;

// Enrichissement léger: ajoute quelques champs manquants sur les étudiants (sans casser l'existant).
admins.etudiants = (admins.etudiants || []).map((e) => ({
  email: e.email ?? `${(e.prenom || "etudiant").toString().toLowerCase()}.${(e.nom || "eces").toString().toLowerCase()}@eces.edu`,
  telephone: e.telephone ?? "+242 06 000 00 00",
  adresse: e.adresse ?? "Brazzaville, Congo",
  dateNaissance: e.dateNaissance ?? "2004-01-01",
  nationalite: e.nationalite ?? "Congolaise",
  ...e,
}));

fs.writeFileSync(adminsPath, JSON.stringify(admins, null, 2) + "\n", "utf8");
console.log("OK: admins.json mis à jour.");

