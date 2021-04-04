const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class Article extends Model {};

Article.init({
  content: {
    type: DataTypes.STRING
  },
}, {
  sequelize,
  modelName: 'article',
})

module.exports = Article;