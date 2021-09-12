const mongoose = require('mongoose');
const db = require('../models');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const userSeed = [
  {
    username: "Tim",
    email: "test@email.com",
    thoughts: [],
    friends: []
  },
  {
    username: "Jim",
    email: "jimmy@email.com",
    thoughts: [],
    friends: []
  },
  {
    username: "Mick",
    email: "mickfx@email.com",
    thoughts: [],
    friends: []
  },
  {
    username: "Jon",
    email: "jonbo@email.com",
    thoughts: [],
    friends: []
  },
  {
    username: "Sally",
    email: "sal@email.com",
    thoughts: [],
    friends: []
  }
];

db.User.deleteMany({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + ' records inserted!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
