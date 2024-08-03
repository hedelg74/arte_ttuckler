import path from 'path';
import { fileURLToPath } from 'url';
import { readdir } from 'fs/promises'; // Importa readdir de fs/promises para usar async/await
import conn from "../../dbconnection/connection.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getProductos ={ 
    // CATEGORIA  - ALAMBRE - COLLARES
    macrameCollares: async (req, res, next) => {
        try {
            const productos = await new Promise((resolve, reject) => {
                conn.query("SELECT * FROM productos WHERE categoria='alambre' AND sub_categoria='collares' AND estado=1", (err, productos) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(productos);
                    }
                });
            });

            //const producto_existentes = productos.filter(producto => producto.cantidad > 0);
            res.json(productos);

        } catch (err) {
            next(new Error(err));
        }
    },
    // CATEGORIA  - ALAMBRE - DIJES
    macrameDijes: async (req, res, next) => {
        try {
            const productos = await new Promise((resolve, reject) => {
                conn.query("SELECT * FROM productos WHERE categoria='alambre' AND sub_categoria='dijes'", (err, productos) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(productos);
                    }
                });
            });

            //const producto_existentes = productos.filter(producto => producto.cantidad > 0);
            res.json(productos);

        } catch (err) {
            next(new Error(err));
        }
    },
     // CATEGORIA  - ALAMBRE - BRAZALETES
     macrameBrazaletes: async (req, res, next) => {
        try {
            const productos = await new Promise((resolve, reject) => {
                conn.query("SELECT * FROM productos WHERE categoria='alambre' AND sub_categoria='brazaletes'", (err, productos) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(productos);
                    }
                });
            });

            //const producto_existentes = productos.filter(producto => producto.cantidad > 0);
            res.json(productos);

        } catch (err) {
            next(new Error(err));
        }
    }
};
export default getProductos;



/*(req, res) => {
    readdir(path.join(__dirname, './public/images/macrame'), (err, files) => {
        if (err) {
            res.status(500).send('Error al leer el directorio');
            return;
        }
        const imagePaths = files.map(file => `./images/macrame/${file}`);
        res.json(imagePaths);
    });
});

export default getArticulos;*/