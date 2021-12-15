const {
  User, Product, UserProductsHistory, ProductRating,
} = require('../../DB/models/index');
const { getGradeAverage, addPossibilitiesEdit } = require('../../utils/dbUtils');

const getShoppingHistory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [{ UserProductsHistories }] = await User.findAll({
      attributes: [],
      include: {
        model: UserProductsHistory,
        attributes: ['createdAt'],
        include: {
          model: Product,
          attributes: ['id', 'name', 'price', 'imgUrl', 'availability', 'description'],
          include: {
            model: ProductRating,
            attributes: ['rating'],
          },
        },
      },
      where: { id },

    });
    const userProdHisToEdit = addPossibilitiesEdit(UserProductsHistories);

    const shoppingHistory = userProdHisToEdit.map((oneRecord) => {
      oneRecord.Product.ProductRatings = getGradeAverage(oneRecord.Product.ProductRatings);
      return oneRecord;
    });

    res.json(shoppingHistory);
  } catch (e) {
    next(e);
  }
};

const addNewProductToHistory = async (req, res, next) => {
  const { userId, productId } = req.body;
  try {
    const newProductInUserHistory = await UserProductsHistory.create({
      userId,
      productId,
    });
    res.json(newProductInUserHistory);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getShoppingHistory,
  addNewProductToHistory,

};
