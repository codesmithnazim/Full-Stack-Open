import bcrypt from "bcrypt";
import express from "express";
import { User } from "../models/user.model.js";
import logger from "../utils/logger.js";
const usersRouter = express.Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    body.password = await bcrypt.hash(body.password, 10);
    body.notes = [body.notes];
    const createdUser = await User.create(body);
    logger.info(createdUser);
    res.status(201).send(createdUser);
  } catch (error) {
    next(error);
  }
});

export { usersRouter };
