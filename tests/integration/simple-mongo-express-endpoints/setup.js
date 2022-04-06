const http = require('http');
const supertest = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const SMEE = require('../../../src/index');

const app = express();
app.use(express.json());

app.use('/api/test', SMEE(
  'test',
  { name: String, otherValue: Number },
  mongoose,
  ['get', 'getAll', 'add', 'update', 'replace', 'delete'],
  express,
).router);

app.use('/api/validation', SMEE(
  'other',
  { name: String, otherValue: { type: Number, min: 1, max: 2 } },
  mongoose,
  ['get', 'getAll', 'add', 'update', 'replace', 'delete'],
  express,
).router);

const server = http.createServer(app);

const mongooseConnect = () => {
  mongoose.Promise = global.Promise;
  return mongoose.connect('mongodb://localhost:27017/SMEE', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Mongoose connected');
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

const mongooseDisconnect = () => Promise.all([
  mongoose.connection.close(),
  mongoose.disconnect(),
]);

const getApiHandler = () => supertest(app);

const clearMongoDB = async () => {
  const { db } = mongoose.connection;
  const collections = await db.listCollections().toArray();
  return Promise.all(collections.map((collection) => db.dropCollection(collection.name)));
};

const closeServer = () => new Promise((res) => {
  console.log('Server shut down');
  server.close();
  mongooseDisconnect().then(res());
});

const startServer = () => new Promise((res) => {
  server.listen(3002, async () => {
    await mongooseConnect();
    console.log('Server is up');
    res();
  });
});

module.exports = {
  getApiHandler,
  closeServer,
  mongooseConnect,
  mongooseDisconnect,
  startServer,
  clearMongoDB,
};
