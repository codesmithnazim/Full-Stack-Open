import mongoose from "mongoose";
import supertest from "supertest";
import { after, describe, test, beforeEach } from "node:test";
import { app } from "../app.js";
import assert from "assert";
import { Note } from "../models/note.model.js";
import logger from "../utils/logger.js";
const api = supertest(app);

const notes = [
  {
    content: "good ",
    important: Math.random() > 0.5,
  },
  {
    content: "HTML is easy",
    important: Math.random() > 0.5,
  },
  {
    content: "testing through supertest",
    important: Math.random() > 0.5,
  },
];

beforeEach(async () => {
  // It'll run bedore each test
  await Note.deleteMany({});
  //   let newNote = new Note(notes[0]);
  //   await newNote.save();
  //   newNote = new Note(notes[1]);
  //   await newNote.save();
  //   newNote = new Note(notes[2]);
  //   await newNote.save();
  //   await notes.forEach(async (note) => {
  //     let newNote = new Note(note);
  //     await newNote.save();
  //   });

//   for (const element of notes) {
//     const newNote = new Note(element);
//     await newNote.save();
//   }

await Promise.all(notes.map(note => {const newNote=new Note(note); return newNote.save()})) // Most recommnded method, but you can use the for-of loop as well
});

describe("Tests made on the notes of the app", () => {
  test("the data type of response will be object", async () => {
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

  test.only("Checking the total number of notes present in the database ", async () => {
    // logger.info("❌❣❣❣❣❣❣🏆🏆✔✔✔",response?._body)
    const { _body } = await api.get("/api/notes");
    console.log("the response having all the notes = ", _body);
    assert.strictEqual(_body.length, notes.length);
  });
  
  test("Testing the existence of one note among all returned notes ", async () => {
    const { _body } = await api.get("/api/notes");
    const notes = _body.map((note) => note.content);
    //  assert.strictEqual(notes.includes('good '),true ,"our note is not present in the returned docs of DB ")
    assert(
      notes.includes("good "),
      "our note is not present in the returned docs of DB ",
    );
  });
});

after(async () => {
  await mongoose.connection.close();
});
