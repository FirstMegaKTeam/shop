// dependencis
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });
const express = require('express');
const { sequelize } = require('./DB/models/index');

// require routes
const { usersManagementRouter } = require('./routes/admin/usersManagement');
const { productManagementRouter } = require('./routes/admin/productManagement');
const { loginRouter } = require('./routes/login');
const { registerRouter } = require('./routes/register');
const { homeRouter } = require('./routes/home');
const { buyRouter } = require('./routes/buy');
const { productsRouter } = require('./routes/products');
const { purchaseHistoryRouter } = require('./routes/purchaseHistory');
const { messageRouter } = require('./routes/messages');
const { ratingRouter } = require('./routes/ratingProducts');
const { userSettingsRouter } = require('./routes/userSettings');
const { logoutRouter } = require('./routes/loguot');
const { addressRouter } = require('./routes/addsress');

// requires

// different variable
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// routes
//
app.use('/admin/users', usersManagementRouter);
app.use('/register', registerRouter);
app.use('/user/settings', userSettingsRouter);
app.use('/address', addressRouter);

app.listen(port, 'localhost', async () => {
  console.log(`Server listen on http://localhost:${port}`);
  await sequelize.authenticate();
  console.log('Connect with DB');
});

// async function main() {
//   await sequelize.sync({ force: true });
// }
// main();
