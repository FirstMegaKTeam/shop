const { hash } = require('bcrypt');
const { User } = require('../../DB/models/index');

const editUserAndAdminData = async (req, res, next) => {
  const {
    id, newUserInfoObj, password,
  } = req.body;
  try {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      throw new Error('User dont exist');
    }
    Object.assign(user, newUserInfoObj);

    if (password) {
      user.password = await hash(password, 10);
    }

    const responseDB = user.save();
    res.json(user);
  } catch (e) {
    next(e);
  }
};
const deleteUserAndAdmin = async (req, res, next) => {
  const { id } = req.body;

  try {
    const user = await User.findOne({
      where: { id },
    });

    if (!user) {
      throw new Error('User dont exist');
    }

    const deletedUser = await user.destroy();
    res.json(deletedUser);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  editUserAndAdminData,
  deleteUserAndAdmin
}