import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_KEY);

export const createSesion = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          product_data: {
            name: "departamento 1",
            description: "descripcion del departamento",
          },

          currency: "usd",
          unit_amount: 10000, //100.00
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/payment/success",
    cancel_url: "http://localhost:3000/payment/cancel",
  });
  const url = session.url;
  return res.redirect(url);
};

//----------------------------------------------

export const checkOut = (req, res) => {
  res.json("checkout");
};

export const success = (req, res) => {
  res.json("success");
};

export const cancel = (req, res) => {
  res.json("cancel");
};
