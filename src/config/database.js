const { Sequelize } = require('sequelize');


let configuration = {
  db: 'test-db',
  username: 'user',
  password: 'pass',
  dialect: 'sqlite',
  host: './dev.sqlite',
  logging: true
}

if(process.env.NODE_ENV === 'production'){
  configuration = {
    db: 'production-db',
    username: 'prod-user',
    password: 'prod-pass',
    dialect: 'sqlite',
    host: './prod.sqlite',
    logging: false
  }
}

const sequelize = new Sequelize(configuration.db, configuration.username, configuration.password, {
  dialect: configuration.dialect,
  host: configuration.host,
  logging: configuration.logging
})

module.exports = sequelize;