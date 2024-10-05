import createConnection from "../../dbconnection/connection.js";
import sendEmail from "./mailer.js";
let orderNumber="";

const procesarPedido = async (req, res, next) => {
  try {
    const { formData, carrito } = req.body;


    // Aquí procesamos los datos del formulario y del carrito.
    let query = `
      INSERT INTO clientes (nombre, apellido, direccion, ciudad, estado, pais, codigo_postal, email, telefono)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    let values = [
      formData.name,
      formData['last-name'],
      formData.address,
      formData.city,
      formData.state,
      formData.country,
      formData['postal-code'],
      formData.email,
      formData['phone-number']
    ];

    const connection = await createConnection();

    // Insertar el cliente
    await connection.query(query, values);

    // Obtener el último cliente insertado
    const [clt_rows] = await connection.query('SELECT LAST_INSERT_ID() as id_cliente');

    if (clt_rows.length > 0) {
      const id_cliente = clt_rows[0].id_cliente;

      // Insertar el pedido
      await connection.query('INSERT INTO pedidos (id_cliente) VALUES (?)', [id_cliente]);

      // Obtener el último pedido insertado
      const [ped_rows] = await connection.query('SELECT LAST_INSERT_ID() as id_pedido');

      if (ped_rows.length > 0) {
        const id_pedido = ped_rows[0].id_pedido;
        orderNumber=id_pedido;

        // Insertar los productos en detalle_pedido
        const query = `INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio) VALUES (?,?,?,?)`;
        for (const element of carrito) {
          let values = [id_pedido, element.id, element.cantidad, element.precio];
          await connection.query(query, values);
        }

        // Enviar respuesta exitosa si todo ha salido bien
        res.status(200).json({
          success: true,  // Asegúrate de que el frontend espera este campo
          message: 'Pedido procesado con éxito',
          data: req.body
        });
      } else {
        console.log('Pedido no encontrado');
        res.status(404).json({ success: false, message: 'Pedido no encontrado' });
      };
    } else {
      console.log('Cliente no encontrado');
      res.status(404).json({ success: false, message: 'Cliente no encontrado' });
    };

    // Cerrar la conexión
    await connection.end();
    sendEmail(formData,carrito,orderNumber);

  } catch (error) {
    console.error('Error al procesar el pedido:', error);
    res.status(500).json({ success: false, message: error.message });
  };
};

export default procesarPedido;
