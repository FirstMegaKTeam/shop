const express = require('express');
const { hash } = require('bcrypt');

const { User } = require('../DB/models/index');

const userSettingsRouter = express.Router();

userSettingsRouter
  .post('/', async (req, res, next) => {
    const {
      id, name, lastName, age, email, password,
    } = req.body;
    try {
      const user = await User.findOne({ where: { id } });
      if (!user) {
        throw new Error('User dont exist');
      }
      user.name = name || user.name;
      user.last_name = lastName || user.last_name; // TODO Change name column
      user.age = age || user.age;
      user.email = email || user.email;

      if (password) {
        const hashPassword = await hash(password, 10);
        user.password = hashPassword;
      }
      const responseDB = user.save();
      res.json(user);
    } catch (e) {
      console.log(e);
      res.json('Error ;)');
    }
  });

module.exports = {
  userSettingsRouter,
};
