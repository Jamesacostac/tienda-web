// Acceso a datos desde el frontend.
// Con el servidor Node (npm start) se usa la API REST.
// Sin servidor (GitHub Pages) se usa la misma base SQLite dentro del navegador con sql.js.

const SQL_JS = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/';
const CLAVE_LOCAL = 'tienda-web-db';
let dbLocal = null;

function cargarScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function obtenerDbLocal() {
  if (dbLocal) return dbLocal;

  await cargarScript(SQL_JS + 'sql-wasm.js');
  const SQL = await initSqlJs({ locateFile: (archivo) => SQL_JS + archivo });

  let guardada = null;
  try { guardada = localStorage.getItem(CLAVE_LOCAL); } catch {}

  if (guardada) {
    dbLocal = new SQL.Database(Uint8Array.from(atob(guardada), (c) => c.charCodeAt(0)));
  } else {
    const [schema, seed] = await Promise.all(
      ['db/schema.sql', 'db/seed.sql'].map((ruta) => fetch(ruta).then((r) => r.text()))
    );
    dbLocal = new SQL.Database();
    dbLocal.exec(schema);
    dbLocal.exec(seed);
  }
  return dbLocal;
}

function guardarDbLocal() {
  try {
    const bytes = dbLocal.export();
    localStorage.setItem(CLAVE_LOCAL, btoa(String.fromCharCode(...bytes)));
  } catch {}
}

function consultar(db, sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const filas = [];
  while (stmt.step()) filas.push(stmt.getAsObject());
  stmt.free();
  return filas;
}

async function pedirApi(ruta, opciones) {
  try {
    const respuesta = await fetch(ruta, opciones);
    if (respuesta.headers.get('content-type')?.includes('application/json')) return respuesta;
  } catch {}
  return null; // no hay servidor: usar la base local
}

export async function obtenerProductos() {
  const respuesta = await pedirApi('api/productos');
  if (respuesta) return respuesta.json();

  const db = await obtenerDbLocal();
  return consultar(db, `
    SELECT p.id, p.nombre, p.precio, p.imagen, c.nombre AS categoria
    FROM productos p
    JOIN categorias c ON c.id = p.categoria_id
    ORDER BY p.id
  `);
}

export async function enviarMensaje(datos) {
  const respuesta = await pedirApi('api/mensajes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  if (respuesta) return { ok: respuesta.ok, ...(await respuesta.json()) };

  const { nombre, correo, texto } = datos;
  if (!nombre?.trim() || !correo?.trim() || !texto?.trim()) {
    return { ok: false, error: 'Faltan datos: nombre, correo y mensaje son obligatorios.' };
  }
  const db = await obtenerDbLocal();
  db.run('INSERT INTO mensajes (nombre, correo, texto) VALUES (?, ?, ?)', [nombre.trim(), correo.trim(), texto.trim()]);
  guardarDbLocal();
  return { ok: true, mensaje: '¡Gracias! Tu mensaje fue guardado.' };
}
