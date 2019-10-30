const logger = require('../utilities/logger');
const {getValues} = require('../utilities/common');
const constant = require('./controller.constants');
const {verifyToken} = require('../utilities/token');
const {db} = require('../libraries');
const {User} = db;

const validateRoute = async (req, res, next) => {
  try {
    const Authorization = req && req.header && req.header('Authorization');
    if (Authorization) {
      const token = fetchToken(Authorization);
      const tokenVerified = await verifyToken(token);
      const requestUser = await User.findOne({
        where: {id: tokenVerified.id}
      });
      const user = getValues(requestUser, ['id', 'email']);
      req['user'] = user;
      next();
    } else {
      logger.error(req);
      res.status(401).send({
        message: constant.AUTHENTICATION_ERROR,
        error: true,
        data: {}
      });
    }
  } catch (error) {
    logger.error(req);
    res.status(401).send({
      message: constant.AUTHENTICATION_ERROR,
      error: true,
      data: error
    });
  }
};

module.exports = validateRoute;

function fetchToken(authorization) {
  const auth = authorization;
  if (auth.toLowerCase().startsWith('bearer')) {
    return authorization.split(' ')[1];
  } else {
    return authorization;
  }
}
