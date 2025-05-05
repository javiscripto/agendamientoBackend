import express, { Router, raw } from "express";
import {
  cancel,
  checkOut,
  createSesion,
  handleStripeWebhook,
  success,
} from "../controllers/payment.controllers.js";

const router = Router();

router.post("/checkout", express.json(), createSesion);
router.post("/webhook", raw({ type: "application/json" }), handleStripeWebhook);
router.get("/success", success);
router.get("/cancel", cancel);

export default router;
