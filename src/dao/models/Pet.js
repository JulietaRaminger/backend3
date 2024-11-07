import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specie: {
    type: String,
    required: true,
  },
  birthDate: Date,
  adopted: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  image: String,
});

const Pet = mongoose.model("Pet", petSchema);

export default Pet;