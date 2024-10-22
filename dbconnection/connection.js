// config/connection.js
import mysql2 from "mysql2/promise";
//require('dotenv').config();
const createConnection = async () => {
	try {
		const connection = await mysql2.createConnection({
			host: process.env.DB_HOST || "localhost",
			user: process.env.DB_USER || "root",
			password: process.env.DB_PASSWORD || "Hedel1974#",
			database: process.env.DB_NAME || "arte_tucklerdb",
			port: process.env.DB_PORT || 3306,
			//connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,
			//queueLimit: process.env.DB_QUEUE_LIMIT || 0
		});

		/* const connection = createConnection({
      host: process.env.CLEARDB_DATABASE_URL ? process.env.CLEARDB_DATABASE_URL.split('@')[1].split('/')[0] : 'localhost',
      user: process.env.CLEARDB_DATABASE_URL ? process.env.CLEARDB_DATABASE_URL.split(':')[1].split('@')[1] : 'root',
      password: process.env.CLEARDB_DATABASE_URL ? process.env.CLEARDB_DATABASE_URL.split(':')[2].split('@')[0] : 'Hedel1974#',
      database: process.env.CLEARDB_DATABASE_URL ? process.env.CLEARDB_DATABASE_URL.split('/')[1] : 'arte_tucklerdb',
      port: 3306, // El puerto por defecto para MySQL
    }); */
		console.log("Conectado a la base de datos");
		return connection;
	} catch (err) {
		console.error("Error conectando a la base de datos:", err);
		throw err; // Propagar el error para manejarlo más adelante
	}
};

export default createConnection;

/* connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos con ID:', connection.threadId);
});

export default connection;
 */
