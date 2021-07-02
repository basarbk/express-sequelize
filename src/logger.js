const { createLogger, transports } = require('winston');
const logger = createLogger({
  level: 'debug',
  transports: [
    new transports.Console()
  ]
});

module.exports = logger;