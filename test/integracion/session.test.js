import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8080/api/sessions");
const userRequest = supertest("http://localhost:8080/api/users");

describe("Test Integrales de Sessions", () => {
  let userTest;
  it("[POST] /api/sessions/register - Debe registrar un usuario", async () => {
    const user = {
      first_name: "User",
      last_name: "Test",
      email: "usertest1@gmail.com",
      password: "123",
    };

    const { status, body } = await request.post("/register").send(user);
    userTest = body.payload;

    expect(status).to.be.equal(201);
    expect(body.status).to.be.equal("success");
    expect(body.payload).to.be.an("object");
    expect(body.payload.email).to.be.equal(user.email);
    expect(body.payload.first_name).to.be.equal(user.first_name);
    expect(body.payload.last_name).to.be.equal(user.last_name);
    expect(body.payload.password).to.not.be.equal(user.password);
  });

  it("[POST] /api/sessions/login - Debe loguear un usuario", async () => {
    const data = {
      email: "usertest1@gmail.com",
      password: "123",
    };

    const { status, body } = await request.post("/login").send(data);

    expect(status).to.be.equal(200);
    expect(body.status).to.be.equal("success");
    expect(body.message).to.be.an("string");
  });

  after(async () => {
    await userRequest.delete(`/${userTest._id}`);
  });
});