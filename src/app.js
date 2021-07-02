const express = require("express");

const UserRouter = require('./user/UserRouter');
const ErrorHandler = require('./error/ErrorHandler');
const ArticleRouter = require('./article/ArticleRouter');
const FileRouter = require('./file/FileRouter');
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
   fallbackLng: 'en',
   backend: {
     loadPath: './locales/{{lng}}/translation.json'
   }
  })


const app = express();
app.use("/uploads", express.static("./upload-dir"));
app.use(middleware.handle(i18next));
app.use(express.json());

app.use(UserRouter);
app.use(ArticleRouter);
app.use(FileRouter);

app.use(ErrorHandler);

module.exports = app;