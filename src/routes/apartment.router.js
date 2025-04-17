import { Router } from "express";
import { createApartment, deleteApartment, getAllApartments, getApartmentByID, updateApartment } from "../controllers/apartment.controllers.js";

const router = Router();

router.post("/createApartment", createApartment);
router.get("/getAllApartments", getAllApartments);
router.get("/getApartmentById/:aid", getApartmentByID);
router.put("/updateApartment/:aid", updateApartment);
router.delete("/deleteApartmentById/:aid", deleteApartment);

export default router