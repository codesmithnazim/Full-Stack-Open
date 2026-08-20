import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5,
  },
  important: Boolean,
});

// noteSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

// Object.defineProperty(noteSchema, 'toJSON', {
//   transform:(document, returnedDocument) => {
//     returnedDocument.id= returnedDocument._id.toString();
//     delete  returnedDocument._id;
//     delete returnedDocument.__v;
//   }
// })

noteSchema.set("toJSON",{
  transform:( originalDoc, returnedDoc) => {
    returnedDoc.id = returnedDoc._id.toString()
    delete returnedDoc._id
    delete returnedDoc.__v
  }
})

// noteSchema.toJSON = function () {
//   return ({
//     content: "wow",
//     important: true,
//     id: Math.random() * 435,
//   })
// };

export const Note = mongoose.model("mainpracticeapp'snotes", noteSchema);
