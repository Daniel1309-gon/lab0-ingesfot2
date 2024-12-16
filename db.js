require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT, // Puerto predeterminado de PostgreSQL
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync(process.env.SSL_CERT_PATH).toString(),
      },
});
pool.connect()
  .then(() => console.log('Conexión exitosa con SSL'))
  .catch(err => console.error('Error al conectar con PostgreSQL', err));
module.exports = pool;
