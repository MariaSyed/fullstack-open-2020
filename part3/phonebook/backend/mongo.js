const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password, name and number as arguments: node mongo.js <password> <name> <number>'
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://mariasyed:${password}@cluster0.dfdcr.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (!name && !number) {
  Person.find({})
    .then((persons) => {
      console.log('phonebook');
      persons.forEach((p) => console.log(`${p.name} ${p.number}`));
    })
    .catch((error) => console.log(error))
    .finally(() => {
      mongoose.connection.close();
      process.exit(1);
    });
}

const person = new Person({
  name,
  number,
});

person.save().then((result) => {
  console.log(`added ${result.name} number ${result.number} to phonebook`);
  mongoose.connection.close();
});
