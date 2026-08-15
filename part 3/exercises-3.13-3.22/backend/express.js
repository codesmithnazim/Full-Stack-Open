import express from "express";
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

const errorHandler = (error, request, response, next) => {
  console.error(error.name, '-', error.message)

  if (error.name === 'CastError') { //Bad object id format
    return response.status(400).json({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') { // check the validity of object you are sending/schema validation failed(error)
    return response.status(400).json({ error: error.message })
  }
    if (error.name === 'MongoServerError' && error.code === 11000) {//Only for checking the duplicates keys, with respect to unique attributes of the schema.
    return response.status(400).json({ error: 'expected values to be unique' })
  }
   
  //  Frontend expect some response from this error catcher
  // if (error.name === 'MongoServerError' && error.code === 11000) { // modified version of the above
  //     console.log("error from the monogoDB while saving new note ",typeof error, error);
  //   return response.status(400).send({ message: error.keyValue });
  // }
  

  // return response.status(500).json({ error: 'something went wrong' })

  // if you want to handle the error to the next errorHandler middleware (custon or exprees built in middleware) then use next(error)

  return next(error)
}

app
  .get("/", (req, res) => {
    res.send(
      "Welcome to the full stack notes,I'm Express server how I can serve you. ",
    );
  })
  .get("/api/persons", (req, res,next) => {
    PhoneBook.find().then((mongoRes) => res.send(mongoRes)).catch(error=> next(error))
  })
  .get("/api/persons/:id", (req, res,next) => {
    // res.send(PhoneBook.findById ((person) => person._id == req.params._id));
    PhoneBook.findById(req.params.id).then(mongoRes=>res.status(200).send(mongoRes))
    // .catch((error)=>{console.log(error); res.status(400).json({error:error})})
    .catch(error=> next(error))
  })
  .get("/api/info", (req, res,next) => {
    // console.log(req.requestTime);
    PhoneBook.find().then(mongoRes=>{
     if (!mongoRes) return res.status(404).end() 
      res.status(200).send( `<div>PhoneBook has information for ${mongoRes.length} people</div><div>${req.requestTime}</div>`,)
    }).catch(error=> next(error))
  })
  .delete("/api/persons/:id", (req, res,next) => {
    PhoneBook.findByIdAndDelete(req.params.id).then(mongoRes=>res.send(mongoRes))
    .catch(error=> next(error))
    // res.send(persons);
  })
  .post("/api/persons", async (req, res,next) => {
    const { name, phone } = req.body;
    // if (!name || !phone) { //Handled by the frontend successfully
    //   res.status(400).send({ message: "Name or Number is missing" });
    //   return;
    // }

    try {
      const savedNumber = await PhoneBook.create(req.body);
      res.send(savedNumber);
    } catch (error) {
      // console.log("error from the monogoDB while saving new note ",typeof error, error);
      // res.status(400).send({ message: error.keyValue });
      next(error)
    }
  });

//  Put or update API handler
app.patch("/api/persons/:id", (req, res,next) => {
  const {id}= req.params
  console.log("The new phonenumber we obtaind from the frontend and its person id ", req.body.newNumber, id);
  const newPhoneNumber = req.body.newNumber
  PhoneBook.findByIdAndUpdate(id,{phone: newPhoneNumber} ,{returnDocument: 'after', runValidators:true, context:'query'}).then(mongoRes=>{
    if(!mongoRes){
       res.status(404).json({error:"document not found"})
       return;
    }
      res.status(200).send(mongoRes)
  })
  .catch(error=>{
    console.trace("error from the monogdb while updating the number", error)
    // res.status(404).json({error})
    next(error)
  })
});

app.listen(PORT, () => {
  console.log("The server is listening to the localhost on port = ", PORT);
});

app.use((req, res) => {
  res.send({ error: "route not defined" });
});

app.use(errorHandler)