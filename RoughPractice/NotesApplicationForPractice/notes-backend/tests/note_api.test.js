import mongoose from "mongoose";
import supertest from "supertest";
import { after, describe, test, beforeEach } from "node:test";
import { app } from "../app.js";
import assert from "assert";
import { Note } from "../models/note.model.js";
const api = supertest(app);
import testHelper from "./testHelper.js";

beforeEach(async () => {
  // It'll run bedore each test
  await Note.deleteMany({});

  //   for (const element of notes) {
  //     const newNote = new Note(element);
  //     await newNote.save();
  //   }

  await Promise.all(
    testHelper.notes.map((note) => {
      const newNote = new Note(note);
      return newNote.save();
    }),
  ); // Most recommnded method, but you can use the for-of loop as well
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

  test.only("Checking the total number of notes present in the database", async () => {
    const { _body } = await api.get("/api/notes");
    console.log("the response having all the notes = ", _body);
    assert.strictEqual(_body.length, testHelper.notes.length);
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

  test("Can we add a valid note?", async () => {
    const newNote = {
      content: "I'm a note created during testing",
      imporatn: Math.random() > 0.5,
    };
    await api
      .post("/api/notes")
      .send(newNote)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const { _body } = await api.get("/api/notes");
    assert.strictEqual(_body.length, testHelper.notes.length + 1);
    assert.strictEqual(
      _body
        .map((each) => each.content)
        .includes("I'm a note created during testing "),
      false,
    );
  });

  test("test for checking that note without content will not be stored", async ()=> {
    const newNote = {
      important: true,
    };
    await api.post("/api/notes").send(newNote).expect(400);
    const { _body } = await api.get("/api/notes");
    assert.strictEqual(_body.length, testHelper.notes.length);
  });

  test("A specific note can be viewed", async () => {
    const allNotes = await testHelper.notesInDP();
    const notetoView = allNotes[2];
    console.log("the expected note ",notetoView)
    // console.log(notetoView._id.toString());
    const specificNote = await api
      .get(`/api/notes/${notetoView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    console.log("the actual note ",specificNote._body === specificNote.body);
    console.log("Is sane reference ", specificNote.body === notetoView, Object.is(specificNote.body, notetoView))
    assert.deepStrictEqual(specificNote.body, notetoView)
  });
});

after(async () => {
  await mongoose.connection.close();
});
