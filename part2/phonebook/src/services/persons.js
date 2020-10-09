import axios from 'axios';
const baseUrl = 'http://localhost:3003/persons';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newPerson) => {
  const response = await axios.post(baseUrl, newPerson);
  return response.data;
};

const remove = async (person) => {
  const response = await axios.delete(`${baseUrl}/${person.id}`);
  return response.data;
};

const update = async (person) => {
  const response = await axios.put(`${baseUrl}/${person.id}`, person);
  return response.data;
};

export default {
  getAll,
  create,
  delete: remove,
  update,
};
