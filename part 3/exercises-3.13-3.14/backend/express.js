import express, { json } from "express";
import morgan from "morgan";
import "dotenv/config";
import path from "path";
import { PhoneBook } from "./models/phonebook.model.js";
const app = express();
const PORT = process.env.EXPRESS_PORT;
app.use(express.json());
app.use(express.text())
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

// let persons = [
//   {
//     name: "javeed ali",
//     number: "+92131",
//     id: "0",
//   },
//   {
//     name: "jawasd",
//     number: "321312",
//     id: "1",
//   },
//   {
//     name: "ali zaman",
//     number: "13231231",
//     id: "2",
//   },
//   {
//     name: "Wajid Ullah",
//     number: "+92 1231231",
//     id: "3",
//   },
//   {
//     name: "Faizan",
//     number: "=93231",
//     id: "4",
//   },
//   {
//     name: "Zaar Wali Khan",
//     number: "+92 1231231213",
//     id: "5",
//   },
//   {
//     name: "Farhad Khan",
//     number: "+92 3131231",
//     id: "6",
//   },
//   {
//     name: "Safwan Khan",
//     number: "+92131231",
//     id: "7",
//   },
//   {
//     name: "",
//     number: "",
//     id: "8",
//   },
//   {
//     name: "Kamran",
//     number: "+92 31231",
//     id: "9",
//   },
//   {
//     name: "jjklajdalksjda",
//     number: "fsdfsd",
//     id: "10",
//   },
//   {
//     name: "jisdjdklasj",
//     number: "uiweoufsd",
//     id: "12",
//   },
//   {
//     name: "j.ksdahkjdha",
//     number: "hjkfsdhfjsdfs",
//     id: "13",
//   },
//   {
//     name: "Javaid electrician",
//     number: "+9231321",
//     id: "14",
//   },
//   {
//     name: "jklj",
//     number: "ksajda",
//     id: "15",
//   },
//   {
//     name: "kjcxzjz",
//     number: "jklj",
//     id: "16",
//   },
//   {
//     name: "jkldkja",
//     number: "jdkassda",
//     id: "17",
//   },
// ];

app
  .get("/", (req, res) => {
    res.send(
      "Welcome to the full stack notes,I'm Express server how I can serve you. ",
    );
  })
  .get("/api/persons", (req, res) => {
    PhoneBook.find().then((mongoRes) => res.send(mongoRes));
  })
  .get("/api/persons/:id", (req, res) => {
    res.send(persons.find((person) => person._id == req.params._id));
  })
  .get("/info", (req, res) => {
    console.log(req.requestTime);
    res.send(
      `<div>PhoneBook has information for ${persons.length} people</div><div>${req.requestTime}</div>`,
    );
  })
  .delete("/api/persons/:id", (req, res) => {
    PhoneBook.findByIdAndDelete(req.params.id).then(mongoRes=>res.send(mongoRes))
    .catch(err=>console.trace(err))
    // res.send(persons);
  })
  .post("/api/persons", async (req, res) => {
    // console.log(req.body);
    // let newPerson = req.body;
    // if (Array.isArray(newPerson)) {
    //   res.send({ error: "arrow of users can not be added " });
    //   return;
    // }
    // if (!newPerson.name || !newPerson.number) {
    //   res.status(400).send({ error: "user name or number is missing" });
    //   return;
    // }
    // if (
    //   // It is not working becuaese when match occur when go to post through window.confirm()
    //   persons.find(
    //     (each) =>
    //       each.name == newPerson.name || each.number == newPerson.number,
    //   )
    // ) {
    //   console.log("The number or name is duplicated loc = 148");
    //   res.status(400).send({
    //     error: `User with ${newPerson.name} name or ${newPerson.number} number already exists`,
    //   });
    //   return;
    // }

    // let maxId = Math.max(...persons.map((person) => Number(person.id)));
    // newPerson.id = String(maxId + 1);
    // persons.push(newPerson);
    // res.send(persons);

    // let's use some more efficient technqiues
    let { name, phone } = req.body;
    // if (!name || !phone) { //Handled by the frontend successfully
    //   res.status(400).send({ message: "Name or Number is missing" });
    //   return;
    // }

    try {
      let savedNumber = await PhoneBook.create(req.body);
      res.send(savedNumber);
    } catch (error) {
      console.trace("error from the monogoDB while saving new note ", error);
      res.status(404).send({ message: error.keyValue });
    }
  });

//  Put or update API handler
app.patch("/api/persons/:id", (req, res) => {
  let {id}= req.params
  console.log("The new phonenumber we obtaind from the frontend and its person id ", req.body.newNumber, id);
  let newPhoneNumber = req.body.newNumber
  // persons.push(newPerson);
  PhoneBook.findByIdAndUpdate(id,{phone: newPhoneNumber} ,{returnDocument: 'after'}).then(mongoRes=>res.send(mongoRes))
  .catch(error=>{
    console.trace("error from the monogdb while updating the number", error)
    res.status(404).json({error})
  })
});

app.listen(PORT, () => {
  console.log("The server is listening to the localhost on port = ", PORT);
});

app.use((req, res) => {
  res.send({ error: "route not defined" });
});
