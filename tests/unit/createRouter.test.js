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
      express: {},
      model: {},
      errorMessage: 'Wanted Endpoints is not defined',
    },
    'when no express has been given': {
      wantedEndpoints: [''],
      express: undefined,
      model: {},
      errorMessage: 'Express is not defined',
    },
    'when no model has been given': {
      wantedEndpoints: [''],
      express: {},
      model: undefined,
      errorMessage: 'Model is not defined',
    },
    'when wantedEndpoints is not an array': {
      wantedEndpoints: '',
      express: {},
      model: {},
      errorMessage: 'Wanted Endpoints is not defined',
    },
  }))('should throw an error when %s', (testname, { wantedEndpoints, express, model, errorMessage }) => {
    expect(() => createRouter(wantedEndpoints, express, model)).toThrow(errorMessage);
  });
});
