import { Note } from "../models/note.model.js";
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


const notesInDP= async () => {
  const allNotes= await Note.find({})
  return allNotes.map(note => note.toJSON())
}

        
export default {notes, notesInDP}