import mongoose from "mongoose";
import supertest from "supertest";
import { after, test } from "node:test";
import { app } from "../app.js";

const api = supertest(app);

test("the data type of response will be object ",async () => {
 await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

after(async () => {
   await mongoose.connection.close()
})