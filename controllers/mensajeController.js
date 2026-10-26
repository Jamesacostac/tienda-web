// Controlador: valida la entrada mínima y delega al modelo
import { crearMensaje } from '../models/mensajeModel.js';

export function postMensaje(req, res) {
  const { nombre, correo, texto } = req.body ?? {};

  if (!nombre?.trim() || !correo?.trim() || !texto?.trim()) {
    return res.status(400).json({ error: 'Faltan datos: nombre, correo y mensaje son obligatorios.' });
  }

  const id = crearMensaje({ nombre: nombre.trim(), correo: correo.trim(), texto: texto.trim() });
  res.status(201).json({ id, mensaje: '¡Gracias! Tu mensaje fue guardado.' });
}
