import axios from "axios";

axios.get("http://localhost:3001/notes").then(res=> console.log(res.status,res.ok, res.data))