const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('./config/logger.js');

const userRoute = require('./src/users/user_routes.js');
const middleware = require('./src/common/middleware.js');

const app = express();

app.use(bodyParser.json());

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));

// whenver a URL comes we are logging
app.use(middleware.logUrl);

app.use(userRoute);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  logger.log('info', `app listening at port ${port}`);
});

module.exports = server;
