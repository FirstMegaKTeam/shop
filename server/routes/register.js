const express = require('express');
const { hash } = require('bcrypt');
const { User } = require('../DB/models/index');

const registerRouter = express.Router();

registerRouter
  .post('/', async (req, res, next) => {
    const {
      name, lastName, age, email, password,
    } = req.body;

    try {
      const hashPassword = await hash(password, 10);

      const newUser = await User.create({
        name, lastName, age, email, password: hashPassword,
      });

      res.json(newUser);
    } catch (e) {
      console.log(e);
      res.json('Error :)');
    }
  });

module.exports = {
  registerRouter,
};
