const { hash } = require('bcrypt');
const { User } = require('../../DB/models/index');
const { NotLoginError, WrongDataError } = require('../../utils/errors');

const getUserData = async (req, res, next) => {
  const { user } = req;
  try {
    if (!user) throw new NotLoginError('You are not logged in');
    res.json(user);
  } catch (e) {
    next(e);
  }
};

const changeSettings = async (req, res, next) => {
  const {
    name, lastName, age, email, password,
  } = req.body;
  const { user } = req;
  try {
    if (!user) throw new NotLoginError('You are not logged in');
    if (!name || !lastName || !age || !email || !password) throw new WrongDataError('You dont give any data');

    // user can edit only this field
    user.name = name || user.name;
    user.lastName = lastName || user.lastName;
    user.age = age || user.age;
    user.email = email || user.email;
    // new public key
    user.publicKey = await hash((user.name.concat(user.lastName, user.age, user.email)), 10);

    if (password) {
      const hashPassword = await hash(password, 10);
      user.password = hashPassword;
    }
    const responseDB = user.save();
    res.json(user);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  changeSettings,
};
