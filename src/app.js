import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import router from "./routes/index.js";
import { errorHandle } from "./errors/errHandle.js";
import { logger } from "./utils/logger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Configura la opción strictQuery
mongoose.set('strictQuery', false);

const connection = mongoose.connect(
  process.env.MONGO_URI // Usando la variable de entorno
);

app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

// Middleware de manejo de errores
app.use(errorHandle);

app.listen(PORT, () => logger.info(`Listening on ${PORT}`));
