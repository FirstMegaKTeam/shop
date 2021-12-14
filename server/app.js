// dependencis
// TODO Add validation user id with cookie
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });
const express = require('express');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./DB/models/index');

// require routes
const { usersManagementRouter } = require('./routes/admin/usersManagement');
const { productManagementRouter } = require('./routes/admin/productManagement');
const { loginRouter } = require('./routes/loginRoutes');
const { registerRouter } = require('./routes/registerRoutes');
const { homeRouter } = require('./routes/homeRoutes');
const { basketRouter } = require('./routes/basketRoutes');
const { productsRouter } = require('./routes/searchProductsRoutes');
const { purchaseHistoryRouter } = require('./routes/purchaseHistoryRoutes');
const { messageRouter } = require('./routes/messagesRoutes');
const { userSettingsRouter } = require('./routes/userSettingsRoutes');
const { logoutRouter } = require('./routes/loguotRoutes');
const { addressRouter } = require('./routes/addsressRoutes');

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
app.use('/admin/users', accessHeadAdmin, usersManagementRouter);
app.use('/register', registerRouter);
app.use('/user/settings', userSettingsRouter);
app.use('/address', addressRouter);
app.use('/login', loginController, loginRouter);
app.use('/products', productsRouter);
app.use('/logout', logoutRouter);
app.use('/history', purchaseHistoryRouter);
app.use('/admin/addproduct', productManagementRouter);
app.use('/message', messageRouter);
app.use('/basket', basketRouter);

const x = 'asdasadsadsadsadsa';
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
