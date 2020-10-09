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

export default {
  getAll: getAll,
  create: create,
};
