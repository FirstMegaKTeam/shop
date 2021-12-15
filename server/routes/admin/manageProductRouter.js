const express = require('express');
const {adnNewProduct,editProduct, deleteProduct} = require('../../controllers/admin/productsController')

const manageProductRouter = express.Router();
manageProductRouter
  .post('/', adnNewProduct)
  .patch('/',  editProduct)
  .delete('/', deleteProduct);

module.exports = {
  manageProductRouter,
};
