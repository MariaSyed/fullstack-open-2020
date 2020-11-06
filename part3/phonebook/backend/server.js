require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  number: { type: String, required: true, unique: false, minlength: 8 },
});

personSchema.plugin(uniqueValidator);

const Person = mongoose.model('Person', personSchema);

const errorHandler = (error, _, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ message: 'malformatted id' });
  }

  if (error.name === 'ValidationError') {
    const nameError = error.errors?.name;
    const numberError = error.errors?.number;

    if (nameError?.kind === 'unique') {
      return response.status(409).json({ message: error.message });
    }

    if (nameError?.kind === 'minlength' || numberError?.kind === 'minlength') {
      return response.status(422).json({ message: error.message });
    }
  }

  response.status(500).json({ message: error.message });

  next(error);
};

const app = express();
app.use(express.json());
app.use(express.static('build'));

morgan.token('req-body', (req) => JSON.stringify(req.body));
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :req-body'
  )
);

app.use(cors());

app.get('/info', async (_, res) => {
  const personsLength = await Person.countDocuments();

  res.send(
    `<p>Phonebook has info for ${personsLength} people</p><p>${new Date()}</p>`
  );
});

app.get('/api/persons', (_, res) => {
  Person.find({}).then((person) => res.json(person));
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const person = {
    name: req.body.name,
    number: req.body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ message: 'name and/or number missing' });
  }

  const person = new Person({ name, number });

  person
    .save()
    .then((savedPerson) => {
      res.status(201).json(savedPerson);
    })
    .catch((error) => next(error));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
