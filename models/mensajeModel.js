// Modelo: acceso a datos de los mensajes de contacto
import db from '../db/database.js';

export function crearMensaje({ nombre, correo, texto }) {
  const { lastInsertRowid } = db
    .prepare('INSERT INTO mensajes (nombre, correo, texto) VALUES (?, ?, ?)')
    .run(nombre, correo, texto);
  return Number(lastInsertRowid);
}
