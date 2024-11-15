import { expect } from "chai";
import supertest from "supertest";

const adoptionRequest = supertest("http://localhost:8080/api/adoptions");
const userRequest = supertest("http://localhost:8080/api/users");
const petRequest = supertest("http://localhost:8080/api/pets");
const sessionRequest = supertest("http://localhost:8080/api/sessions");

describe("Test de integración Adoptions", () => {
    let userTest;
    let testPet;
    let adoptionTest; 


    it("[POST]/api/sessions/register - Debe registrar un usuario/a", async () => {
      const newUser = {
        first_name: "Liones",
        last_name: "Messi",
        email: "messi@gmail.com",
        password: "123",
      };
  
      const { status, body } = await sessionRequest.post("/register").send(newUser);
      userTest = body.payload;
  
      expect(status).to.be.equal(201);
      expect(body.status).to.be.equal("success");
      expect(body.payload).to.be.an("object");
      expect(body.payload.email).to.be.equal(newUser.email);
      expect(body.payload.first_name).to.be.equal(newUser.first_name);
      expect(body.payload.last_name).to.be.equal(newUser.last_name);
      expect(body.payload.password).to.not.be.equal(newUser.password);
    });


    it("[POST] /api/sessions/login - Debe iniciar sesión como usuario", async () => {
        const data = {
          email: "messi@gmail.com",
          password: "123",
        };
    
        const { status, body } = await sessionRequest.post("/login").send(data);
        
        expect(status).to.be.equal(200);
        expect(body.status).to.be.equal("success");
        expect(body.message).to.be.an("string");
      });


  it("[POST] /api/pets - Debe crear una mascota", async () => {
    const newPet = {
        name: "Homero",
        specie: "lewandowski",
        birthDate: "09/10/2024",
        image: "asdguihsduif",
    };
    const { status, body } = await petRequest.post("/").send(newPet);
    testPet = body.payload;
    expect(status).to.be.equal(201);
    expect(body.payload).to.be.an("object");
    expect(body.payload.name).to.be.equal ("Homero");
    expect(body.payload.specie).to.be.equal("lewandowski");
    expect(body.payload.adopted).to.be.equal(false);
});


  it("[POST] /api/adoptions/:uid/:pid - Debe adoptar una mascota", async () => {
    const { status, body } = await adoptionRequest.post(`/${userTest._id}/${testPet._id}`).send();

    expect(status).to.be.equal(201);
    expect(body.status).to.be.equal("success");
    adoptionTest = body.payload;
  });

  

  it("[POST] /api/adoptions/:uid/:pid - Debe falla si existe la adopcion", async () => {
    const { status, body } = await adoptionRequest.post(`/${userTest._id}/${testPet._id}`).send();

    expect(status).to.be.equal(400);
    expect(body.status).to.be.equal("error");
    expect(body.message).to.be.equal("Adoption already exists");
  });


  it("[GET] /api/adoptions - Debe devolver todas las adopciones", async () => {
    const { status, body } = await adoptionRequest.get("/");

    expect(status).to.be.equal(200);
    expect(body.status).to.be.equal("success");
    expect(Array.isArray(body.adoptions)).to.be.true;
    
  });


it("[GET] /api/adoptions/:aid - Debe devolver 400 si no encuentra la adopcion", async () => {
    const invalidAdoptionId = "invalidAdoptionId";
    const { status, body } = await adoptionRequest.get(`/${invalidAdoptionId}`);
  
    expect(status).to.be.equal(400);
    expect(body.status).to.be.equal("error");
    expect(body.error).to.be.equal("Invalid Adoption ID");
  });


after(async () => {
    await userRequest.delete(`/${userTest._id}`);
    await petRequest.delete(`/${testPet._id}`);
  });
});