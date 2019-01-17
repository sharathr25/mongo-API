const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const config = require('../../config/mongoDbUrl');

function hash(data) {
  const saltRounds = 10;
  return bcrypt.hashSync(data, saltRounds);
}

let mongoDB;
async function getConnection() {
  let url = `${config.devUrl}`;
  if (process.env.NODE_ENV === 'production') {
    url = `${config.productionUrl}`;
  }
  const testUrl = `${config.url}${process.env.DATABASE}`;
  mongoDB = typeof process.env.DATABASE !== 'undefined' ? testUrl : url;
  mongoose.connect(mongoDB, { useNewUrlParser: true });
  mongoose.Promise = global.Promise;
}

async function addUsertoDb(userFormData) {
  getConnection();
  const hashPassword = hash(userFormData.password);
  const user = new User({
    _id: mongoose.Types.ObjectId(),
    username: `${userFormData.username}`,
    email: `${userFormData.email}`,
    password: `${hashPassword}`,
  });
  let data;
  try {
    data = await user.save();
  } catch (err) {
    console.log('some error occurred');
  }
  await mongoose.connection.close();
  return data;
}

async function findUserFromDb(user) {
  getConnection();
  let data;
  try {
    data = await User.find({ email: `${user.email}` });
  } catch (err) {
    console.log(err);
    console.log('some error occurred');
  }
  await mongoose.connection.close();
  return data;
}

module.exports = {
  addUser: addUsertoDb,
  findUser: findUserFromDb,
};
