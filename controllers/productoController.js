// Controlador (thin controller): recibe la petición y delega al modelo
import { listarProductos, listarCategorias } from '../models/productoModel.js';

export function getProductos(req, res) {
  res.json(listarProductos());
}

export function getCategorias(req, res) {
  res.json(listarCategorias());
}
