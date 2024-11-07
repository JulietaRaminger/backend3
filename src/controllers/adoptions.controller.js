import mongoose from "mongoose";
import { AdoptionModel } from "../dao/models/Adoption.js";
import Pet from "../dao/models/Pet.js";
import UserModel from "../dao/models/User.js";

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

      // Validar si el usuario existe
      const userExists = await UserModel.findById(userObjectId);
      if (!userExists) {
        return res
          .status(404)
          .json({ status: "error", message: "User not found" });
      }

      // Validar si la mascota existe
      const petExists = await Pet.findById(petObjectId);
      if (!petExists) {
        return res
          .status(404)
          .json({ status: "error", message: "Pet not found" });
      }

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

      // Recuperar la adopción creada con detalles completos
      const savedAdoption = await AdoptionModel.findById(newAdoption._id)
        .populate("user")
        .populate("pet");

      res.status(201).json({ status: "success", adoption: savedAdoption });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", error: error.message });
    }
  }

  async deleteAdoption(req, res) {
    try {
      const { aid } = req.params;
      const result = await AdoptionModel.findByIdAndDelete(aid);

      if (!result) {
        return res.status(404).json({ message: "Adopción no encontrada" });
      }

      res.status(200).json({ message: result });
    } catch (error) {
      res.status(500).json({
        message: "Error al eliminar la adopción",
        error: error.message,
      });
    }
  }
}