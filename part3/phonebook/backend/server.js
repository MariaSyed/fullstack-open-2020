const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json());

morgan.token('req-body', (req) => JSON.stringify(req.body));
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :req-body'
  )
);

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
];

app.get('/info', (_, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
  );
});

app.get('/api/persons', (_, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find((p) => `${p.id}` === req.params.id);
  if (!person) res.status(404).send('Error 404: Person not found');
  res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
  persons = persons.filter((p) => `${p.id}` !== req.params.id);
  res.status(200).send('Removed!');
});

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;

  if (!name || !number)
    return res.status(400).json({ error: 'name and number required' });

  const existingPerson = persons.find((p) => p.name === name);

  if (existingPerson)
    return res.status(403).json({ error: 'name must be unique' });

  persons.push({ name, number, id: Math.ceil(Math.random() * 100) });

  res.status(201).send(`Created person ${name} with number ${number}`);
});

const PORT = 3030;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
