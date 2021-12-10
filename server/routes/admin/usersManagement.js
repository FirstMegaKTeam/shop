const express = require('express');
const { hash } = require('bcrypt');

const { User } = require('../../DB/models/index');

const usersManagementRouter = express.Router();

usersManagementRouter
  .get('/', async (req, res, next) => {
    try {
      const allUsers = await User.findAll();
      res.json(allUsers);
    } catch (e) {
      console.log(e);
      res.json('Error sorry ;)');
    }
  })

  .get('/id/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
      const oneUserFindById = await User.findOne({
        where: { id },
      });

      if (!oneUserFindById) throw new Error();

      res.json(oneUserFindById);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })

  .get('/email/:email', async (req, res, next) => {
    const { email } = req.params;

    try {
      const oneUserFindByEmail = await User.findOne({
        where: { email },
      });
      res.json(oneUserFindByEmail);
    } catch (e) {
      console.log(e);
      res.json('Error :)');
    }
  })

  .patch('/', async (req, res, next) => {
    const {
      id, newUserInfoObj, password,
    } = req.body;
    try {
      const user = await User.findOne({ where: { id } });
      console.log(user);

      if (!user) {
        throw new Error('User dont exist');
      }
      Object.assign(user, newUserInfoObj);

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
  })
  .delete('/', async (req, res, next) => {
    const { id } = req.body;

    try {
      const user = await User.findOne({
        where: { id },
      });
      const deletedUser = await user.destroy();
      res.json(deletedUser);
    } catch (e) {
      console.log(e);
      res.json('Error ;)');
    }
  });

module.exports = {
  usersManagementRouter,
};
