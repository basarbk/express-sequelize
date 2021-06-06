const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Article = require('../article/Article');

class User extends Model {};

User.init({
  username: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'user',
  timestamps: false
})

User.hasMany(Article, { foreignKey: 'userId'});
Article.belongsTo(User);

module.exports = User;