const { Op } = require('sequelize');
const { Product, ProductRating } = require('../../DB/models/index');
const { getGradeAverage, addPossibilitiesEdit } = require('../../utils/dbUtils');
const { WrongDataError, NotFoundError } = require('../../utils/errors');

const getAllProducts = async (req, res, next) => {
  try {
    const page = Number(req.params.page);

    if (isNaN(page)) throw new WrongDataError('page must be a number type');

    const limit = 25;
    let offset = 0;
    if (page > 1) {
      offset = limit * page;
    }

    const products = await Product.findAll({
      limit,
      offset,
      include: {
        model: ProductRating,
        attributes: ['rating'],
      },
    });

    if (!products || !products.length) throw new NotFoundError('Dont found any products');

    const productsToEdit = addPossibilitiesEdit(products);
    const productsWithRating = productsToEdit.map((oneRecord) => {
      oneRecord.ProductRatings = getGradeAverage(oneRecord.ProductRatings);
      return oneRecord;
    });

    res.json(productsWithRating);
  } catch (e) {
    next(e);
  }
};

const getProductByName = async (req, res, next) => {
  const { name } = req.params;

  try {
    if (!name) throw new WrongDataError('Name cant by empty');

    const productsByName = await Product.findAll({
      limit: 100,
      include: {
        model: ProductRating,
        attributes: ['rating'],
      },
      where: {
        name: { [Op.like]: `%${name}%` },
      },
    });

    if (!productsByName || !productsByName.length) throw new NotFoundError('Dont found any products');

    const productsToEdit = addPossibilitiesEdit(productsByName);
    const productsWithRating = productsToEdit.map((oneRecord) => {
      oneRecord.ProductRatings = getGradeAverage(oneRecord.ProductRatings);
      return oneRecord;
    });

    res.json(productsWithRating);
  } catch (e) {
    next(e);
  }
};

const getByPriceSmallerOrBigger = async (req, res, next) => {
  const { price, biggerOrSmaller } = req.params;

  try {
    if (!price || !biggerOrSmaller) throw new WrongDataError('You must give price and chose parameter');
    const PriceToNumber = Number(price);
    if (isNaN(PriceToNumber)) throw new WrongDataError('Invalid price');

    if (biggerOrSmaller === 'bigger') {
      const productsMoreExpensive = await Product.findAll({
        include: {
          model: ProductRating,
          attributes: ['rating'],
        },
        where: {
          price: {
            [Op.gte]: PriceToNumber,
          },
        },

      });

      if (!productsMoreExpensive || !productsMoreExpensive.length) throw new NotFoundError('Dont found any products');

      const productsToEdit = addPossibilitiesEdit(productsMoreExpensive);
      const productsWithRating = productsToEdit.map((oneRecord) => {
        oneRecord.ProductRatings = getGradeAverage(oneRecord.ProductRatings);
        return oneRecord;
      });

      res.json(productsWithRating);
      return;
    }
    if (biggerOrSmaller === 'smaller') {
      const productsCheaper = await Product.findAll({
        include: {
          model: ProductRating,
          attributes: ['rating'],
        },
        where: {
          price: {
            [Op.lte]: PriceToNumber,
          },
        },
      });

      if (!productsCheaper || !productsCheaper.length) throw new NotFoundError('Dont found any products');

      const productsToEdit = addPossibilitiesEdit(productsCheaper);
      const productsWithRating = productsToEdit.map((oneRecord) => {
        oneRecord.ProductRatings = getGradeAverage(oneRecord.ProductRatings);
        return oneRecord;
      });

      res.json(productsWithRating);
      return;
    }
    throw new WrongDataError('Your params is wrong');
  } catch (e) {
    next(e);
  }
};

const getProductByPriceBetween = async (req, res, next) => {
  const { greaterThan, lessThan } = req.params;

  try {
    if (!greaterThan || !lessThan) throw new WrongDataError('You must give both value');

    const minPrice = Number(greaterThan);
    const maxPrice = Number(lessThan);

    if (Number.isNaN(maxPrice) || Number.isNaN(minPrice)) throw new WrongDataError('Both arguments must be a number');
    if (maxPrice < 0 || minPrice < 0) throw new WrongDataError('Both value must be positive');

    const betweenQuery = [minPrice, maxPrice];

    if (minPrice > maxPrice) {
      betweenQuery.reverse();
    }

    const productsBetween = await Product.findAll({
      include: {
        model: ProductRating,
        attributes: ['rating'],
      },
      where: {
        price: {
          [Op.between]: betweenQuery,
        },
      },
    });

    if (!productsBetween || !productsBetween.length) throw new NotFoundError('Dont found any products');

    const productsToEdit = addPossibilitiesEdit(productsBetween);
    const productsWithRating = productsToEdit.map((oneRecord) => {
      oneRecord.ProductRatings = getGradeAverage(oneRecord.ProductRatings);
      return oneRecord;
    });

    res.json(productsWithRating);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllProducts,
  getProductByName,
  getByPriceSmallerOrBigger,
  getProductByPriceBetween,
};
