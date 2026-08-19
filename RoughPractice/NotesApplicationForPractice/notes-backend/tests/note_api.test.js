import mongoose from "mongoose";
import supertest from "supertest";
import { after, describe, test } from "node:test";
import { app } from "../app.js";
import assert from "assert";
import logger from "../utils/logger.js";
const api = supertest(app);

describe("Tests made on the notes of the app", () => {
  test("the data type of response will be object ", async () => {
    await api
      .get("/api/notes")
      .expect(200)
      //  .expect("Content-Type", 'application/json; charset=utf-8'); // but this is not recommended
      .expect("Content-Type", /application\/json/);
  });

  test("testing un-known endpoints", async () => {
    await api
      .get("/api/note")
      .expect(404)
      .expect("Content-Type", /application\/json/);
  });

  test("Checking the total number of notes present in the database ", async () => {
    // logger.info("❌❣❣❣❣❣❣🏆🏆✔✔✔",response?._body)
    assert.strictEqual(
      await api.get("/api/notes").then((res) => res._body.length), 3, );
  });
});

test('Testing the existence of one note among all returned notes ',async () => {
   const {_body}=  await api.get('/api/notes')
   const isPresent= _body.map(note => note.content).includes('good')
    assert.strictEqual(isPresent,true ,"our note is not present in the returned docs of DB ")
})

after(async () => {
  await mongoose.connection.close();
});
