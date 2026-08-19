import { Note } from "../models/note.model.js";
import beforeEach from "node:test"
// import logger from "../utils/logger.js";

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


        
export default {notes}