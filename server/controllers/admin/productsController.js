const { Product } = require('../../DB/models/index');

const adnNewProduct = async (req, res, next) => {
  const {
    name, price, imgUrl, availability, description,
  } = req.body;

  try {
    const newProduct = await Product.create({
      name,
      price,
      imgUrl,
      availability,
      description,
    });

    res.json(newProduct);
  } catch (e) {
    next(e);
  }
};

const editProduct = async (req, res, next) => {
  const { id, newProductInfoObj } = req.body;

  try {
    const productToEdit = await Product.findOne({ where: { id } });
    if (!productToEdit) {
      throw new Error('Product dont exist');
    }

    Object.assign(productToEdit, newProductInfoObj);
    await productToEdit.save();

    res.json(productToEdit);
  } catch (e) {
    next(e);
  }
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.body;
  try {
    const productToDelete = await Product.findOne({
      where: { id },
      attributes: ['id', 'name'],
    });
    if (!productToDelete) {
      throw new Error('Product dont exist');
    }
    await productToDelete.destroy();
    res.json(productToDelete);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  adnNewProduct,
  editProduct,
  deleteProduct,
};
