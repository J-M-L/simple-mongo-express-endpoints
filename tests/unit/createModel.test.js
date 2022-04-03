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
      errorMessage: 'Name is not defined',
    },
    'when no schema has been given': {
      name: 'sadf',
      schema: undefined,
      mongoose: {},
      errorMessage: 'Schema is not defined',
    },
    'when no mongoose has been given': {
      name: 'sadf',
      schema: {
        name: String,
      },
      mongoose: undefined,
      errorMessage: 'Mongoose is not defined',
    },
  }))('should throw an error when %s', (testname, { name, schema, mongoose, errorMessage }) => {
    expect(() => createModel(name, schema, mongoose)).toThrow(errorMessage);
  });
});
