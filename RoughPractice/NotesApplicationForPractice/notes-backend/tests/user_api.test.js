import mongoose from "mongoose";
import { test, after, describe, beforeEach } from "node:test";
import supertest from "supertest";
import { app } from "../app.js";
import { User } from "../models/user.model.js";
import userstestHelper from "./userstestHelper.js";
import bcrypt from "bcrypt";
const api = supertest(app);

beforeEach(async () => { 
  try {
    await User.deleteMany({});
    const defaultUsers= userstestHelper.users
    for (const user of defaultUsers) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    await Promise.all(defaultUsers.map((user) => User.create(user)));
  } catch (error) {
    console.log("error in beforeEach() ", error);
  }
});

describe("CRUD operations on users", () => {
  test("Users creation", async () => {
    const userObj = {
      name: "johnDoe",
      password: "1232(&^^^%#$#@^38~!232fhgfhf./,.'l'8",
      email: "johnDoe78@gmail.com",
      notes: "6a871f013799ccd479e4e1e7",
    };

    const newUser = await api
      .post("/api/users")
      .send(userObj)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });
});

after(async () => {
  await mongoose.connection.close();
});
