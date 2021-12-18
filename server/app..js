const express = require('express');
// TODO change controllers mand get user id from req.user(on authenticate routes)

// Access controller
const loginController = require('./controllers/access/checkLoginDataController');
const accessUser = require('./controllers/access/accessUserController');
const accessAdmin = require('./controllers/access/accessAdminController');
// const confirmEmailAuthenticate = require('./controllers/access/accessByQueryParamsToken');

// Head admin routes

// Admin routes
const { manageProductRouter } = require('./routes/admin/manageProductRouter');
const { manageOrdersRouter } = require('./routes/admin/manageOrdersRouter');
const { manageUsersRouter } = require('./routes/admin/manageUsersRouter');

//  Register/login/logout/confirm email/ reset password routes
const { registerRouter } = require('./routes/registerRouter');
const { confirmEmailRouter } = require('./routes/confirmEmailRouter');
const { loginRouter } = require('./routes/loginRouter');
const { logoutRouter } = require('./routes/loguotRouter');
const { resetPasswordRouter } = require('./routes/resetPasswordRouter');

// User settings routes
const { userSettingsRouter } = require('./routes/userSettingsRouter');
const { addressRouter } = require('./routes/addsressRouter');

// Shopping routes
const { productsRouter } = require('./routes/searchProductsRouter');
const { basketRouter } = require('./routes/basketRouter');
const { orderRouter } = require('./routes/orderRouter');
const { ratingRouter } = require('./routes/ratingRouter');

// Massage routes
const { messageRouter } = require('./routes/messagesRouter');

const app = express.Router();

// Middleware

// Admin
app.use('/admin/users', accessAdmin, manageUsersRouter);
app.use('/admin/orders', manageOrdersRouter);
app.use('/admin/', manageProductRouter);

// Register Login Logout Confirm emil reset password
app.use('/register', registerRouter);
app.use('/confirm', confirmEmailRouter);
app.use('/login', loginController, loginRouter);
app.use('/logout', logoutRouter);
app.use('/reset', resetPasswordRouter);

// User settings
app.use('/user/settings', userSettingsRouter);
app.use('/address', addressRouter);

// Shop
app.use('/products', productsRouter);
app.use('/message', messageRouter);
app.use('/basket', basketRouter);
app.use('/order', orderRouter);
app.use('/rating', ratingRouter);

module.exports = {
  app,
};
