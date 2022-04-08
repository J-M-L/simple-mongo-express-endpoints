/* eslint-disable object-curly-newline */
/* eslint-disable global-require */
let simpleMongoExpressEndpoints;
let createModel;
let createRouter;

describe('simpleMongoExpressEndpoints', () => {
  beforeEach(() => {
    jest.resetModules();

    jest.mock('../../src/createModel', () => jest.fn().mockReturnValue('model'));
    jest.mock('../../src/createRouter', () => jest.fn().mockReturnValue('router'));

    createModel = require('../../src/createModel');
    createRouter = require('../../src/createRouter');

    simpleMongoExpressEndpoints = require('../../src/index');
  });

  it('should return value with proper input', () => {
    const name = 'somename';
    const schema = { scema: 'scema' };
    const wanted = ['wanted'];
    const mongoose = { mongoose: 'mongoose' };
    const express = () => 'express';

    const result = simpleMongoExpressEndpoints(name, schema, wanted, mongoose, express);
    expect({ Model: 'model', Router: 'router' }).toMatchObject(result);

    expect(createModel).toBeCalledWith(name, schema, mongoose);
    expect(createRouter).toBeCalledWith(wanted, express, 'model');
  });
});
