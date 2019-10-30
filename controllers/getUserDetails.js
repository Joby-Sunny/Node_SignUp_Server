const {getValues, grabMessage} = require('../utilities/common');
const constant = require('./controller.constants');
const {db} = require('../libraries');
const logger = require('../utilities/logger');
const {User} = db;

const getUserDetails = async (req, res) => {
  try {
    const {id} = req.user;
    const userDetails = await User.findOne({where: {id}});
    const detailValues = getValues(userDetails, [
      'id',
      'email',
      'password',
      'isActive',
      'createdAt',
      'updatedAt'
    ]);
    res.status(200).send({
      message: constant.USER_DETAILS_FETCH_SUCCESS,
      error: false,
      data: detailValues
    });
  } catch (error) {
    logger.basic({method: 'Error - getUserDetails', data: error});
    res.status(500).send({
      message: grabMessage(req),
      error: false,
      data: error
    });
  }
};

module.exports = getUserDetails;
