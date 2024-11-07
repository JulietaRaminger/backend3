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

  async createMany(data) {
    const pets = await this.petDao.saveMany(data);

    return pets;
  }

  async update(id, data) {
    const pet = await this.petDao.update(id, data);
    return pet;
  }
  async delete(id) {
    const deletedPet = await this.petDao.delete(id);
    if (!deletedPet) {
      throw new Error("No pet found with the given id.");
    }
    return "Pet Deleted";
  }
  async createMocks() {
    try {
      const pets = generatePetsMock(5);
      const petsDb = await this.petDao.saveMany(pets);
      return petsDb;
    } catch (error) {
      console.error("Error in createMocks:", error);
      throw new Error("Error creating mock pets");
    }
  }
}