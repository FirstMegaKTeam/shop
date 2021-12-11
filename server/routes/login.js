const express = require('express');
const jwt = require('jsonwebtoken');

const loginRouter = express.Router();

loginRouter.post('/', (req, res, next) => {
  const { user } = req;
  console.log(user.id);
  try {
    // generate token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );
    // set cookie
    res.cookie('jwt', token);

    res.json('cookie is set');
  } catch (e) {
    console.log(e);
  }
});

module.exports = {
  loginRouter,
};
