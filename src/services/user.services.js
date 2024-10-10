import Users from "../dao/Users.dao.js";
import { customError } from "../errors/custom.error.js";
import { generateUsersMock } from "../mocks/user.mock.js";

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
  async create(data) {
    const user = await this.userDao.save(data);
    if (!user) throw customError.badRequestError("Failed to create user");
    return user;
  }

  async crateMany(data) {
    const users = await this.userDao.saveMany(data);

    return users;
  }

  async update(id, data) {
    const user = await this.userDao.update(id, data);
    if (!user) throw customError.notFoundError(`User id ${id} not found`);
    return user;
  }
  async remove(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw customError.badRequestError(`Invalid ObjectId: ${id}`);
    }
    const user = await this.userDao.getBy(id);
    if (!user) {
      throw customError.notFoundError(`User id ${id} not found`);
    }
    await this.userDao.delete(id);
    return "User Deleted";
  }

  async createMocks() {
    const users = generateUsersMock(10);
    const usersDb = await this.userDao.saveMany(users);
    if (!usersDb)
      throw customError.badRequestError("Failed to create user mocks");

    return usersDb;
  }
}