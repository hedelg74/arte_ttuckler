// config/connection.js
import { createConnection } from 'mysql2';
//require('dotenv').config();

const connection = createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Hedel1974#',
  database: process.env.DB_NAME || 'arte_tucklerdb',
  port: process.env.DB_PORT || 3306,
  //connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,
  //queueLimit: process.env.DB_QUEUE_LIMIT || 0
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos con ID:', connection.threadId);
});

export default connection;
