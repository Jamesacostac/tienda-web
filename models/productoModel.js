// Modelo: acceso a datos de productos y categorías
import db from '../db/database.js';

export function listarProductos() {
  return db.prepare(`
    SELECT p.id, p.nombre, p.precio, p.imagen, c.nombre AS categoria
    FROM productos p
    JOIN categorias c ON c.id = p.categoria_id
    ORDER BY p.id
  `).all();
}

export function listarCategorias() {
  return db.prepare('SELECT id, nombre FROM categorias ORDER BY nombre').all();
}
