import express, { json } from "express";
import morgan from "morgan";
import "dotenv/config";
import path from "path";
const app = express();
const PORT = process.env.EXPRESS_PORT;
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "dist")));
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
    name: "javeed ali",
    number: "+92131",
    id: "JBxyJrptEGY",
  },
  {
    name: "jawasd",
    number: "321312",
    id: "mW-npMvYS1g",
  },
  {
    name: "ali zaman",
    number: "13231231",
    id: "Ha04NDq2064",
  },
  {
    name: "Wajid Ullah",
    number: "+92 1231231",
    id: "Ml3P6sxhPX4",
  },
  {
    name: "Faizan",
    number: "=93231",
    id: "OiEKgId0L74",
  },
  {
    name: "Zaar Wali Khan",
    number: "+92 1231231213",
    id: "-BsYlRSUMDA",
  },
  {
    name: "Farhad Khan",
    number: "+92 3131231",
    id: "AviFGvCCDHQ",
  },
  {
    name: "Safwan Khan",
    number: "+92131231",
    id: "-BkO1At-Ygw",
  },
  {
    name: "",
    number: "",
    id: "6k6D-7Jw0VA",
  },
  {
    name: "Kamran",
    number: "+92 31231",
    id: "gIuuKvp6_m8",
  },
  {
    name: "jjklajdalksjda",
    number: "fsdfsd",
    id: "nHDsoG1Ul24",
  },
  {
    name: "jisdjdklasj",
    number: "uiweoufsd",
    id: "nC9Egietd_U",
  },
  {
    name: "j.ksdahkjdha",
    number: "hjkfsdhfjsdfs",
    id: "aEIQepERFbM",
  },
  {
    name: "Javaid electrician",
    number: "+9231321",
    id: "3bQ6nHDAt1w",
  },
  {
    name: "jklj",
    number: "ksajda",
    id: "LGjMTtrknZQ",
  },
  {
    name: "kjcxzjz",
    number: "jklj",
    id: "mXNY-dfAjnk",
  },
  {
    name: "jkldkja",
    number: "jdkassda",
    id: "rf7wQOr4jOU",
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
