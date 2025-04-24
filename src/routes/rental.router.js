import { Router } from "express";
import {
  createRental,
  getAllRentals,
  deleteRental,
  getRentalById,
} from "../controllers/rental.controller.js";

const router = Router();

router.post("/createRental/:pid", createRental);
router.get("/getAllRentals", getAllRentals);
router.get("/getRentalById/:rid", getRentalById);
router.delete("/deleteRentalById/:rid", deleteRental);
export default router;
