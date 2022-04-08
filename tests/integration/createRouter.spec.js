/* eslint-disable object-curly-newline */
/* eslint-disable global-require */
let express;
let createRouter;
let endpoints;

describe('createRouter', () => {
  beforeEach(() => {
    jest.resetModules();
    createRouter = require('../../src/createRouter');
    endpoints = require('../../src/endpoints');

    express = require('express');
  });

  it('should return router filled with wanted endpoints (one endpoint)', () => {
    const router = createRouter(['getAll'], express, () => 'model');

    expect(router.stack.length).toBe(1);
    expect(router.stack[0].route.stack[0].handle.toString()).toBe(endpoints.getAll.handler({}).toString());
  });
  it('should return router filled with wanted endpoints (multiple endpoints)', () => {
    const router = createRouter(['getAll', 'get', 'add'], express, () => 'model');

    expect(router.stack.length).toBe(3);
    expect(router.stack.map((st) => st.route.stack[0].method).sort()).toEqual(['get', 'get', 'post']);
  });
});
