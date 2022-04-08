const createModel = require('./createModel');
const createRouter = require('./createRouter');

const validateInputOrThrow = (name, input, type = '') => {
  if (!input) throw new Error(`${name} is not defined`);
  // eslint-disable-next-line valid-typeof
  if ((type === 'array' && !Array.isArray(input)) || (type !== 'array' && typeof input !== type)) {
    throw new Error(`Type of ${name} is wrong, it should be ${type}`);
  }
};

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
  validateInputOrThrow('name', name, 'string');
  validateInputOrThrow('schema', schema, 'object');
  validateInputOrThrow('wantedEndpoints', wantedEndpoints, 'array');
  validateInputOrThrow('mongoose', mongoose, 'object');
  validateInputOrThrow('express', express, 'function');

  const Model = createModel(name, schema, mongoose);
  const Router = createRouter(wantedEndpoints, express, Model);

  return {
    Model,
    Router,
  };
};

module.exports = SMEE;
