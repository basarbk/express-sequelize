const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Article extends Model {};

Article.init({
  content: {
    type: DataTypes.STRING
  },
  userId: {
    type: DataTypes.NUMBER
  }
}, {
  sequelize,
  modelName: 'article',
})

module.exports = Article;