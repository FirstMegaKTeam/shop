const { hash } = require('bcrypt');
const { User } = require('../../DB/models/index');

const changeSettings = async (req, res, next) => {
  const {
    id, name, lastName, age, email, password,
  } = req.body;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new Error('User dont exist');
    }
    //todo Add Object Asign
    user.name = name || user.name;
    user.lastName = lastName || user.lastName;
    user.age = age || user.age;
    user.email = email || user.email;

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
