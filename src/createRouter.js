const endpoints = require('./endpoints');

const addEndpointToRouter = (expressRoute, model, wantedEndpoint) => {
  const endpoint = endpoints[wantedEndpoint];
  expressRoute[endpoint.type](endpoint.pathExtension, endpoint.handler(model));
};

const createRouter = (wantedEndpoints, express, model) => {
  if (!wantedEndpoints || !Array.isArray(wantedEndpoints)) throw new Error('Wanted Endpoints is not defined');
  if (!express) throw new Error('Express is not defined');
  if (!model) throw new Error('Mongoose Model is not defined');

  const expressRoute = express.Router();

  wantedEndpoints.forEach((wantedEndpoint) => addEndpointToRouter(expressRoute, model, wantedEndpoint));
  return expressRoute;
};

module.exports = createRouter;
