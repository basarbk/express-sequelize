const { Sequelize } = require('sequelize');
const config = require('config');

const configuration = config.get("database");

const sequelize = new Sequelize(configuration.db, configuration.username, configuration.password, {
  dialect: configuration.dialect,
  host: configuration.host,
  logging: configuration.logging
})

module.exports = sequelize;