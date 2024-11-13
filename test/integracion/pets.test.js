import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8080/api/pets");

describe("Test Integrales de Pets", () => {
  let testPet;
  it("[GET] /api/pets - Debe obtener todos los pets", async () => {
    const { status, body } = await request.get("/");
    expect(status).to.be.equal(200);
    expect(body.status).to.be.equal("success");
    expect(body.payload).to.be.an("array");
  });

  it("[POST] /api/pets - Debe crear un nuevo pet", async () => {
    const pet = {
      name: "Pepito",
      specie: "perro",
      birthDate: "2022-01-01",
      image: "https://example.com/pet.jpg",
    };
    const { status, body } = await request.post("/").send(pet);
    testPet = body.payload;
    expect(status).to.be.equal(201);
    expect(body.status).to.be.equal("success");
    expect(body.payload).to.be.an("object");
    expect(body.payload.name).to.be.equal(pet.name);
  });

  it("[PUT] /api/pets/:id - Debe actualizar un pet por id", async () => {
    const pet = {
      name: "Maario",
    };
    const { status, body } = await request.put(`/${testPet._id}`).send(pet);
    expect(status).to.be.equal(200);
    expect(body.status).to.be.equal("success");
    expect(body.payload).to.be.an("object");
    expect(body.payload.name).to.be.equal(pet.name);
    expect(body.payload.adopted).to.be.equal(false);
  });

  it("[DELETE] /api/pets/:pid - Debe borrar un pet por id", async () => {
    const { status, body } = await request.delete(`/${testPet._id}`);

    expect(status).to.be.equal(200);
    expect(body.message).to.be.equal("Pet deleted");
  });
});