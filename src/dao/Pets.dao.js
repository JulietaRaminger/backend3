import PetModel from "./models/Pet.js";

export default class Pets {
  get = (params) => {
    return PetModel.find(params);
  };

  getBy = (params) => {
    return PetModel.findOne(params);
  };

  save = (doc) => {
    return PetModel.create(doc);
  };

  update = (id, doc) => {
    return PetModel.findByIdAndUpdate(id, { $set: doc }, { new: true });
  };

  delete = (id) => {
    return PetModel.findByIdAndDelete(id);
  };

  saveMany = (docs) => {
    return PetModel.insertMany(docs);
  };
}