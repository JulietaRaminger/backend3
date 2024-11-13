import { expect } from "chai";
import supertest from "supertest";

const userRequest = supertest("http://localhost:8080/api/users");

describe("Test Integrales de Users", () => {
  let userTest;

  it("[GET] /api/users - Debe obtener todos los users", async () => {
    const { status, body } = await userRequest.get("/");
    expect(status).to.be.equal(200);
    expect(body.status).to.be.equal("success");
    expect(body.payload).to.be.an("array");
  });

  it("[POST] /api/users - Debe crear un nuevo user", async () => {
    const user = {
      first_name: "User",
      last_name: "Test2",
      email: `usertest${Date.now()}@gmail.com`,
      password: "12323",
    };

    const { status, body } = await userRequest.post("/").send(user);

    expect(status).to.be.equal(201);
    expect(body).to.be.an("object");
    expect(body.email).to.be.equal(user.email);

    userTest = body;
  });

  it("[PUT] /api/users/:uid - Debe actualizar un user por id", async () => {
    const user = { first_name: "Usuario" };

    const { status, body } = await userRequest
      .put(`/${userTest._id}`)
      .send(user);

    expect(status).to.be.equal(200);
    expect(body.status).to.be.equal("success");
    expect(body.payload).to.be.an("object");
    expect(body.payload.first_name).to.be.equal(user.first_name);
  });

  it("[DELETE] /api/users/:uid - Debe borrar un user por id", async () => {
    const { status, body } = await userRequest.delete(`/${userTest._id}`);

    expect(status).to.be.equal(200);
    expect(body.message).to.be.equal("User deleted");
  });
});