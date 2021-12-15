const { Op } = require('sequelize');

const e = require('express');
const { Product } = require('../../DB/models/index');
const { addPossibilitiesEdit, saveSellProductInDB } = require('../../utils/dbUtils');

const order = async (req, res, next) => {
  const { basket } = req.cookies;
  try {
    if (!basket || !basket.length) {
      throw new Error('Your basket is empty');
    }
    const userOrderProductsId = basket.map((oneRecord) => ({ id: oneRecord.id }));
    const productsFromDB = await Product.findAll({
      where: {
        [Op.or]: userOrderProductsId,
      },
    });
    const productsToEdit = addPossibilitiesEdit(productsFromDB);

    const checkStateInMagazineAndSel = productsToEdit.map((oneProductFromDB) => {
      const productWithCount = {};
      basket.forEach((oneProductForBasket) => {
        if (oneProductFromDB.id === oneProductForBasket.id) {
          if (oneProductForBasket.count > oneProductFromDB.availability) {
            // oneProductForBasket.count = oneProductFromDB.availability;
            throw new Error(
              `We have only ${oneProductFromDB.availability}  ${oneProductFromDB.name}`,
            );
          } else {
            Object.assign(
              productWithCount,
              oneProductFromDB,
              { count: oneProductForBasket.count },
            );
            saveSellProductInDB(oneProductFromDB.id, oneProductForBasket.count);
          }
        }
      });
      return productWithCount;
    });

    res.json(checkStateInMagazineAndSel);
  } catch (er) {
    next(er);
  }
};

module.exports = {
  order,
};
