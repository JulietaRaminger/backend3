import PetDTO from "../dto/Pet.dto.js";
import { PetServices } from "../services/pet.services.js";
import __dirname from "../utils/index.js";

export class PetsController {
  constructor() {
    this.petsServices = new PetServices();
  }

  createPetMocks = async (req, res) => {
    try {
      const pets = await this.petsServices.createMocks();
      res.status(201).json({ message: "Mock pets created", pets });
    } catch (error) {
      console.error("Error creating mock pets:", error); // Agrega logs para depuración
      res
        .status(500)
        .json({ message: "Error creating mock pets", error: error.message });
    }
  };
  getAllPets = async (req, res) => {
    const pets = await this.petsServices.getAll();
    res.send({ status: "success", payload: pets });
  };

  createPet = async (req, res) => {
    const { name, specie, birthDate } = req.body;
    if (!name || !specie || !birthDate)
      return res
        .status(400)
        .send({ status: "error", error: "Incomplete values" });
    const pet = PetDTO.getPetInputFrom({ name, specie, birthDate });
    const result = await this.petsServices.create(pet);
    res.send({ status: "success", payload: result });
  };

  updatePet = async (req, res) => {
    const petUpdateBody = req.body;
    const petId = req.params.pid;
    const result = await this.petsServices.update(petId, petUpdateBody);
    res.send({ status: "success", message: "pet updated" });
  };

  deletePet = async (req, res) => {
    const petId = req.params.pid;
    const result = await this.petsServices.delete(petId);
    res.send({ status: "success", message: "pet deleted" });
  };

  createPetWithImage = async (req, res) => {
    const file = req.file;
    const { name, specie, birthDate } = req.body;
    if (!name || !specie || !birthDate)
      return res
        .status(400)
        .send({ status: "error", error: "Incomplete values" });
    console.log(file);
    const pet = PetDTO.getPetInputFrom({
      name,
      specie,
      birthDate,
      image: `${__dirname}/../public/img/${file.filename}`,
    });
    console.log(pet);
    const result = await this.petsServices.create(pet);
    res.send({ status: "success", payload: result });
  };
}