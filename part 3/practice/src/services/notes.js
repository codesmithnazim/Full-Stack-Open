import axios from 'axios'
const baseUrl = 'https://fullstackopen-e790a.containers.snapdeploy.app/api/notes'

const getAll = () => {
  const request = axios.get("/api/notes")
  return request.then((response) => response.data)
}

const create = (newObject) => {
  const request = axios.post("/api/notes", newObject)
  return request.then((response) => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`/api/notes/${id}`, newObject)
  return request.then((response) => response.data)
}

export default {
  getAll,
  create,
  update,
}
