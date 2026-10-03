import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: [true, "Email already registered"],
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },
  password: {
    type: String,
    required: true,
    // minlength: 6,
  },
  blogs: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Blog"
  }
});

userSchema.set("toJSON", {
  transform: (originalDoc, returnedDoc) => {
    ((returnedDoc.id = returnedDoc._id.toString()),
      delete returnedDoc._id,
      delete returnedDoc.__v,
      delete returnedDoc.password);
  },
});


const User= mongoose.model("User", userSchema)
export { User}