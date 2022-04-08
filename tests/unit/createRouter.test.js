/* eslint-disable object-curly-newline */
/* eslint-disable global-require */
let createRouter;
describe('createModel', () => {
  beforeEach(() => {
    jest.resetModules();
    createRouter = require('../../src/createRouter');
  });

  it.each(Object.entries({
    'when no wantedEndpoints has been given': {
      wantedEndpoints: undefined,
      express: () => 'express',
      model: () => 'model',
      errorMessage: 'wantedEndpoints is not defined',
    },
    'when no express has been given': {
      wantedEndpoints: [''],
      express: undefined,
      model: () => 'model',
      errorMessage: 'express is not defined',
    },
    'when no Model has been given': {
      wantedEndpoints: [''],
      express: () => 'express',
      model: undefined,
      errorMessage: 'Model is not defined',
    },
    'when wantedEndpoints is not an array': {
      wantedEndpoints: 'wanted',
      express: () => 'express',
      model: () => 'model',
      errorMessage: 'Type of wantedEndpoints is wrong, it should be array',
    },
    'when no express is not a function': {
      wantedEndpoints: [''],
      express: {},
      model: () => 'model',
      errorMessage: 'Type of express is wrong, it should be function',
    },
    'when no Model is not object': {
      wantedEndpoints: [''],
      express: () => 'express',
      model: 'model',
      errorMessage: 'Type of Model is wrong, it should be function',
    },
  }))('should throw an error when %s', (testname, { wantedEndpoints, express, model, errorMessage }) => {
    expect(() => createRouter(wantedEndpoints, express, model)).toThrow(errorMessage);
  });
});
