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
