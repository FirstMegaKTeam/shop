const { hash } = require('bcrypt');
const { User } = require('../../DB/models/index');

const registerUser = async (req, res, next) => {
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
    next(e);
  }
};

module.exports = {
  registerUser,
};
