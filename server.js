import express from 'express';
import apiRoutes from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Tienda web corriendo en http://localhost:${PORT}`);
});
