import { obtenerProductos } from './api.js';

const lista = document.getElementById('lista-productos');
const cantidadEl = document.getElementById('carrito-cantidad');
const totalEl = document.getElementById('carrito-total');
const carrito = [];

const formatoPesos = (valor) => '$' + valor.toLocaleString('es-CO');

function actualizarCarrito() {
  const total = carrito.reduce((suma, p) => suma + p.precio, 0);
  cantidadEl.textContent = carrito.length;
  totalEl.textContent = formatoPesos(total);
}

async function cargarProductos() {
  try {
    const productos = await obtenerProductos();

    lista.innerHTML = '';
    for (const producto of productos) {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <span class="etiqueta">${producto.categoria}</span>
        <h2>${producto.nombre}</h2>
        <p class="precio">${formatoPesos(producto.precio)}</p>
        <button type="button" class="btn">Agregar al carrito</button>
      `;
      card.querySelector('button').addEventListener('click', () => {
        carrito.push(producto);
        actualizarCarrito();
      });
      lista.appendChild(card);
    }
  } catch {
    lista.innerHTML = '<p>No se pudieron cargar los productos.</p>';
  }
}

document.getElementById('btn-vaciar').addEventListener('click', () => {
  carrito.length = 0;
  actualizarCarrito();
});

cargarProductos();
