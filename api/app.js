const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:8080', 'http://localhost:3000', 'https://e-baron.github.io', 'https://ysaline-degols-vinci.github.io/NekoCafe', 'https://ysaline-degols-vinci.github.io'],
  credentials: true,
};

const usersRouter = require('./routes/users');
const authsRouter = require('./routes/auths');

const app = express();

// TODO : need to be verified
const expiryDateIn3Months = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 3);

app.use(
  session({
    secret: 'NekoCafe', // need to be changed it's for test
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: expiryDateIn3Months,
    },
  }),
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors(corsOptions));

app.use('/users', usersRouter);
app.use('/auths', authsRouter);

app.options('/auths/login', cors(corsOptions));

module.exports = app;
