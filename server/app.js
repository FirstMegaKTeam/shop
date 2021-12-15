// dependencis
// TODO Add validation user id with cookie
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });
const express = require('express');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./DB/models/index');

// require routes
const { manageUsersRouter } = require('./routes/admin/manageUsersRouter');
const { manageProductRouter } = require('./routes/admin/manageProductRouter');
const { loginRouter } = require('./routes/loginRouter');
const { registerRouter } = require('./routes/registerRouter');
const { homeRouter } = require('./routes/homeRouter');
const { basketRouter } = require('./routes/basketRouter');
const { productsRouter } = require('./routes/searchProductsRouter');
const { messageRouter } = require('./routes/messagesRouter');
const { userSettingsRouter } = require('./routes/userSettingsRouter');
const { logoutRouter } = require('./routes/loguotRouter');
const { addressRouter } = require('./routes/addsressRouter');
const { orderRouter } = require('./routes/orderRoutes');
const { ratingRouter } = require('./routes/ratingRouter');
const { manageOrdersRouter } = require('./routes/admin/manageOrdersRouter')

// Authorization require
const { passport } = require('./controllers/access/authorization');
const loginController = require('./controllers/access/checkLoginDataController');
const accessUser = require('./controllers/access/accessUserController');
const accessAdmin = require('./controllers/access/accessAdminController');
const accessHeadAdmin = require('./controllers/access/accessHeadAdminController');

// requires
const { handleError } = require('./middleware/handleError');
const { setHeader } = require('./middleware/setHeaderFromCookie');

// different variable
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(passport.initialize());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());

app.use(setHeader);
// routes
//
app.use('/admin/users', accessHeadAdmin, manageUsersRouter);
app.use('/register', registerRouter);
app.use('/user/settings', userSettingsRouter);
app.use('/address', addressRouter);
app.use('/login', loginController, loginRouter);
app.use('/products', productsRouter);
app.use('/logout', logoutRouter);
app.use('/admin/product', manageProductRouter);
app.use('/message', messageRouter);
app.use('/basket', basketRouter);
app.use('/order', orderRouter);
app.use('/rating', ratingRouter);
app.use('/admin/orders', manageOrdersRouter)

// handle Errors

app.use(handleError);

app.listen(port, 'localhost', async () => {
  console.log(`Server listen on http://localhost:${port}`);
  await sequelize.authenticate();
  console.log('Connect with DB');
});
async function main() {
  await sequelize.sync({ force: true });
}
// main();
