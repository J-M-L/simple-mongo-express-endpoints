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

  it.each(Object.entries({
    'when no name has been given': {
      name: '',
      schema: { scema: 'skema' },
      wantedEndpoints: ['wanted'],
      mongoose: { mongoose: 'mongoose' },
      express: () => 'express',
      expectedErrorMessage: 'name is not defined',
    },
    'when no schema has been given': {
      name: 'name',
      schema: '',
      wantedEndpoints: ['wanted'],
      mongoose: { mongoose: 'mongoose' },
      express: () => 'express',
      expectedErrorMessage: 'schema is not defined',
    },
    'when no wantedEndpoints has been given': {
      name: 'name',
      schema: { scema: 'skema' },
      wantedEndpoints: '',
      mongoose: { mongoose: 'mongoose' },
      express: () => 'express',
      expectedErrorMessage: 'wantedEndpoints is not defined',
    },
    'when no mongoose has been given': {
      name: 'name',
      schema: { scema: 'skema' },
      wantedEndpoints: ['wanted'],
      mongoose: '',
      express: () => 'express',
      expectedErrorMessage: 'mongoose is not defined',
    },
    'when no express has been given': {
      name: 'name',
      schema: { scema: 'skema' },
      wantedEndpoints: ['wanted'],
      mongoose: { mongoose: 'mongoose' },
      express: '',
      expectedErrorMessage: 'express is not defined',
    },
    'when type of name is wrong': {
      name: { },
      schema: { scema: 'skema' },
      wantedEndpoints: ['wanted'],
      mongoose: { mongoose: 'mongoose' },
      express: () => 'express',
      expectedErrorMessage: 'Type of name is wrong, it should be string',
    },
    'when schema of name is wrong': {
      name: 'name',
      schema: 'skeema',
      wantedEndpoints: ['wanted'],
      mongoose: { mongoose: 'mongoose' },
      express: () => 'express',
      expectedErrorMessage: 'Type of schema is wrong, it should be object',
    },
    'when type of wantedEndpoints is wrong': {
      name: 'name',
      schema: { scema: 'skema' },
      wantedEndpoints: 'wanted',
      mongoose: { mongoose: 'mongoose' },
      express: () => 'express',
      expectedErrorMessage: 'Type of wantedEndpoints is wrong, it should be array',
    },
    'when type of mongoose is wrong': {
      name: 'name',
      schema: { scema: 'skema' },
      wantedEndpoints: ['wanted'],
      mongoose: 'mongoose',
      express: () => 'express',
      expectedErrorMessage: 'Type of mongoose is wrong, it should be object',
    },
    'when type of express is wrong': {
      name: 'name',
      schema: { scema: 'skema' },
      wantedEndpoints: ['wanted'],
      mongoose: { mongoose: 'mongoose' },
      express: 'express',
      expectedErrorMessage: 'Type of express is wrong, it should be function',
    },
  }))('should throw an error when %s', (testname, { name, schema, wantedEndpoints, mongoose, express, expectedErrorMessage }) => {
    expect(() => simpleMongoExpressEndpoints(name, schema, wantedEndpoints, mongoose, express)).toThrow(expectedErrorMessage);
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
