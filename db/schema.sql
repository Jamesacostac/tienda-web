-- Esquema de la base de datos de la tienda (SQLite)

-- Tabla 1: categorías de productos
CREATE TABLE IF NOT EXISTS categorias (
  id     INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL UNIQUE
);

-- Tabla 2: productos (cada producto pertenece a una categoría)
CREATE TABLE IF NOT EXISTS productos (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre       TEXT    NOT NULL,
  precio       INTEGER NOT NULL,
  imagen       TEXT    NOT NULL,
  categoria_id INTEGER NOT NULL REFERENCES categorias(id)
);

-- Tabla 3: mensajes enviados desde el formulario de contacto
CREATE TABLE IF NOT EXISTS mensajes (
  id     INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  correo TEXT NOT NULL,
  texto  TEXT NOT NULL,
  fecha  TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
);
