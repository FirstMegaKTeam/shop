const { hash } = require('bcrypt');
const { User } = require('../../DB/models/index');
const {
  NotFoundError, WrongDataError, NotHeadAdminError, NotAdminError,
} = require('../../utils/errors');

const getAllUsers = async (req, res, next) => {
  const { user: admin } = req;

  try {
    if (!admin || admin.role < 1) throw new NotAdminError('You re not admin');

    const allUsers = await User.findAll();

    if (!allUsers || !allUsers.length) throw new NotFoundError('Dont find any users');

    res.json(allUsers);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const getOneUserByID = async (req, res, next) => {
  const { id } = req.params;
  const { user: admin } = req;

  try {
    if (!admin || admin.role < 1) throw new NotAdminError('You re not admin');
    if (!id) throw new WrongDataError('You must give id.');

    const oneUserFindById = await User.findOne({
      where: { id },
    });

    if (!oneUserFindById) throw new NotFoundError('User dont exist');

    res.json(oneUserFindById);
  } catch (e) {
    next(e);
  }
};

const getOneUserByEmail = async (req, res, next) => {
  const { email } = req.params;
  const { user: admin } = req;

  try {
    if (!admin || admin.role < 1) throw new NotAdminError('You re not admin');
    if (!email) throw new WrongDataError('You must give email');

    const oneUserFindByEmail = await User.findOne({
      where: { email },
    });

    if (!oneUserFindByEmail) throw new NotFoundError('User dont exist');

    res.json(oneUserFindByEmail);
  } catch (e) {
    next(e);
  }
};

const editUserData = async (req, res, next) => {
  const {
    id,
    newUserInfoObj,
    password,
  } = req.body;
  const { user: admin } = req;
  try {
    if (!admin || admin.role < 1) throw new NotAdminError('You re not admin');
    if (!id || !newUserInfoObj) throw new WrongDataError('You must give id and new User info');

    const user = await User.findOne({ where: { id } });

    if (!user) throw new NotFoundError('User dont exist');
    if (user.role >= 1 && admin.role !== 2) throw new NotHeadAdminError('You not head admin');
    if (newUserInfoObj.role < 0 && admin.role !== 2) throw new NotHeadAdminError('You are not head admin');

    Object.assign(user, newUserInfoObj);

    if (password) user.password = await hash(password, 10);

    user.publicKey = await hash((user.name.concat(user.lastName, user.age, user.email)), 10);

    const responseDB = user.save();
    res.json(user);
  } catch (e) {
    next(e);
  }
};
const deleteUser = async (req, res, next) => {
  const { id } = req.body;
  const { user: admin } = req;

  try {
    if (!admin || admin.role < 1) throw new NotAdminError('You re not admin');
    if (!id) throw new WrongDataError('You must give id');

    const user = await User.findOne({
      where: { id },
    });

    if (!user) throw new NotFoundError('User dont exist');
    if (user.role >= 1 && admin.role !== 2) throw new NotHeadAdminError('You not head admin');

    const deletedUser = await user.destroy();
    res.json(deletedUser);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllUsers,
  getOneUserByID,
  getOneUserByEmail,
  editUserData,
  deleteUser,

};
