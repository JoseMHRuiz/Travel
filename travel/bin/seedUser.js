// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const faker = require("faker");
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);



const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/travel', {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [{
    username: "Arturo",
    password: bcrypt.hashSync("123", bcrypt.genSaltSync(bcryptSalt)),
    email: 'arturo@gmail.com',
    cityOrigin: faker.address.city()
  },
  {
    username: "Jose",
    password: bcrypt.hashSync("123", bcrypt.genSaltSync(bcryptSalt)),
    email: 'jose@gmail.com',
    cityOrigin: faker.address.city()
  }
]

User.deleteMany()
  .then(() => {
    return User.create(users)
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })