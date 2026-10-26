-- Datos iniciales de la tienda

INSERT INTO categorias (nombre) VALUES ('Ropa'), ('Calzado'), ('Accesorios');

INSERT INTO productos (nombre, precio, imagen, categoria_id) VALUES
  ('Camiseta básica',  45000,  'img/camiseta.svg', (SELECT id FROM categorias WHERE nombre = 'Ropa')),
  ('Tenis deportivos', 189000, 'img/tenis.svg',    (SELECT id FROM categorias WHERE nombre = 'Calzado')),
  ('Gorra clásica',    35000,  'img/gorra.svg',    (SELECT id FROM categorias WHERE nombre = 'Accesorios'));
