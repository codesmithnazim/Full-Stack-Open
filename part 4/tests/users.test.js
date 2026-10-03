import { test, beforeEach, describe, after } from "node:test";
import supertest from "supertest";
import { app } from "../app.js";
import assert from "node:assert";

const api = supertest(app);

describe("tests made upon user for checking users registaration without corret credentials ", () => {
  test("Invalid email not allowed", async () => {
    const user = {
      name: "kaloMadharee",
      email: "khan9n8b@gmail.com",
      password: "1231fs",
    };
    const newUser = await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    // console.log(newUser);
    const {
      body: { error },
    } = newUser;
    // console.log("error ", error);
    assert.strictEqual(newUser.statusCode, 400);
    assert.strictEqual(error, "Email already registered");
  });

  test("password length short than six characters are not allowed", async () => {
    const user = {
      name: "khan wali",
      email: "khanwali@gmail.com",
      password: "12312",
    };

    const newUser = await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    const {
      body: { error },
    } = newUser;
    assert.strictEqual(error, "Password should at least 6 characters long");
  });
});
