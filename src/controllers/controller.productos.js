
import createConnection from "../../dbconnection/connection.js";


const getProductos = {
    macrameCollares: async (req, res, next) => {
        try {
            const connection = await createConnection(); // Obtener la conexión
            const [productos] = await connection.query("SELECT * FROM productos WHERE categoria='alambre' AND sub_categoria='collares' AND estado=1");
            res.json(productos);
            await connection.end();
        } catch (err) {
            next(new Error(err));
        }
    },
    macrameDijes: async (req, res, next) => {
        try {
            const connection = await createConnection(); // Obtener la conexión
            const [productos] = await connection.query("SELECT * FROM productos WHERE categoria='alambre' AND sub_categoria='dijes' AND estado=1");
            res.json(productos);
            await connection.end();
        } catch (err) {
            next(new Error(err));
        }
    },
    macrameBrazaletes: async (req, res, next) => {
        try {
            const connection = await createConnection(); // Obtener la conexión
            const [productos] = await connection.query("SELECT * FROM productos WHERE categoria='alambre' AND sub_categoria='brazaletes' AND estado=1");
            res.json(productos);
            await connection.end();
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
