import axios from "axios";

const baseUrl = "/api/persons";

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((res) => res.data);
};

const updateNumber = (id, person) => {
  return axios.put(`${baseUrl}/${id}`, person).then((res) => res.data);
};

const addPerson = (person) => {
  return axios.post("/api/persons", person);
};

export default {
  deletePerson,
  updateNumber,
  addPerson,
};
