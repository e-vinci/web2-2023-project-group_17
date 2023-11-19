const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const logger = require('morgan');
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:8080', 'https://e-baron.github.io'],
};

const usersRouter = require('./routes/users');
const pizzaRouter = require('./routes/pizzas');
const authsRouter = require('./routes/auths');

const app = express();

// TODO : need to be verified
const expiryDateIn3Months = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 3);
const cookieSecretKey = process.env.COOKIE_KEY;
app.use(
  cookieSession({
    name: 'user',
    keys: [cookieSecretKey],
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: expiryDateIn3Months,
      credentials : true,
    },
  }),
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors(corsOptions));

app.use('/users', usersRouter);
app.use('/pizzas', pizzaRouter);
app.use('/auths', authsRouter);

module.exports = app;
