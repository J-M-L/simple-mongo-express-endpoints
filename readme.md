# Simple Mongo Express Endpoints
This is:
- Made to ease the prototyping of the backend application
- Super easy way to create simple backend with a Mongo database
- Package with zero production dependencies
- Package with some kind of mongoose sanitization

Currently this only allows the use of pre-defined endpoints (listed at the end), but maybe in a near future there's a possibility to add endpoints, and maybe some validators too.

## The guide

Install this package with
```sh
npm install @j-m-l/simple-mongo-express-endpoints
```

Import it to the project with
```js
const SMEE = require('@j-m-l/simple-mongo-express-endpoints');
```

Call it with following values (existing endpoints listed below)
```js
const endpoint = SMEE(nameOfTheMongoModel, mongooseSchema, wantedEndpoints, mongooseInstance, expressInstance);
```

Example code
```js
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// testEndpoint = { Model: ..., Router: ... };
const testEndpoint = SMEE('testEndpoint', { name: String, description: 'special' }, ['get', 'add'], mongoose, express);

app.use(express.json());
app.use('/api/test-endpoint', testEndpoint.Router);
// Now you have two endpoints defined 
// GET <>/api/test-endpoint/:id
// POST <>/api/test-endpoint/
// which both are connected to the MongoDB
// Remember to initialize Mongoose and Express

```

Available endpoints are: 
- get (Get by id /api/something/:id) http get
- getAll (Get all entried from that collection) http get
- add (Add new entry to the collection) http post
- update (Partially update the entry from collection) http patch
- replace (Replace the entry from the collection) http put
- delete (Delete entry from the collection) http delete

To select these to the wantedEndpoints, just add the wanted endpoint names to an array i.e., ['get', 'getAll', 'add', 'update', 'replace', 'delete']

