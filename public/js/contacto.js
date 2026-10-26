const formulario = document.getElementById('form-contacto');
const respuestaEl = document.getElementById('respuesta');

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const datos = Object.fromEntries(new FormData(formulario));

  try {
    const respuesta = await fetch('/api/mensajes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
    const resultado = await respuesta.json();

    respuestaEl.textContent = respuesta.ok ? resultado.mensaje : resultado.error;
    respuestaEl.className = respuesta.ok ? 'ok' : 'error';
    if (respuesta.ok) formulario.reset();
  } catch {
    respuestaEl.textContent = 'No se pudo conectar con el servidor.';
    respuestaEl.className = 'error';
  }
});
