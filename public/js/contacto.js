import { enviarMensaje } from './api.js';

const formulario = document.getElementById('form-contacto');
const respuestaEl = document.getElementById('respuesta');

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const datos = Object.fromEntries(new FormData(formulario));

  try {
    const resultado = await enviarMensaje(datos);
    respuestaEl.textContent = resultado.ok ? resultado.mensaje : resultado.error;
    respuestaEl.className = resultado.ok ? 'ok' : 'error';
    if (resultado.ok) formulario.reset();
  } catch {
    respuestaEl.textContent = 'No se pudo guardar el mensaje.';
    respuestaEl.className = 'error';
  }
});
