const { Address } = require('../../DB/models/index');
const { NotLoginError, NotFoundError, WrongDataError } = require('../../utils/errors');

const getAllUserAddress = async (req, res, next) => {
  const { user } = req;

  try {
    if (!user) throw new NotLoginError('You are not login');

    const allUserAddress = await Address.findAll({
      where: { userId: user.id },
    });
    if (!allUserAddress || !allUserAddress.length) throw new NotFoundError('Dont found any address');

    res.json(allUserAddress);
  } catch (e) {
    next(e);
  }
};

const addNewUserAddress = async (req, res, next) => {
  const { user } = req;
  const {
    country, city, zipCode, street, homeNo, apartmentNo,
  } = req.body;

  try {
    if (!user) throw new NotLoginError('You are not login');
    if (!country
        || !city
        || !zipCode
        || !street
        || !homeNo) throw new WrongDataError('You dont send all information');

    const newAddress = await Address.create({
      country,
      city,
      zipCode,
      street,
      homeNo,
      apartmentNo,
      userId: user.id,
    });

    res.json(newAddress);
  } catch (e) {
    next(e);
  }
};

const editUserAddress = async (req, res, next) => {
  const { user } = req;
  const { newData } = req.body;

  try {
    if (!user) throw new NotLoginError('You are not login');
    if (!newData) throw new WrongDataError('You dont send any information');

    const address = await Address.findOne({
      where: { userId: user.id },
    });

    if (!address) throw new NotFoundError('Address dont exist');

    Object.assign(address, newData);
    await address.save();
    res.json(address);
  } catch (e) {
    next(e);
  }
};

const deleteUserAddress = async (req, res, next) => {
  // this address id not users id
  const { id } = req.body;
  const { user } = req;

  try {
    if (!user) throw new NotLoginError('You are not login');

    const address = await Address.findOne({
      where: { id },
    });

    if (!address) throw new NotFoundError('Address dont exist');

    const deleteAddress = await address.destroy();

    res.json(deleteAddress);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllUserAddress,
  addNewUserAddress,
  editUserAddress,
  deleteUserAddress,
};
