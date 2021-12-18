const { Op } = require('sequelize');

const { Product, Order } = require('../../DB/models/index');
const { addPossibilitiesEdit, saveSellProductInDB, addToOrderSystem } = require('../../utils/dbUtils');
const {
  NotLoginError,
  NotFoundError,
  EmptyBasketError,
  CountError,
  WrongDataError,
} = require('../../utils/errors');

const getAllUserOrders = async (req, res, next) => {
  const { user } = req;

  try {
    if (!user) throw new NotLoginError('You are not logged in');
    const userOrders = await Order.findAll({
      where: { userId: user.id },
    });

    if (!userOrders || !userOrders.length) throw new NotFoundError('Dont found any orders');

    res.json(userOrders);
  } catch (e) {
    next(e);
  }
};

const order = async (req, res, next) => {
  const { basket } = req.cookies;
  const { user } = req;

  try {
    if (!user) throw new NotLoginError('You are not logged in');
    if (!basket || !basket.length) throw new EmptyBasketError('Your basket is empty');

    const userOrderProductsId = basket.map((oneRecord) => ({ id: oneRecord.id }));
    const productsFromDB = await Product.findAll({
      where: {
        [Op.or]: userOrderProductsId,
      },
    });
    const productsToEdit = addPossibilitiesEdit(productsFromDB);
    let toPaid = 0;
    const checkStateInMagazineAndSel = productsToEdit.map((oneProductFromDB) => {
      const productWithCount = {};
      basket.forEach((oneProductForBasket) => {
        if (oneProductFromDB.id === oneProductForBasket.id) {
          if (oneProductForBasket.count > oneProductFromDB.availability) {
            throw new CountError(
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
      toPaid += (Number(productWithCount.price) * productWithCount.count);
      return productWithCount;
    });

    await addToOrderSystem(checkStateInMagazineAndSel, user.id);
    res.clearCookie('basket');

    res.json({
      toPaid,
      order: checkStateInMagazineAndSel,
    });
  } catch (er) {
    next(er);
  }
};

const orderNow = async (req, res, next) => {
  const { user } = req;
  const { productId, count } = req.body;
  try {
    if (!user) throw new NotLoginError('You are not logged in');
    if (!productId || !count) throw new WrongDataError('You must get product id and count');
    if (count < 1 || !(Number.isInteger(count))) throw new CountError('Count value is wrong');

    const findBuyProduct = await Product.findOne({
      where: { id: productId },
    });
    if (!findBuyProduct) throw new NotFoundError('Product don\'t exist');
    if (findBuyProduct.availability < count) throw new CountError(`We have only ${findBuyProduct.availability}  ${findBuyProduct.name}`);

    await saveSellProductInDB(findBuyProduct.id, count);
    await addToOrderSystem(findBuyProduct, user.id);
    const toPaid = Number(findBuyProduct.price) * count;

    res.json({
      toPaid,
      order: findBuyProduct,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  order,
  orderNow,
  getAllUserOrders,
};
