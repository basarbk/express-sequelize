const { createLogger, transports } = require('winston');
const logger = createLogger({
  level: 'debug',
  transports: [
    new transports.Console({level: 'silly'}),
    new transports.File({ filename: 'app.log', level: 'info'})
  ]
});

module.exports = logger;