import Users from "../../src/dao/Users.dao.js";
import mongoose from "mongoose";
import { expect } from "chai";

mongoose.connect(
  "mongodb+srv://julietaraminger:ImIimWsRYLs3oThf@cluster0.uwq4ups.mongodb.net/Adoptame"
);

// Describir nuestro test
describe("Test UserDAO", function () {
  //Tiempo de espera 5000 ms
  this.timeout(5000);

  const UserDao = new Users();

  let userTest;

  // Metodo que se ejecuta antes de todos los tests
  before(() => {
    console.log("Inicio de todos los tests");
  });

  // Metodo que se ejecuta antes de cada tests

  beforeEach(() => {
    console.log("Inicio de cada test");
  });

  // Test individual
  it("Debería retornar un array con todos los usuarios", async () => {
    const users = await UserDao.get();
    expect(users).to.be.an("array");
    expect(users).to.be.not.an("object");
  });

  it("Debería crear un nuevo usuario", async () => {
    const newUser = {
      first_name: "Pepe",
      last_name: "Perez",
      email: "ahadad28@example.com",
      password: "123456",
      age: 25,
      birthDate: "2000-01-01",
    };

    const createdUser = await UserDao.save(newUser);
    userTest = createdUser;
    //afirmacion
    expect(createdUser).to.be.an("object");
    expect(createdUser).to.have.property("_id");
    expect(createdUser.first_name).to.be.equal(newUser.first_name);
    expect(createdUser.last_name).to.be.equal(newUser.last_name);
    expect(createdUser.email).to.be.equal(newUser.email);
    expect(createdUser.password).to.be.equal(newUser.password);
    expect(createdUser.role).to.be.equal("user");

    //negación

    expect(createdUser).to.not.have.property("age");
    expect(createdUser).to.not.have.property("birthDate");
    expect(createdUser).to.not.null;
    expect(createdUser).to.not.be.an("array");
  });

  it("Debería retornar un usuario por id", async () => {
    const user = await UserDao.getById(userTest._id);
    expect(user).to.be.an("object");
    expect(user).to.have.property("_id");
    expect(user.first_name).to.be.equal(userTest.first_name);
    expect(user.last_name).to.be.equal(userTest.last_name);
    expect(user.email).to.be.equal(userTest.email);
    expect(user.password).to.be.equal(userTest.password);
  });

  it("Debería actualizar un usuario por id", async () => {
    const updatedUser = {
      first_name: "George",
      password: "54321",
    };

    const user = await UserDao.update(userTest._id, updatedUser);
    expect(user).to.be.an("object");
    expect(user).to.have.property("_id");
    expect(user.first_name).to.be.equal("George");
    expect(user.last_name).to.be.equal(userTest.last_name);
    expect(user.email).to.be.equal(userTest.email);
    expect(user.password).to.be.equal("54321");
  });

  it("Debería borrar un usuario por id", async () => {
    await UserDao.delete(userTest._id);
    const user = await UserDao.getById(userTest._id);
    expect(user).to.be.null;
  });

  // Metodo que se ejecuta despues de cada tests
  afterEach(() => {
    console.log("Final de cada test");
  });
  // Metodo que se ejecuta despues de todos los tests
  after(() => {
    console.log("Final de todos los tests");
    mongoose.disconnect();
  });
});