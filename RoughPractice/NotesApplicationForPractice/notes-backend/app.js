import express from "express";
import mongoose from "mongoose";
import {config} from "./utils/config.js";
import logger from "./utils/logger.js";
import {middleware} from "./utils/middleware.js";
import {notesRouter} from "./controllers/notes.controller.js";

const app = express();

logger.info("The mongoDB url =", config.MONGODB_URI, "and the PORT = ", config.PORT)

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

// app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/notes", notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export { app };
