import PaymentService from "../services/payment.service.js ";
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
