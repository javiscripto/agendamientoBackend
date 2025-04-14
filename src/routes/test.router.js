import { Router } from "express";
import { createUser, getAll } from "../controllers/test.controller.js";

const router = Router();

router.post("/create", createUser); //router de prueba para la creacion de recursos en mongo

router.get("/getAll", getAll);

export default router;
