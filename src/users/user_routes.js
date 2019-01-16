const express = require('express');
const user = require('./user_controller.js');

const route = express.Router();

route.post('/api/login', async (req, res) => {
  const data = req.body;
  const dbData = await user.findUser(data);
  if (dbData.length > 0) {
    res.status(200).json({ user: dbData[0], message: 'valid user' });
  } else {
    res.status(401).send({ user: '', message: 'invalid user' });
  }
});

route.post('/api/signup', async (req, res) => {
  const data = req.body;
  const dbData = await user.findUser(data);
  if (dbData.length === 0) {
    user.addUser(data);
    res.status(200).send({ message: 'user added sucessfully' });
  } else { res.status(200).send('user already in db'); }
});

module.exports = route;
