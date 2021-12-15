const { ProductRating } = require('../../DB/models/index');

const getAllRating = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const allRatings = await ProductRating.findAll({
      where: { productId },
    });
    res.json(allRatings);
  } catch (e) {
    next(e);
  }
};

const addProductRating = async (req, res, next) => {
  const { productId, userId, rating } = req.body;

  try {
    if (!productId || !userId || !rating) {
      throw new Error('Data cant have empty field');
    }

    const addedRating = await ProductRating.create({ productId, userId, rating });
    res.json(addedRating);
  } catch (e) {

    //TODO  IF USER  e.code: 'ER_DUP_ENTRY'
    //TODO  IF USER  e.errno: 1062,'
    next(e);
  }
};

module.exports = {
  getAllRating,
  addProductRating,
};
