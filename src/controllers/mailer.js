// mailer.js
import 'dotenv/config';
import nodemailer from 'nodemailer';

// Parámetros de autenticación usando variables de entorno
const gmailMail = process.env.GMAIL_MAIL; // Tu dirección de correo
const gmailPassword = process.env.GMAIL_PASSWORD; // Tu contraseña de Hotmail

// Configuración del transportador con usuario y contraseña
async function crearTransporter() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type:'login', //‘oauth2’
      user: gmailMail, // Tu dirección de correo
      pass: gmailPassword, // Tu contraseña
    },
  });

  return transporter;
}

const sendEmail = async (customerData, carrito, orderNumber) => {
  const transporter = await crearTransporter();
  const to=customerData.email;
  const subject=`Arte-ttuckler - Confirmación de tu pedido #${orderNumber}`;
  const now = new Date(Date.now());
  const formattedDateTime = now.toLocaleDateString() + " " + now.toLocaleTimeString();
  let costoEnvio=0.00, subTotal=0.00, total=0.00;

  let htmlContent=`
  <p><strong>Gracias por tu pedido en Arte-ttukler.</strong><hr>
  A continuación, te proporcionamos los detalles de tu compra:;
  <br><br>
  <strong>Número de pedido: ${orderNumber}</strong><br>
  Fecha del pedido: ${formattedDateTime}<br>
  Método de pago: Transferencia bancaria, Simpe, Paypal.
  <br><br>
  <strong>Dirección de envío:</strong><br>
  ${customerData.name + " " + customerData['last-name']}<br>
  ${customerData.address}<br>
  ${customerData.city}, ${customerData['postal-code']}, ${customerData.state}, ${customerData.country}<br>
  Tel:${customerData['phone-number']}
  <br><br>
  <strong>Productos pedidos:</strong>
  <table style="width: 80%; margin: 20px 0; font-size: 12px; font-family: Arial, sans-serif; border-collapse: collapse;">
      <thead style="background:gray; color:white;">
        <tr>
          <th>Imagen</th>
          <th>Descripcion</th>
          <th>Cantidad</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody style="border-bottom:solid 1px gray">`;

  carrito.forEach((item, index) => {
    htmlContent +=
    `<tr>
      <td style="text-align:center;"><img src="cid:imagen${index}" alt="${item.titulo}" style="width: 36px; height: 36px;"></td>
      <td style="text-align:center;">${item.titulo}</td>
      <td style="text-align:center;">${item.cantidad}</td>
      <td style="text-align:right;">$ ${item.precio}</td>
     </tr>
      `;
      subTotal+=Number(item.precio);
  });

  total=subTotal+costoEnvio;

  htmlContent +=
  `</tbody>
  <tfoot">
    <tr style="font-weight:bold;"><td>Subtotal</td><td colspan="3" style="text-align:right";>$ ${subTotal.toFixed(2)}</td></tr>
    <tr style="font-weight:bold;"><td>Envio</td><td colspan="3" style="text-align:right;">$ ${costoEnvio.toFixed(2)}</td></tr>
    <tr style="font-weight:bold;"><td>Total</td><td  colspan="3" style="text-align:right";>$ ${total.toFixed(2)}</td></tr>
  </tfoot>
  </table>
  <br><hr>
  <strong>Estado del pedido: Confirmado &#10004;</strong>
  <br><br>
  <strong style="background-color: yellow;">*** Pronto no pondremos en contacto contigo para acordar la forma de pago y envio.</strong><br>
  Si tienes alguna duda o necesitas realizar alguna modificación en tu pedido, no dudes en contactarnos a <a href="hdelgados@gmail.com">hdelgados@gmail.com</a> <br>
  o llamando al +506-7218-7581.<br><br>
  <strong>Gracias nuevamente por tu compra.</strong><br>
  <br><br>
  Atentamente,<br>
  Arte-ttuckler<br>
  email: <a href="hdelgados@gmail.com">hdelgados@gmail.com</a><br>
  Tel:+506-7218-7581<br>
  Web-site:<a href="www.arte-ttucler.com">www.arte-ttuckler.com</a>
  </p>
  `

  const mailOptions = {
    from: gmailMail,
    to: [to,gmailMail],
    subject: subject,
    html: htmlContent,
    attachments: carrito.map((item, index) => ({
      filename: item.titulo,
      path: item.imagen, // Ruta de la imagen
      cid: `imagen${index}` // Content ID que referenciará la imagen en el HTML
    }))
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado exitosamente');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw error;
  }
};


export default sendEmail;
