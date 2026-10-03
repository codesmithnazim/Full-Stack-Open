import express from "express";
import blogRouter from "./controllers/blog.controller.js";
import requestLogger from "./middlewares/requestLogger.js";
import errorHandler from "./middlewares/errorHandler.js";
import unknownEndpoints from "./middlewares/unknownEndpoint.js";
import mongoose from "mongoose";
import config from './utils/config.js'
import logger from "./utils/logger.js";
import usersRouter from "./route/users.route.js";

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(logger.info('MongoDB is connected ✔✔✔'))
  .catch((error) => logger.error("error while connecting to mongoDB", error));

const app = express();
app.use(express.json());
app.use(requestLogger)
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use(unknownEndpoints)
app.use(errorHandler)
export { app };