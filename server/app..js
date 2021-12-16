const express = require('express');

// Access controller
const loginController = require('./controllers/access/checkLoginDataController');
const accessUser = require('./controllers/access/accessUserController');
const accessAdmin = require('./controllers/access/accessAdminController');
const accessHeadAdmin = require('./controllers/access/accessHeadAdminController');

// Admin routes
const { manageProductRouter } = require('./routes/admin/manageProductRouter');
const { manageOrdersRouter } = require('./routes/admin/manageOrdersRouter');
const { manageUsersRouter } = require('./routes/admin/manageUsersRouter');

//  Register/login/logout routes
const { registerRouter } = require('./routes/registerRouter');
const { loginRouter } = require('./routes/loginRouter');
const { logoutRouter } = require('./routes/loguotRouter');

// User settings routes
const { userSettingsRouter } = require('./routes/userSettingsRouter');
const { addressRouter } = require('./routes/addsressRouter');

// Shopping routes
const { productsRouter } = require('./routes/searchProductsRouter');
const { basketRouter } = require('./routes/basketRouter');
const { orderRouter } = require('./routes/orderRoutes');
const { ratingRouter } = require('./routes/ratingRouter');

// Massage routes
const { messageRouter } = require('./routes/messagesRouter');

const app = express.Router();

// Middleware
// Admin
app.use('/admin/users', accessHeadAdmin, manageUsersRouter);
app.use('/admin/orders', manageOrdersRouter);
app.use('/admin/product', manageProductRouter);

// Register Login Logout
app.use('/register', registerRouter);
app.use('/login', loginController, loginRouter);
app.use('/logout', logoutRouter);

// User settings
app.use('/user/settings', userSettingsRouter);
app.use('/address', addressRouter);

// Shop
app.use('/products', productsRouter);
app.use('/message', messageRouter);
app.use('/basket', basketRouter);
app.use('/order', orderRouter);
app.use('', ratingRouter);

module.exports = {
  app,
};
