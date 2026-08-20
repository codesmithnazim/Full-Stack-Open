// const notesRouter = require('express').Router()
import express from "express";
// const app= express()
// import notesRouter from app.router();

const notesRouter = express.Router();

import { Note } from "../models/note.model.js";
import logger from "../utils/logger.js";

notesRouter.get("/", async (request, response, next) => {
  try {
    const notes = await Note.find({});
    response.status(200).send(notes);
  } catch (error) {
    next(error); 
  }
});

notesRouter.get("/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.status(200).send(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

notesRouter.post("/", (request, response, next) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => {
      response.status(201).send(savedNote);
    })
    .catch((error) => next(error));
});

notesRouter.delete("/deleteone", async () => {
  const allNotes = await Note.find({});
  const deleteNote = await allNotes[0].deleteOne();
  logger.info("The deleted note ", deleteNote);
});

notesRouter.delete("/:id", (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

notesRouter.put("/:id", (request, response, next) => {
  const { content, important } = request.body;

  Note.findById(request.params.id)
    .then((note) => {
      if (!note) {
        return response.status(404).end();
      }

      note.content = content;
      note.important = important;

      return note.save().then((updatedNote) => {
        response.status(200).send(updatedNote);
      });
    })
    .catch((error) => next(error));
});

export { notesRouter };
