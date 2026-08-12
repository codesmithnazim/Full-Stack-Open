import axios from "axios";

const baseUrl = "/api/persons";

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((res) => res.data);
};

const updateNumber = (id, newNumber) => {
  console.log("the id and phone number sended towards backend = ", id,newNumber)
  return axios.patch(`${baseUrl}/${id}`, {newNumber}).then((res) => res.data);
};

const addPerson = (person) => {
  return axios.post("/api/persons", person)
};

export default {
  deletePerson,
  updateNumber,
  addPerson,
};