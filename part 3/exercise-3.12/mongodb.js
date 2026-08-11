import mongoose from "mongoose";
const url=`mongodb+srv://zaheenuddinkhanmasood2_db_user:${process.argv[2]}@full-stack-open.pxynlun.mongodb.net/phoneBook`

mongoose.connect(url, {family:4})
// const name= process.argv[3]
// const phone= process.argv[4]


const personsSchema=new mongoose.Schema({
    name: String,
    phone: String
})

const person= mongoose.model("person-exercise-3.12", personsSchema)

// person.create({
//     name, phone
// }).then(res=>{
//     console.log(`added ${res.name} number ${res.phone} to phonebook`)
//         // console.log(res),
// })

let newPerson= new person({
    name:"Muhammad ali",
    phone:"8908098908098"
})
console.log(newPerson)
newPerson.save()

person.find().then(res=>{console.log("phoneBook"), res.forEach(person=>{
    console.log(person.name, person.phone)
})
mongoose.connection.close()
})

