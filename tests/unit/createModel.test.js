/* eslint-disable object-curly-newline */
/* eslint-disable global-require */
let createModel;
describe('createModel', () => {
  beforeEach(() => {
    jest.resetModules();
    createModel = require('../../src/createModel');
  });

  it.each(Object.entries({
    'when no name has been given': {
      name: undefined,
      schema: {
        name: String,
      },
      mongoose: {},
      errorMessage: 'name is not defined',
    },
    'when no schema has been given': {
      name: 'sadf',
      schema: undefined,
      mongoose: {},
      errorMessage: 'schema is not defined',
    },
    'when no mongoose has been given': {
      name: 'sadf',
      schema: {
        name: String,
      },
      mongoose: undefined,
      errorMessage: 'mongoose is not defined',
    },
    'when name is not a string': {
      name: ['sadf'],
      schema: {
        name: String,
      },
      mongoose: {},
      errorMessage: 'Type of name is wrong, it should be string',
    },
    'when no schema is not an object': {
      name: 'sadf',
      schema: 'Schema',
      mongoose: {},
      errorMessage: 'Type of schema is wrong, it should be object',
    },
    'when no mongoose is not an object': {
      name: 'sadf',
      schema: {
        name: String,
      },
      mongoose: 'model',
      errorMessage: 'Type of mongoose is wrong, it should be object',
    },
  }))('should throw an error when %s', (testname, { name, schema, mongoose, errorMessage }) => {
    expect(() => createModel(name, schema, mongoose)).toThrow(errorMessage);
  });
});
