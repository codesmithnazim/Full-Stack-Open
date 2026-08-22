import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: [true, "Email address is required"],
    unique: [true, 'the email is already taken out'],
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: { type: String, required: true },
  notes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "mainpracticeapp'snotes",
  }],
});

userSchema.set("toJSON", {
  transform:  (originalDoc, returnedDoc) => {
    returnedDoc.id = returnedDoc._id.toString();
    (delete returnedDoc._id, delete returnedDoc.__v);
  },
});

const User = mongoose.model("User", userSchema);
export { User };
