// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const { getWeets } = require('./controllers/weets');
const { newUser, newSession } = require('./controllers/users');
const { validateUser, validateEmail } = require('./validations/user');
const checkValidations = require('./middlewares/checkValidations');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/weets', getWeets);
  app.post('/users', [validateUser, checkValidations], newUser);
  app.post('/users/sessions', validateEmail, newSession);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
