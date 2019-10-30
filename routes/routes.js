const {express} = require('../libraries');
const logger = require('../utilities/logger');
const router = express.Router();
const {
  defaultRoute,
  userLogin,
  userSignup,
  getUserDetails,
  validateRoute
} = require('../controllers');

router.use((req, res, next) => {
  logger.info(req);
  next();
});

router.post('/', defaultRoute);

router.post('/signup', userSignup);

router.post('/login', userLogin);

router.get('/userdetails', validateRoute, getUserDetails);

module.exports = router;
