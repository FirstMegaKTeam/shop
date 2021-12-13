const express = require('express');
const {adnNewProduct,editProduct, deleteProduct} = require('../../controllers/admin/productsController')

const productManagementRouter = express.Router();
productManagementRouter
  .post('/', adnNewProduct)
  .patch('/',  editProduct)
  .delete('/', deleteProduct);

module.exports = {
  productManagementRouter,
};
