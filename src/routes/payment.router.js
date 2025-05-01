import { Router } from "express";
import {
  cancel,
  checkOut,
  createSesion,
  success,
} from "../controllers/payment.controllers.js";

const router = Router();

router.post("/checkout", createSesion);
router.get("/success", success);
router.get("/cancel", cancel);

export default router;
