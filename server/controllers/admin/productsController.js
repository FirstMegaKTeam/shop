const { Product } = require('../../DB/models/index');
const { WrongDataError, NotFoundError, NotAdminError } = require('../../utils/errors');

const adnNewProduct = async (req, res, next) => {
  const {
    name, price, imgUrl, availability, description,
  } = req.body;
  const { admin } = req;

  try {
    if (!admin || admin.role < 1) throw new NotAdminError('You re not admin');
    if (!name || !price || availability) throw new WrongDataError('You must give name, price and availability!');

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
  const { admin } = req;

  try {
    if (!admin || admin.role < 1) throw new NotAdminError('You re not admin');
    if (!id || !newProductInfoObj) throw new WrongDataError('You must give id and new product information');

    const productToEdit = await Product.findOne({ where: { id } });

    if (!productToEdit) throw new NotFoundError('Product dont exist');

    Object.assign(productToEdit, newProductInfoObj);
    await productToEdit.save();

    res.json(productToEdit);
  } catch (e) {
    next(e);
  }
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.body;
  const { admin } = req;

  try {
    if (!admin || admin.role < 1) throw new NotAdminError('You re not admin');
    if (!id) throw new WrongDataError('You must give id');

    const productToDelete = await Product.findOne({
      where: { id },
      attributes: ['id', 'name'],
    });

    if (!productToDelete) throw new NotFoundError('Product dont exist');

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
