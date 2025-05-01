import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_KEY);

export default class PaymentService {
  constructor() { }
  createSession = async (paymentData) => {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              product_data: {
                name: paymentData.name, // datos populados del modelo property
                description: `${paymentData.description} por un total de ${paymentData.quantity} dias`,
              },

              currency: "usd",
              unit_amount: paymentData.price * 100, //se multiplica para efectos de conversion
            },
            quantity: paymentData.quantity, // la cantidad de dias
          },
        ],
        mode: "payment",
        success_url: "http://localhost:3000/payment/success",
        cancel_url: "http://localhost:3000/payment/cancel",
      });
      return session.url;
    } catch (error) {
      console.error("Error al crear la sesion: ", error);
      throw new Error("service error:" + error);
    }
  };
}
