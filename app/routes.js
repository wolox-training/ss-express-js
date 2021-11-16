// const controller = require('./controllers/controller');
const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('../documentation');
const { healthCheck } = require('./controllers/healthCheck');
const { getWeets } = require('./controllers/weets');
const { newUser } = require('./controllers/users');
const { validateUser } = require('./validations/user');
const checkValidations = require('./middlewares/checkValidations');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/weets', getWeets);
  app.post('/users', [validateUser, checkValidations], newUser);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
