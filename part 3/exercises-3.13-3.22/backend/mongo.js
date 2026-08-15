import mongoose from "mongoose";
import "dotenv/config";

if (process.argv < 3) {
  console.log("Give process as argument ");
  process.exit(1);
}
const password = process.argv[2];
console.log("Your password = ", password);
const url = process.env.MONGODB_URI;
console.log("The mongoDB url will be like this = ", url);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Notes = mongoose.model("Note", noteSchema);

// const newNote= new Notes({
//     content:"Insha'Alla I'll not stop, untill I get my first job, Insha'Allah ",
//     important: Math.random()<0.5
// })

// newNote.save().then(res=>{
//     console.log("The responce we get from saving the note to mongodb = ", res)
//     mongoose.connection.close()
// })

// let response =await Notes.insertOne({  // Second way of doing the same mstuff
//   content: "Insha'Alla I'll not stop, untill I get my first job, Insha'Allah ",
//   important: Math.random < 0.5,
// });

// Notes.create({
//   content:
//     "We will make wonderfull websites with good performances , Insha'Allah soon ",
//   important:1
// }).then((res) => {
//   console.log("the mongodb response after try to insert the document = ", res);
//   mongoose.connection.close();
// });

// Notes.find({}).where({content:"13242342"}).then(res=>{console.log(res); mongoose.connection.close()})
Notes.find().then(res=>{res.forEach(note=>
    console.log(note)
); 
console.log("total number of stored notes = ", res.length)
mongoose.connection.close() })
