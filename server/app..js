const express = require('express');
// TODO add field in user DB and connect this witch JWT??

// Access controller
const loginController = require('./controllers/access/checkLoginDataController');
const accessUser = require('./controllers/access/accessUserController');
const accessAdmin = require('./controllers/access/accessAdminController');
const accessHeadAdmin = require('./controllers/access/accessHeadAdminController');
const confirmEmailAuthenticate = require('./controllers/access/confirmAuthenticate');

// Head admin routes
const { headAdminRouter } = require('./routes/headAdmin/userAndAdminManageRouter');

// Admin routes
const { manageProductRouter } = require('./routes/admin/manageProductRouter');
const { manageOrdersRouter } = require('./routes/admin/manageOrdersRouter');
const { manageUsersRouter } = require('./routes/admin/manageUsersRouter');

//  Register/login/logout/confirm email routes
const { registerRouter } = require('./routes/registerRouter');
const { confirmEmailRouter } = require('./routes/confirmEmail');
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

// Head admin
app.use('/head/admin/manage', headAdminRouter);

// Admin
app.use('/admin/users', accessHeadAdmin, manageUsersRouter);
app.use('/admin/orders', manageOrdersRouter);
app.use('/admin/', manageProductRouter);

// Register Login Logout
app.use('/register', registerRouter);
app.use('/confirm', confirmEmailRouter);
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
app.use('/rating', ratingRouter);

module.exports = {
  app,
};
