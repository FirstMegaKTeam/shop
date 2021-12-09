const express = require('express');

const { Address } = require('../DB/models/index');

const addressRouter = express.Router();

addressRouter.get('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;

    console.log(userId);
    const allUserAdress = await Address.findAll({
      where: { userId },
    });
    res.json(allUserAdress);
  } catch (e) {
    console.log(e);
    res.json('Error :)');
  }
})
  .post('/', async (req, res, next) => {
    const {
      country, city, zipCode, street, homeNo, apartmentNo, userId,
    } = req.body;

    try {
      const newAddres = await Address.create({
        country, city, zipCode, street, homeNo, apartmentNo, userId,
      });
      res.json(newAddres);
    } catch (e) {
      console.log(e);
      res.json('Error ;)');
    }
  })
  .patch('/', async (req, res, next) => {
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
      console.log(e);
      res.json('Error ;)');
    }
  })
  .delete('/', async (req, res, next) => {
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
      console.log(e);
      res.json('Error ;)');
    }
  });

module.exports = {
  addressRouter,
};
