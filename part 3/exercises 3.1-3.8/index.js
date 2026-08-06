import express, { json } from "express";
import morgan from "morgan";
const app = express();
const PORT = 3001;
app.use(express.json());
morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    " :method :url :status :response-time ms - :res[content-length] - Body : :body",
  ),
);
app.use((req, res, next) => {
  console.log(`Req type = ${req.method} , body = `, req.body);
  next();
});
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
    let newPerson = req.body;
    if (Array.isArray(newPerson)) {
      res.send({ error: "arrow of users can not be added " });
      return;
    }
    if (!newPerson.name || !newPerson.number) {
      res.status(400).send({ error: "user name or number is missing" });
      return;
    }
    if (
      persons.find(
        (each) =>
          each.name == newPerson.name || each.number == newPerson.number,
      )
    ) {
      res.status(400).send({
        error: `User with ${newPerson.name} name or ${newPerson.number} number already exists`,
      });
      return;
    }

    let maxId = Math.max(...persons.map((person) => Number(person.id)));
    newPerson.id = String(maxId + 1);
    persons.push(newPerson);
    res.send(persons);
  });
app.listen(PORT, () => {
  console.log("The server is listening to the localhost on port = ", PORT);
});

app.use((req, res) => {
  res.send({ error: "route not defined" });
});
