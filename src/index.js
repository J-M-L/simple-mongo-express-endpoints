const createModel = require('./createModel');
const createRouter = require('./createRouter');

const SMEE = (name, schema, mongoose, wantedEndpoints, express) => {
  const Model = createModel(name, schema, mongoose);
  const router = createRouter(wantedEndpoints, express, Model);

  return {
    Model,
    router,
  };
};

module.exports = SMEE;
