const logger = require('../../config/logger.js');

function log(req, res, next) {
  logger.log('info', `${req.method} ${req.url}`);
  next();
}

module.exports = {
  logUrl: log,
};
