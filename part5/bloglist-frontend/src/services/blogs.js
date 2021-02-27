import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
  token = newToken
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog)
  return response.data
}

const update = async (id, blog) => {
  const response = await axios.patch(`${baseUrl}/${id}`, blog)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

export default { setToken, getAll, create, update, remove }
