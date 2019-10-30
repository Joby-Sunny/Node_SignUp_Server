const {db} = require('../libraries');
const {getValues, grabMessage} = require('../utilities/common');
const {generateToken} = require('../utilities/token');
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

const userLogin = async (req, res) => {
  try {
    const {email, password} = req && req.body;
    const currentUser = await getUser(email);
    const userActive = isUserActive(currentUser);
    const passwordCheck = validatePassword(password, currentUser);
    const token = await generateToken(makeTokenPayload(currentUser));
    res.status(200).send({
      message: constant.LOGIN_SUCCESSFUL,
      error: false,
      data: makeLoginResponse(currentUser, token)
    });
  } catch (error) {
    logger.basic({method: 'Error - userLogin', data: error});
    res
      .status(500)
      .send({message: grabMessage(error), error: true, data: error});
  }
};
module.exports = userLogin;

async function getUser(email) {
  try {
    const currentUser = await User.findOne({where: {email}});
    if (currentUser) {
      return getValues(currentUser, [
        'id',
        'email',
        'password',
        'isActive'
      ]);
    } else {
      throw {message: constant.USER_NOT_FOUND};
    }
  } catch (error) {
    throw error;
  }
}

function validatePassword(password, fetchedDetails) {
  if (
    fetchedDetails &&
    fetchedDetails.password &&
    password === fetchedDetails.password
  )
    return true;
  else throw {message: constant.USER_PASSWORD_INCORRECT};
}

function isUserActive(currentUser) {
  if (currentUser && currentUser.isActive) return true;
  else throw {message: constant.USER_INACTIVE};
}

function makeTokenPayload(currentUser) {
  const {id, email} = currentUser;
  return {id, email};
}

function makeLoginResponse(currentUser, token) {
  const {email} = currentUser;
  return {email, token};
}
