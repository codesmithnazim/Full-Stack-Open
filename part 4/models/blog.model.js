import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true, trim: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  url: { type: String, required: true, unique: true },
  likes: { type: Number, default: 0 },
});

// blogSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

blogSchema.set("toJSON", {
  transform: (originalDoc, returnedDoc) => {
    returnedDoc.id = returnedDoc._id.toString();
    (delete returnedDoc._id, delete returnedDoc.__v);
  },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
