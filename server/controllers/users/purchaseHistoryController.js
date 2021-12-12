const { User, Product, UserProductsHistory } = require('../../DB/models/index');

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
          attributes: ['id', 'name', 'price', 'imgUrl', 'sumRating', 'availability', 'description'],
        },
      },
      where: { id },
    });

    //      User Product history
    //    it's array includes object
    // User Product history  =   [
    //      {
    //        createdAt: '2021-12-12T18:31:43.000Z', <-Date of buy
    //        Product: { <- inside is product its to another  object
    //          id: '3',
    //          name: 'chleb',
    //          price: '3.00',
    //          imgUrl: '',
    //          sumRating: 0,
    //          availability: 0,
    //          description: null,
    //        },
    //      },
    //    ];
    res.json(UserProductsHistories);
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
