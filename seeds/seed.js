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

const thoughtSeed = [
  {
    thoughtText: "Wow what a cool post!",
    username: "Tim"
  },
  {
    thoughtText: "Not very epic.",
    username: "Tim"
  },
  {
    thoughtText: "Looks like a lot of fun!",
    username: "Sally"
  },
  {
    thoughtText: "Hey werent you on that netflix show?",
    username: "Mick"
  },
];

db.User.deleteMany({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log('user records inserted!');
  })
  .catch(err => {
    console.error(err);
    console.log('error inserting user records.');
    process.exit(1);
  });

db.Thought.deleteMany({})
  .then(() => db.Thought.collection.insertMany(thoughtSeed))
  .then(data => {
    console.log('thought records inserted!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    console.log('error inserting thought records.');
    process.exit(1);
  });



