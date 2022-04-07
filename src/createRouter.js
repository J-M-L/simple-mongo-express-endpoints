const endpoints = require('./endpoints');

const createRouter = (wantedEndpoints, express, model) => {
  if (!wantedEndpoints || !Array.isArray(wantedEndpoints)) throw new Error('Wanted Endpoints is not defined');
  if (!express) throw new Error('Express is not defined');
  if (!model) throw new Error('Mongoose Model is not defined');

  const expressRoute = express.Router();

  wantedEndpoints.forEach((wantedEndpoint) => {
    const endpoint = endpoints[wantedEndpoint];
    expressRoute[endpoint.type](endpoint.pathExtension, endpoint.handler(model));
  });
  return expressRoute;
};

module.exports = createRouter;
