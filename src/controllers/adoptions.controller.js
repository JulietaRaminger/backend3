import mongoose from "mongoose";
import { AdoptionModel } from "../dao/models/Adoption.js";

export class AdoptionsController {
  async getAllAdoptions(req, res) {
    try {
      const adoptions = await AdoptionModel.find()
        .populate("user")
        .populate("pet");
      res.json({ status: "success", adoptions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", error: error.message });
    }
  }

  async getAdoption(req, res) {
    try {
      const { aid } = req.params;
      const adoption = await AdoptionModel.findById(aid)
        .populate("user")
        .populate("pet");

      if (!adoption) {
        return res
          .status(404)
          .json({ status: "error", message: "Adoption not found" });
      }

      res.json({ status: "success", adoption });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", error: error.message });
    }
  }

  async createAdoption(req, res) {
    try {
      const { uid, pid } = req.params;

      const userObjectId = mongoose.Types.ObjectId(uid);
      const petObjectId = mongoose.Types.ObjectId(pid);

      const existingAdoption = await AdoptionModel.findOne({
        user: userObjectId,
        pet: petObjectId,
      });

      if (existingAdoption) {
        return res
          .status(400)
          .json({ status: "error", message: "Adoption already exists" });
      }

      const newAdoption = new AdoptionModel({
        user: userObjectId,
        pet: petObjectId,
        adoptionDate: new Date(),
      });

      await newAdoption.save();

      res.status(201).json({ status: "success", adoption: newAdoption });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", error: error.message });
    }
  }
}