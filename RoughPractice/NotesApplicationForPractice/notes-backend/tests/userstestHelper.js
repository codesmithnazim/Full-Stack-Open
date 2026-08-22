import { User } from "../models/user.model.js";

const usersInDP = async () => {
  const allUsers = await User.find({});
  return allUsers;
};
const users=[
    {name:"AbdulBasit",password:"AbdulBasit",email:"AbdulBasit@gmail.com",notes:"6a871f013799ccd479e4e1e7"},
    {name:"IhtushamAli",password:"IhtushamAli",email:"IhtushamAli@gmail.com",notes:"6a871f013799ccd479e4e1e7"},
    {name:"KaleemUllah",password:"KaleemUllah",email:"KaleemUllah@gmail.com",notes:"6a871f013799ccd479e4e1e7"}
]
// console.log(users)

export default {usersInDP, users}