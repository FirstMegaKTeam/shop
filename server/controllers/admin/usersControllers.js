const { hash } = require('bcrypt');
const { User } = require('../../DB/models/index');

const getAllUsers = async (req, res, next) => {
  try {
    console.log('admin panel:',req.headers.Authorization);
    const allUsers = await User.findAll();
    res.json(allUsers);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const getOneUserByID = async (req, res, next) => {
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
};

const getOneUserByEmail = async (req, res, next) => {
  const { email } = req.params;

  try {
    const oneUserFindByEmail = await User.findOne({
      where: { email },
    });
    res.json(oneUserFindByEmail);
  } catch (e) {
    next(e);
  }
};

const editUserData = async (req, res, next) => {
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
    next(e);
  }
};
const deleteUser = async (req, res, next) => {
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
};

module.exports = {
  getAllUsers,
  getOneUserByID,
  getOneUserByEmail,
  editUserData,
  deleteUser,

};
