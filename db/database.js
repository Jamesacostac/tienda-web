// Conexión a SQLite (incluido en Node.js 22.5+) y datos iniciales
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const db = new DatabaseSync(fileURLToPath(new URL('./tienda.db', import.meta.url)));

db.exec('PRAGMA foreign_keys = ON;');
db.exec(readFileSync(new URL('./schema.sql', import.meta.url), 'utf8'));

// Insertar datos de ejemplo solo la primera vez
const { total } = db.prepare('SELECT COUNT(*) AS total FROM categorias').get();
if (total === 0) {
  const insCategoria = db.prepare('INSERT INTO categorias (nombre) VALUES (?)');
  const ropa = insCategoria.run('Ropa').lastInsertRowid;
  const calzado = insCategoria.run('Calzado').lastInsertRowid;
  const accesorios = insCategoria.run('Accesorios').lastInsertRowid;

  const insProducto = db.prepare(
    'INSERT INTO productos (nombre, precio, imagen, categoria_id) VALUES (?, ?, ?, ?)'
  );
  insProducto.run('Camiseta básica', 45000, 'img/camiseta.svg', ropa);
  insProducto.run('Tenis deportivos', 189000, 'img/tenis.svg', calzado);
  insProducto.run('Gorra clásica', 35000, 'img/gorra.svg', accesorios);
}

export default db;
