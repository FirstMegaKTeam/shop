const dotenv = require('dotenv');

dotenv.config({ path: '.env' });
const express = require('express');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./DB/models/index');

// require routes
const { app } = require('./app');

// Authorization require
const { passport } = require('./controllers/access/authorization');

// requires
const { handleError } = require('./middleware/handleError');
const { setHeader } = require('./middleware/setHeaderFromCookie');

// different variable
const server = express();
const port = process.env.PORT || 5000;

// Middleware
server.use(passport.initialize());
server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(express.json());
server.use(setHeader);

// Router to the rest routers
server.use('/', app);

// handle Errors
server.use(handleError);

server.listen(port, 'localhost', async () => {
  console.log(`Server listen on http://localhost:${port}`);
  // connect with database
  // await sequelize.authenticate();
  console.log('Connect with DB');
});
async function main() {
  await sequelize.sync({ force: true });
}
// Create/Reset Data base
main();


