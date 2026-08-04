import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then(res=>res.data);
};


const updateNumber=(id, person)=>{
    return axios.put(`${baseUrl}/${id}`, person).then(res=>res.data)
}


export default {
    deletePerson,
    updateNumber
}
