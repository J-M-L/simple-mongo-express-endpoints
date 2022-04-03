/* eslint-disable object-curly-newline */
/* eslint-disable global-require */
let mongoose;
let createModel;

describe('createModel', () => {
  beforeEach(() => {
    jest.resetModules();
    mongoose = require('mongoose');
    createModel = require('../../src/createModel');
  });

  it('should create model with proper values', () => {
    const schema = {
      name: String,
      number: {
        type: Number,
        required: [true, 'Give number'],
      },
      something: [],
    };

    const MongooseModel = createModel('nimi', schema, mongoose);

    const modelName = 'somethingname';
    const modelSomething = ['first', 'second'];
    const newModel = new MongooseModel({
      name: modelName,
      banana: 'dffff',
      number: 2,
      something: ['first', 'second'],
    });

    const error = newModel.validateSync();
    expect(error).toBe(undefined);
    expect(newModel.name).toBe(modelName);
    expect(newModel.banana).toBe(undefined);
    expect(newModel.something).toEqual(modelSomething);
    expect(typeof newModel.save).toBe('function');
  });

  it('should give an error on model.validate', () => {
    const schema = {
      name: String,
      number: {
        type: Number,
        required: [true, 'Give number'],
      },
    };

    const MongooseModel = createModel('nimi', schema, mongoose);

    const modelName = 'somethingname';
    const newModel = new MongooseModel({
      name: modelName,
      something: ['first', 'second'],
    });

    const error = newModel.validateSync();
    expect(typeof error).toBe('object');
    expect(error.message).toBe('nimi validation failed: number: Give number');
  });
});
