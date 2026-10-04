import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5,
  },
  important: { type: Boolean, default: false },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// noteSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

// Object.defineProperty(noteSchema, 'toJSON', {  // the mongoose system will overwite our written toJSON with built in  toJSON
//   transform:(document, returnedDocument) => {
//     returnedDocument.id= returnedDocument._id.toString();
//     delete  returnedDocument._id;
//     delete returnedDocument.__v;
//   }
// })

noteSchema.set("toJSON", {
  transform: (originalDoc, returnedDoc) => {
    returnedDoc.id = returnedDoc._id.toString();
    delete returnedDoc._id;
    delete returnedDoc.__v;
  },
});


export const Note = mongoose.model("Note", noteSchema);
