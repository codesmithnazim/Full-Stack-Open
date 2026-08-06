import express from "express";
const app = express();
const PORT = 3001;

app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date();
  next();
});

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app
  .get("/api/persons", (req, res) => {
    res.send(persons);
  })
  .get("/api/persons/:id", (req, res) => {
    res.send(persons.find((person) => person.id == req.params.id));
  })
  .get("/info", (req, res) => {
    console.log(req.requestTime);
    res.send(
      `<div>PhoneBook has information for ${persons.length} people</div><div>${req.requestTime}</div>`,
    );
  })
  .delete("/api/persons/:id", (req, res) => {
    persons = persons.filter((each) => each.id != req.params.id);
    res.send(persons);
  })
  .post("/api/persons", (req, res) => {
    // console.log(req.body);
    if (Array.isArray(req.body)) {
      res.send({ error: "arrow of users can not be added " });
      return;
    }
    persons.push(req.body);
    res.send(persons)
  });
app.listen(PORT, () => {
  console.log("The server is listening to the localhost on port = ", PORT);
});
