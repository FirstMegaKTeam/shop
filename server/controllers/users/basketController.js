const { Op } = require('sequelize');
const { Product } = require('../../DB/models/index');

const { addPossibilitiesEdit } = require('../../utils/dbUtils');

const getUserBasket = async (req, res, next) => {
  const { basket } = req.cookies;
  try {
    if (!basket || !basket.length) {
      throw new Error('Your basket is empty');
    }

    const onlyBasketId = basket.map((oneRecord) => ({ id: oneRecord.id }));

    const products = await Product.findAll({
      where: {
        [Op.or]: onlyBasketId,
      },
    });

    const productsToEdit = addPossibilitiesEdit(products);
    const productsWitchCount = productsToEdit.map((oneProductFromDb) => {
      const oneProductWitchCount = {};
      basket.forEach((oneProductFromBasket) => {
        if (oneProductFromBasket.id === oneProductFromDb.id) {
          Object.assign(
            oneProductWitchCount,
            oneProductFromDb,
            { count: oneProductFromBasket.count },
          );
        }
      });
      return oneProductWitchCount;
    });

    res.json(productsWitchCount);
  } catch (e) {
    next(e);
  }
};

const addProductToBasket = async (req, res, next) => {
  const basket = (req.cookies.basket) ? req.cookies.basket : [];

  const { productId, count } = req.body;

  try {
    if (!productId) {
      throw new Error('id product cant by empty');
    }
    const checkId = await Product.findOne({
      where: { id: productId },
    });
    if (!checkId) {
      throw new Error('This porduct dont exist');
    }
    if (checkId.availability < count || checkId.availability <= 0) {
      throw new Error(`Sorry we have now ${checkId.availability} in magazines`);
    }

    const index = basket.findIndex((oneEl) => oneEl.id === productId);
    if (index >= 0) {
      basket[index].count += count;
    } else {
      basket.push({ id: productId, count: count ?? 1 });
    }

    res.cookie('basket', basket);
    res.json('Add to basket');
  } catch (e) {
    next(e);
  }
};

const deleteProductFromBasket = async (req, res, next) => {
  const { basket } = req.cookies;
  const { productId, count } = req.body;
  try {
    if (!basket || !productId) {
      throw new Error('Problem with product id or your basket is empty');
    }
    const indexElementToDelete = basket.findIndex((toRemove) => toRemove.id === productId);

    if (indexElementToDelete < 0) {
      throw new Error('Your basket has not include this porduct');
    }
    if (basket[indexElementToDelete].count <= count) {
      basket.splice(indexElementToDelete, 1);
    } else {
      basket[indexElementToDelete].count -= count;
    }

    res.cookie('basket', basket);
    res.json(basket);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getUserBasket,
  addProductToBasket,
  deleteProductFromBasket,
};
