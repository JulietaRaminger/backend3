import Pet from "../dao/Pets.dao.js";
import Adoption from "../dao/Adoption.js";

import PetRepository from "../repository/PetRepository.js";
import AdoptionRepository from "../repository/AdoptionRepository.js";

export const petsService = new PetRepository(new Pet());
export const adoptionsService = new AdoptionRepository(new Adoption());