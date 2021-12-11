const { Op } = require('sequelize');
const { Product } = require('../../DB/models/index');

const getAllProducts = async (req, res, next) => {
  try {
    const page = Number(req.params.page);

    if (isNaN(page)) {
      throw new Error('page must be a numter type');
    }

    const limit = 25;
    let offset = 0;
    if (page > 1) {
      offset = limit * page;
    }

    const products = await Product.findAll({ limit, offset });
    res.json(products);
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
      where: {
        name: { [Op.like]: `%${name}%` },
      },
    });
    res.json(productsByName);
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
        where: {
          price: {
            [Op.gte]: PriceToNumber,
          },
        },
      });
      console.log(productsMoreExpensive);
      res.json(productsMoreExpensive);
      return;
    }
    if (biggerOrSmaller === 'smaller') {
      const productsCheaper = await Product.findAll({
        where: {
          price: {
            [Op.lte]: PriceToNumber,
          },
        },
      });
      res.json(productsCheaper);
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
      where: {
        price: {
          [Op.between]: betweenQuery,
        },
      },
    });
    res.json(productsBetween);
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
