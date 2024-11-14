import { fakerES_MX as faker } from "@faker-js/faker";

export const generateAdoptionMock = (count) => {
  const adoptions = [];
  for (let i = 0; i < count; i++) {
    adoptions.push({
      owner: faker.datatype.uuid(),
      pet: faker.datatype.uuid(),
      adoptionDate: faker.date.past(),
    });
  }
  return adoptions;
};