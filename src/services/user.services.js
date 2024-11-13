import mongoose from "mongoose";
import Users from "../dao/Users.dao.js";
import { customError } from "../errors/custom.error.js";

export class UserServices {
  constructor() {
    this.userDao = new Users();
  }

  async getAll() {
    const users = await this.userDao.get();
    if (!users) throw customError.notFoundError(`No user found`);
    return users;
  }
  async getById(id) {
    const user = await this.userDao.getBy(id);
    if (!user) throw customError.notFoundError(`User id ${id} not found`);
    return user;
  }

  async getByEmail(email) {
    return await this.userDao.getByEmail(email);
  }
  async create(data) {
    const user = await this.userDao.save(data);
    return user;
  }

  async createMany(data) {
    const users = await this.userDao.saveMany(data);

    return users;
  }

  async update(id, data) {
    const user = await this.userDao.update(id, data);
    if (!user) throw customError.notFoundError(`User id ${id} not found`);
    return user;
  }
  async remove(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw customError.badRequestError(`Invalid ObjectId: ${id}`);
      }
      const user = await this.userDao.get(id);
      if (!user) {
        throw customError.notFoundError(`User id ${id} not found`);
      }
      await this.userDao.delete(id);
      return "User Deleted";
    } catch (error) {
      console.error("Error in remove method:", error);
      throw error;
    }
  }

  createUserMock = async (req, res) => {
    try {
      const users = await this.userServices.createMocks();
      res.status(201).json({ status: "success", users });
    } catch (error) {
      console.error("Error creating mock users:", error);
      res.status(500).json({ status: "error", message: error.message });
    }
  };
}