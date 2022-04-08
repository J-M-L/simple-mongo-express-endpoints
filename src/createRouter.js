const endpoints = require('./endpoints');
const { validateInputOrThrow } = require('./validate');

const createRouter = (wantedEndpoints, express, Model) => {
  validateInputOrThrow('wantedEndpoints', wantedEndpoints, 'array');
  validateInputOrThrow('express', express, 'function');
  validateInputOrThrow('Model', Model, 'function');

  const expressRoute = express.Router();

  wantedEndpoints.forEach((wantedEndpoint) => {
    const endpoint = endpoints[wantedEndpoint];
    expressRoute[endpoint.type](endpoint.pathExtension, endpoint.handler(Model));
  });
  return expressRoute;
};

module.exports = createRouter;
