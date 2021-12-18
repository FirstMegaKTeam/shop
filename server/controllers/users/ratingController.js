const { ProductRating } = require('../../DB/models/index');
const { WrongDataError, NotFoundError, NotLoginError } = require('../../utils/errors');

const getAllRating = async (req, res, next) => {
  const { productId } = req.params;
  try {
    if (!productId) throw new WrongDataError('You must give product id');
    const allRatings = await ProductRating.findAll({
      where: { productId },
    });

    if (!allRatings || !allRatings.length) throw new NotFoundError('Not found any results');

    res.json(allRatings);
  } catch (e) {
    next(e);
  }
};

const addProductRating = async (req, res, next) => {
  const { user } = req;
  const { productId, rating } = req.body;

  try {
    if (!user) throw new NotLoginError('You are not logged in');
    if (!productId || !rating) throw new WrongDataError('Data cant have empty field');

    const addedRating = await ProductRating.create({
      productId,
      userId: user.id,
      rating,
    });

    res.json(addedRating);
  } catch (e) {
    // TODO  IF USER  e.code: 'ER_DUP_ENTRY'
    // TODO  IF USER  e.errno: 1062,'
    next(e);
  }
};

module.exports = {
  getAllRating,
  addProductRating,
};
