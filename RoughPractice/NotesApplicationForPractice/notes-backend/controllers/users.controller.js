import mongoose from "mongoose";
import bcrypt from "bcrypt";
import express from "express";
import { User } from "../models/user.model.js";
import logger from "../utils/logger.js";
const usersRouter = express.Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    body.password = await bcrypt.hash(body.password, 10);
    body.notes=[body.notes]
    const createdUser = await User.create(body);
    logger.info(createdUser)
    res.status(201).send(createdUser);
  } catch (error) {
    next(error);
  }
});

export { usersRouter };
