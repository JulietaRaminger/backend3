// routes/adoptions.routes.js
import { Router } from "express";
import { AdoptionsController } from "../controllers/adoptions.controller.js";

const router = Router();
const adoptionsController = new AdoptionsController();

router.get("/", adoptionsController.getAllAdoptions); // Obtener todas las adopciones
router.get("/:aid", adoptionsController.getAdoption); // Obtener una adopción por su ID
router.post("/:uid/:pid", adoptionsController.createAdoption); // Crear una nueva adopción

export default router;