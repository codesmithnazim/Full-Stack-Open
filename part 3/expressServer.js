import acha from "express";
const app = acha();
const port = 3001;

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
  {
    id: "1",
    content:
      "Inhsha'Allah this time I will  not stop before become a full stack developer and ten I'll become software engnear",
    important: true,
  },
];

app
  .get("/notes", (req, res) => {
    // console.log(req)
    // I've written many ways to send the responce
    // res.status(200).json({data:notes}); //but express make it more easy like
    // res.json(notes)
    // res.status(200).send(JSON.stringify(notes))//same as res.json
    res.status(200).send(notes); //The most brilliant way to send data
  })
  .get("/", (req, res) => {
    res.send(
      "<h1>This server can server you only with notes \nFor getting notes go to <code>http://localhost:3001/notes</code></h1>",
    );
  })
  .get(`/api/notes/:id`, (req, res) => {
    let foundedNotes = notes.find((note) => note.id === req.params.id);
    if (foundedNotes) res.status(200).send(foundedNotes);
    else
      res.status(404).send()
  });

app.listen(port, () => {
  console.log("Express server is running on port = ", port);
});
