// Rutas de la API REST (responden en JSON)
import { Router } from 'express';
import { getProductos, getCategorias } from '../controllers/productoController.js';
import { postMensaje } from '../controllers/mensajeController.js';

const router = Router();

router.get('/productos', getProductos);
router.get('/categorias', getCategorias);
router.post('/mensajes', postMensaje);

export default router;
