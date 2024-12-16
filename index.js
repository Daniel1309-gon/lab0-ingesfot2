const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

// Acceder a las variables de entorno
 const PORT = process.env.PORT || 3000;
const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const NAME = process.env.DB_NAME;

// Importar rutas
const personaRoutes = require('./routes/persona.js');
const municipioRoutes = require('./routes/municipio.js');
const direccionRoutes = require('./routes/direccion.js');
const viviendaRoutes = require('./routes/vivienda.js');
const relacionRoutes = require('./routes/relacion.js');

// Middlewares
app.use(bodyParser.json());

// Usar rutas
app.use('/persona', personaRoutes);
app.use('/municipio', municipioRoutes);
app.use('/direccion', direccionRoutes);
app.use('/vivienda', viviendaRoutes);
app.use('/relacion', relacionRoutes);

// Puerto

app.listen(PORT, () => {
    console.log(`Conectando a la base de datos en ${HOST}...`);;
});

