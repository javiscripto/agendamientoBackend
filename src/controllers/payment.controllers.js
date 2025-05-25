import PaymentService from "../services/payment.service.js ";
import stripe from "stripe";
import dotenv from "dotenv";
import RentalService from "../services/rental.service.js";
import { transporter } from "../mailer/mailer.js";
dotenv.config();

const paymentService = new PaymentService();
const rentalService = new RentalService();

export const createSesion = async (req, res) => {
  try {
    const response = await paymentService.createSession(req.body);
    res.json({ url: response });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

//---------------------------------------------
export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.error("Webhook error verificando la firma:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    //confirmar la reservacion y actualizar el estado
    const reservationId = event.data.object.metadata.reservationId;
    await rentalService.confirmRental(reservationId);

    console.log("✅ Pago exitoso:", session.customer_details);
    //notificar al usuario
    const email = session.customer_details.email;
    const customer = session.customer_details.name;
    const mailOptions = {
      to: email,
      from: process.env.MAILER_USER,
      subject: "Arriendo: pago exitoso",
      text: `estimado ${customer}, su arriendo ha sido confirmado con exito, gracias por elegirnos`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo:", error);
      } else {
        console.log("Correo enviado:", info.response);
      }
    });

    res.status(200).send();
  } else {
    res.status(200).send();
  }
};

export const checkOut = (req, res) => {
  res.json("checkout");
};

export const success = (req, res) => {
  res.json("success");
};

export const cancel = (req, res) => {
  res.json("cancel");
};
