import Pets from "../dao/Pets.dao.js";
import { generatePetsMock } from "../mocks/pet.mock.js";

export class PetServices {
  constructor() {
    this.petDao = new Pets();
  }
  async getAll() {
    const pets = await this.petDao.get();
    return pets;
  }
  async getById(id) {
    const pet = await this.petDao.getBy(id);
    return pet;
  }
  async create(data) {
    const pet = await this.petDao.save(data);
    return pet;
  }

  async crateMany(data) {
    const pets = await this.petDao.saveMany(data);

    return pets;
  }

  async update(id, data) {
    const pet = await this.petDao.update(id, data);
    return pet;
  }
  async remove(id) {
    await this.petDao.delete(id);
    return "Pet Deleted";
  }
  async createMocks() {
    try {
      const pets = generatePetsMock(10);
      const petsDb = await this.petDao.saveMany(pets);
      return petsDb;
    } catch (error) {
      console.error("Error in createMocks:", error);
      throw new Error("Error creating mock pets"); // Lanza un error que se puede manejar en el controlador
    }
  }
}