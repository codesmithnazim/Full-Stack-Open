import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
const app = express();
const PORT = process.env.EXPRESS_PORT;

app.use(express.json());
app.use(express.static(path.join(process.cwd(),"dist")));
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app
  .get("/api/notes", (req, res) => {
    res.send(notes);
  })
  .post("/api/notes", (req, res) => {
    console.log("req body", req.body);
    if (!req.body.content) {
      console.log("the content part of the note is empty");
      res.status(400).send({ error: "Every note should have content" });
      return;
    }
    let maxId = Math.max(...notes.map((each) => each.id));
    let newNote = req.body;
    newNote.id = maxId + 1;
    notes.push(newNote);
    res.send(newNote);
    console.log("the new Note = ", newNote);
  });

app.listen(PORT, () => {
  console.log("Express server is runing at port = ", PORT);
});
