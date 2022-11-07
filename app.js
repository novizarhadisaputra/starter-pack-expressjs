require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// define routes here;
const usersRouter = require('./routes/users');
const swaggerRouter = require('./routes/swagger');

// file exception;
const exception = require('./app/handler/exception');

// file ratelimit;
const { globalLimiter } = require('./app/libraries/rateLimiters');

// library multi-language
const i18next = require("i18next");
const i18nextMiddleware = require("i18next-http-middleware");
const Backend = require("i18next-node-fs-backend");


i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector).init({
    backend: {
      loadPath: __dirname + "/locales/{{lng}}/{{ns}}.json",
    },
    fallbackLng: ["en"],
  });


// global middleware
// - Accept Language
const acceptLanguage = require('./app/http/middlewares/acceptLanguage');
// - Apply property input
const createRequstInput = require('./app/http/middlewares/createRequstInput');

// library upload
const upload = require('multer')();

const app = express();

// view engine setup;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(i18nextMiddleware.handle(i18next));
app.use(upload.any());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(acceptLanguage);
app.use(createRequstInput);

// applied route here;
app.use('/api/users', usersRouter);
app.use('/api/documentation', swaggerRouter);

// applied rate limit for all routes;
app.use('/api', globalLimiter);

// error handler
app.use(exception);

module.exports = app;
