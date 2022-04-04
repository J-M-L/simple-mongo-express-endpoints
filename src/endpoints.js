const sanitize = require('mongo-sanitize');

const validateIdOrThrow = (id) => {
  if (!id) throw new Error('Id is not defined');
};

const endpoints = {
  getAll: {
    name: 'getAll',
    handler: (Model) => async (req, res) => {
      try {
        const items = await Model.find({}).lean();
        return res.json(items);
      } catch (err) {
        console.log(err);
        return res.status(500).send();
      }
    },
    pathExtension: '/',
    type: 'get',
  },
  get: {
    name: 'get',
    handler: (Model) => async (req, res) => {
      try {
        const id = sanitize(req.params.id);
        validateIdOrThrow(id);

        const items = await Model.findById(id).lean();
        return res.json(items);
      } catch (err) {
        return res.status(400).json(err.message);
      }
    },
    pathExtension: '/:id',
    type: 'get',
  },
  add: {
    name: 'add',
    handler: (Model) => async (req, res) => {
      const { body } = req;
      const newItem = new Model(body);

      const errors = newItem.validateSync();
      if (errors) throw new Error('Invalid body');

      const savedItem = await newItem.save();
      return res.status(201).json(savedItem);
    },
    pathExtension: '/',
    type: 'post',
  },
  update: {
    name: 'update',
    handler: (Model) => async (req, res) => {
      const id = sanitize(req.params.id);
      const { body } = req;

      validateIdOrThrow(id);

      const item = await Model.findByIdAndUpdate(id, body);

      const errors = item.validateSync();
      if (errors) throw new Error('Invalid body');

      await item.save();
      return res.json(item);
    },
    pathExtension: '/:id',
    type: 'patch',
  },
  replace: {
    name: 'replace',
    handler: (Model) => async (req, res) => {
      const id = sanitize(req.params.id);
      const { body } = req;

      validateIdOrThrow(id);

      const item = await Model.findOneAndReplace(id, body);

      const errors = item.validateSync();
      if (errors) throw new Error('Invalid body');

      await item.save();
      return res.json(item);
    },
    pathExtension: '/:id',
    type: 'put',
  },
  delete: {
    name: 'delete',
    handler: (Model) => async (req, res) => {
      const id = sanitize(req.params.id);
      await Model.findByIdAndDelete(id);
      return res.status(204).end();
    },
    pathExtension: '/:id',
    type: 'delete',
  },
};

module.exports = endpoints;
