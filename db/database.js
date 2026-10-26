// Conexión a SQLite (incluido en Node.js 22.5+) y datos iniciales
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const leerSql = (archivo) => readFileSync(new URL(archivo, import.meta.url), 'utf8');

const db = new DatabaseSync(fileURLToPath(new URL('./tienda.db', import.meta.url)));

db.exec('PRAGMA foreign_keys = ON;');
db.exec(leerSql('./schema.sql'));

// Insertar datos de ejemplo solo la primera vez
const { total } = db.prepare('SELECT COUNT(*) AS total FROM categorias').get();
if (total === 0) {
  db.exec(leerSql('./seed.sql'));
}

export default db;
