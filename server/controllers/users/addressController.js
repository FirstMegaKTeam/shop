const { Address } = require('../../DB/models/index');

const getAllUserAddress = async (req, res, next) => {
  const { userId } = req.params;

  try {

    const allUserAddress = await Address.findAll({
      where: { userId },
    });
    res.json(allUserAddress);
  } catch (e) {
    next(e);
  }
};

const addNewUserAddress = async (req, res, next) => {
  const {
    country, city, zipCode, street, homeNo, apartmentNo, userId,
  } = req.body;

  try {
    const newAddress = await Address.create({
      country, city, zipCode, street, homeNo, apartmentNo, userId,
    });
    res.json(newAddress);
  } catch (e) {
    next(e);
  }
};

const editUserAddress = async (req, res, next) => {
  const {
    userId, newData,
  } = req.body;

  try {
    const address = await Address.findOne({
      where: { userId },
    });
    if (!address) {
      throw new Error("Address don't exist");
    }

    Object.assign(address, newData);
    const responseDb = await address.save();
    res.json(address);
  } catch (e) {
    next(e);
  }
};

const deleteUserAddress = async (req, res, next) => {
  // this address id not users id
  const { id } = req.body;

  try {
    const address = await Address.findOne({
      where: { id },
    });
    if (!address) {
      throw new Error('Error ;)');
    }
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
