import axios from 'axios';

const baseUrl =
  process.env.APP_ENV === 'production'
    ? 'https://phonebook-fso20.herokuapp.com/api/persons'
    : 'http://localhost:3030/api/persons';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newPerson) => axios.post(baseUrl, newPerson);

const remove = (person) => axios.delete(`${baseUrl}/${person._id}`);

const update = (person) => axios.put(`${baseUrl}/${person._id}`, person);

export default {
  getAll,
  create,
  delete: remove,
  update,
};
