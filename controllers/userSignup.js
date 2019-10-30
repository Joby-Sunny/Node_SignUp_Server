const {db} = require('../libraries');
const {grabMessage} = require('../utilities/common');
const logger = require('../utilities/logger');
const constant = require('./controller.constants');
const {User} = db;
/*

Request Body Should be an Object of Keys :
{
  email: "user@foo.com",
  password: "password"
}
  
*/

const userSignUp = async (req, res) => {
  try {
    const {email} = req && req.body;
    const isUserAvalible = await User.findOne({where: {email}});
    if (isUserAvalible) {
      res.status(409).send({
        message: constant.ALREADY_REGISTERED,
        error: true,
        data: isUserAvalible //for development purpose;
      });
    } else {
      const newUser = await User.create({...req.body, isActive: true});
      logger.basic({
        method: 'Create User Response - userSignUp',
        data: newUser
      });
      res.status(201).send({
        message: constant.SIGNUP_SUCCESSFUL,
        error: false,
        data: newUser
      });
    }
  } catch (error) {
    logger.basic({
      method: 'Error - userSignUp',
      data: error
    });
    res
      .status(500)
      .send({message: grabMessage(error), error: true, data: error});
  }
};

module.exports = userSignUp;
