import PaymentService from "../services/payment.service.js ";
import stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const paymentService = new PaymentService();

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

    // Aquí puedes acceder a los datos de la transacción
    console.log("✅ Pago exitoso:", session);

    // Ejemplo: guardar en la base de datos
    // saveTransaction(session);

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
