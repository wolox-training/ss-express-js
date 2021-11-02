// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const { getWeets } = require('./controllers/weets');
const { newUser } = require('./controllers/users');
const { validateUser } = require('./validations/user');
const checkValidations = require('./middlewares/checkValidations');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/weets', getWeets);
  app.post('/users', [validateUser, checkValidations], newUser);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
