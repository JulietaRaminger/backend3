import { Router } from "express";
import { generateUsersMock } from "../mocks/user.mock.js";
import { UserServices } from "../services/user.services.js";
import { generatePetsMock } from "../mocks/pet.mock.js";
import { PetServices } from "../services/pet.services.js";

const userServices = new UserServices();
const petsServices = new PetServices();
const router = Router();

router.get("/mockingpets", async (req, res) => {
  const users = generatePetsMock(100);
  const response = await petsServices.createMany(pets);
  res.status(201).json({ status: "success", payload: response });
});

router.get("/mockingusers", async (req, res) => {
  const users = generateUsersMock(50);
  const response = await userServices.crateMany(users);

  res.status(201).json({ status: "success", payload: response });
});

router.get("/generateData/:cu/:cp", async (req, res) => {
  const { cu, cp } = req.params;
  const users = generateUsersMock(cu);
  const pets = generatePetsMock(cp);
  const userResponse = await userServices.createMany(users);
  const petsResponse = await petsServices.createMany(pets);

  res
    .status(201)
    .json({ status: success, payload: { userResponse, petsResponse } });
});

export default router;