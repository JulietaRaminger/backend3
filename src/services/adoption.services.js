import Adoptions from "../dao/Adoptions.dao.js"; // Asegúrate de tener un DAO para adopciones
import { generateAdoptionsMock } from "../mocks/adoption.mock.js";

export class AdoptionServices {
  constructor() {
    this.adoptionDao = new Adoptions();
  }

  async getAll() {
    return await this.adoptionDao.get();
  }

  async getById(id) {
    return await this.adoptionDao.getBy({ _id: id });
  }

  async create(data) {
    return await this.adoptionDao.save(data);
  }

  async update(id, data) {
    return await this.adoptionDao.update(id, data);
  }

  async remove(id) {
    await this.adoptionDao.delete(id);
    return "Adoption Deleted";
  }

  async createMocks() {
    const adoptions = generateAdoptionsMock(10);
    return await this.adoptionDao.saveMany(adoptions);
  }
}