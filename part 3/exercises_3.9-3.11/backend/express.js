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
    id: "0",
  },
  {
    name: "jawasd",
    number: "321312",
    id: "1",
  },
  {
    name: "ali zaman",
    number: "13231231",
    id: "2",
  },
  {
    name: "Wajid Ullah",
    number: "+92 1231231",
    id: "3",
  },
  {
    name: "Faizan",
    number: "=93231",
    id: "4",
  },
  {
    name: "Zaar Wali Khan",
    number: "+92 1231231213",
    id: "5",
  },
  {
    name: "Farhad Khan",
    number: "+92 3131231",
    id: "6",
  },
  {
    name: "Safwan Khan",
    number: "+92131231",
    id: "7",
  },
  {
    name: "",
    number: "",
    id: "8",
  },
  {
    name: "Kamran",
    number: "+92 31231",
    id: "9",
  },
  {
    name: "jjklajdalksjda",
    number: "fsdfsd",
    id: "10",
  },
  {
    name: "jisdjdklasj",
    number: "uiweoufsd",
    id: "12",
  },
  {
    name: "j.ksdahkjdha",
    number: "hjkfsdhfjsdfs",
    id: "13",
  },
  {
    name: "Javaid electrician",
    number: "+9231321",
    id: "14",
  },
  {
    name: "jklj",
    number: "ksajda",
    id: "15",
  },
  {
    name: "kjcxzjz",
    number: "jklj",
    id: "16",
  },
  {
    name: "jkldkja",
    number: "jdkassda",
    id: "17",
  },
];

app
  .get("/", (req, res) => {
    res.send("Welcome to the full stack notes,I'm Express server how I can serve you. ")
  })
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
      // It is not working becuaese when match occur when go to post through window.confirm()
      persons.find(
        (each) =>
          each.name == newPerson.name || each.number == newPerson.number,
      )
    ) {
      console.log("The number or name is duplicated loc = 148");
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

//  Put or update API handler
app.put("/api/persons/:id", (req, res) => {
  console.log("The new object we obtaind from the frontend = ", req.body);
  let newPerson = req.body;
  let maxId = Math.max(...persons.map((person) => Number(person.id)));
  newPerson.id = String(maxId + 1);
  persons = persons.filter((each) => each.id !== req.params.id);
  persons.push(newPerson);
  res.send({ message: "User info is updated " });
});

app.listen(PORT, () => {
  console.log("The server is listening to the localhost on port = ", PORT);
});

app.use((req, res) => {
  res.send({ error: "route not defined" });
});
