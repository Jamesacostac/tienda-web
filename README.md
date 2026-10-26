# Tienda Urbana

Página web pequeña de una tienda en línea, hecha con **Node.js + Express** en el backend, **SQLite** como base de datos y **HTML5, CSS y JavaScript** en el frontend. El proyecto usa una arquitectura **MVC** con una API REST que responde en JSON.

**Sitio en línea:** <https://jamesacostac.github.io/tienda-web/>

> En GitHub Pages no hay servidor Node, así que el sitio usa la misma base de datos SQLite (`db/schema.sql` y `db/seed.sql`) dentro del navegador con [sql.js](https://sql.js.org). Los mensajes de contacto se guardan en el navegador de cada visitante. Con `npm start` se usa el servidor Express y la base de datos en el archivo `db/tienda.db`.

## Requisitos cumplidos

| Requisito | Dónde está |
|---|---|
| 2 enlaces o saltos entre páginas | Menú `<nav>` que enlaza `index.html`, `productos.html` y `contacto.html` (3 páginas) |
| 3 imágenes | `public/img/camiseta.svg`, `tenis.svg` y `gorra.svg` |
| 3 botones | "Ver productos" (inicio), "Agregar al carrito" y "Vaciar carrito" (productos), "Enviar mensaje" (contacto) |
| Base de datos con mínimo 2 tablas | `categorias`, `productos` (relacionadas por llave foránea) y `mensajes`. Ver `db/schema.sql` |
| Cargado en un repositorio | Este repositorio de GitHub |

## Estructura (MVC)

```
tienda-web/
├── server.js                 # Punto de entrada (Express)
├── routes/api.js             # Rutas de la API REST
├── controllers/              # Controladores (reciben la petición y delegan)
├── models/                   # Modelos (consultas a la base de datos)
├── db/
│   ├── schema.sql            # Creación de las tablas
│   └── database.js           # Conexión SQLite y datos iniciales
└── public/                   # Vistas: HTML, CSS, JS e imágenes
```

## Cómo ejecutarlo

Se necesita **Node.js 22.5 o superior** (trae SQLite integrado).

```bash
npm install
npm start
```

Abrir en el navegador: <http://localhost:3000>

## API

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/productos` | Lista los productos con su categoría (JOIN entre tablas) |
| GET | `/api/categorias` | Lista las categorías |
| POST | `/api/mensajes` | Guarda un mensaje de contacto. Devuelve **201** si se guarda y **400** si faltan datos |
