const createModel = require('./createModel');
const createRouter = require('./createRouter');

/**
 * Creates a mongoose model and an express router
 * @param {String} name Name of the model
 * @param {Object} schema Mongoose schema
 * @param {Object} wantedEndpoints Wanted endpoints
 * @param {Object} mongoose Mongoose instance
 * @param {Object} express Express instance
 * @returns {Object} Mongoose model & Express router
 */
const SMEE = (name, schema, wantedEndpoints, mongoose, express) => {
  const Model = createModel(name, schema, mongoose);
  const Router = createRouter(wantedEndpoints, express, Model);

  return {
    Model,
    Router,
  };
};

module.exports = SMEE;
