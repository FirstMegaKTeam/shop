const { Op } = require('sequelize');
const { Product, ProductRating } = require('../../DB/models/index');
const { getGradeAverage, addPossibilitiesEdit } = require('../../utils/dbUtils');

const getAllProducts = async (req, res, next) => {
  try {
    const page = Number(req.params.page);

    if (isNaN(page)) {
      throw new Error('page must be a number type');
    }

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
    if (!name) {
      throw new Error('Name cant by empty');
    }
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
  try {
    const { price, biggerOrSmaller } = req.params;
    const PriceToNumber = Number(price);
    console.log({ price, biggerOrSmaller });

    if (isNaN(PriceToNumber)) {
      throw new Error('Invalid price');
    }

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

      const productsToEdit = addPossibilitiesEdit(productsCheaper);
      const productsWithRating = productsToEdit.map((oneRecord) => {
        oneRecord.ProductRatings = getGradeAverage(oneRecord.ProductRatings);
        return oneRecord;
      });

      res.json(productsWithRating);
      return;
    }
    throw new Error('Your params is wrong');
  } catch (e) {
    next(e);
  }
};

const getProductByPriceBetween = async (req, res, next) => {
  const { greaterThan, lessThan } = req.params;

  const minPrice = Number(greaterThan);
  const maxPrice = Number(lessThan);

  try {
    if (Number.isNaN(maxPrice) || Number.isNaN(minPrice)) {
      throw new Error('Both arguments must be a number');
    }

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
