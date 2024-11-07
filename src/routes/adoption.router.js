// routes/adoptions.routes.js
import { Router } from "express";
import { AdoptionsController } from "../controllers/adoptions.controller.js";

const router = Router();
const adoptionsController = new AdoptionsController();

router.get("/", adoptionsController.getAllAdoptions);
router.get("/:aid", adoptionsController.getAdoption);
router.post("/:uid/:pid", adoptionsController.createAdoption);
router.delete("/:aid", adoptionsController.deleteAdoption);

export default router;