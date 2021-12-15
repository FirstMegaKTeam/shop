const { Op } = require('sequelize');

const { Product, User, Order } = require('../../DB/models/index');
const { addPossibilitiesEdit, saveSellProductInDB, addToOrderSystem } = require('../../utils/dbUtils');

const getAllUserOrders = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userOrders = await User.findAll({
      attributes: [],
      include: {
        model: Order,
      },
      where: { id },
    });
    res.json(userOrders);
  } catch (e) {
    next(e);
  }
};

const order = async (req, res, next) => {
  const { basket } = req.cookies;
  const { userId } = req.body;

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

    await addToOrderSystem(checkStateInMagazineAndSel, userId);
    res.clearCookie('basket');
    res.json(checkStateInMagazineAndSel);
  } catch (er) {
    next(er);
  }
};

const orderNow = async (req, res, next) => {
  const { productId, userId, count } = req.body;
  try {
    const findBuyProduct = await Product.findOne({
      where: { id: productId },
    });
    if (!findBuyProduct) {
      throw new Error('Product don\'t exist');
    }
    if (findBuyProduct.availability < count) {
      throw new Error(`We have only ${findBuyProduct.availability}  ${findBuyProduct.name}`);
    }
    await saveSellProductInDB(findBuyProduct.id, count);
    await addToOrderSystem(findBuyProduct, userId);

    res.json(findBuyProduct);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  order,
  orderNow,
  getAllUserOrders,
};
