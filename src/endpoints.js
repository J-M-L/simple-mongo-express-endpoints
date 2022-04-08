const ValidationError = require('./ValidationError');

const validateIdOrThrow = (id, isValidObjectId) => {
  if (!id) throw new ValidationError('Id is not defined');
  if (!isValidObjectId(id)) throw new ValidationError('Invalid ObjectId');
};

const sanitize = (id) => id.replace(/\$/g, '');

const endpoints = {
  getAll: {
    name: 'getAll',
    handler: (Model) => async (req, res) => {
      try {
        const items = await Model.find({}).lean();
        return res.json(items);
      } catch (err) {
        if (err instanceof ValidationError || err.name === 'ValidationError') {
          return res.status(400).json({ name: err.name, message: err.message });
        }
        return res.status(500).json('Unexpected error occurred, please try again');
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

        validateIdOrThrow(id, Model.isValidObjectId);

        const items = await Model.findById(id).lean();
        return res.json(items);
      } catch (err) {
        if (err instanceof ValidationError || err.name === 'ValidationError') {
          return res.status(400).json({ name: err.name, message: err.message });
        }
        return res.status(500).json('Unexpected error occurred, please try again');
      }
    },
    pathExtension: '/:id',
    type: 'get',
  },
  add: {
    name: 'add',
    handler: (Model) => async (req, res) => {
      try {
        const { body } = req;
        const newItem = new Model(body);

        const savedItem = await newItem.save();
        return res.status(201).json(savedItem);
      } catch (err) {
        if (err instanceof ValidationError || err.name === 'ValidationError') {
          return res.status(400).json({ name: err.name, message: err.message });
        }
        return res.status(500).json('Unexpected error occurred, please try again');
      }
    },
    pathExtension: '/',
    type: 'post',
  },
  update: {
    name: 'update',
    handler: (Model) => async (req, res) => {
      try {
        const id = sanitize(req.params.id);
        const { body } = req;

        validateIdOrThrow(id, Model.isValidObjectId);

        const item = await Model.findByIdAndUpdate(id, body);

        await item.save();
        return res.json(item);
      } catch (err) {
        if (err instanceof ValidationError || err.name === 'ValidationError') {
          return res.status(400).json({ name: err.name, message: err.message });
        }
        return res.status(500).json('Unexpected error occurred, please try again');
      }
    },
    pathExtension: '/:id',
    type: 'patch',
  },
  replace: {
    name: 'replace',
    handler: (Model) => async (req, res) => {
      try {
        const id = sanitize(req.params.id);
        const { body } = req;

        validateIdOrThrow(id, Model.isValidObjectId);

        const item = await Model.findOneAndReplace({ id }, body);

        await item.save();
        return res.json(item);
      } catch (err) {
        if (err instanceof ValidationError || err.name === 'ValidationError') {
          return res.status(400).json({ name: err.name, message: err.message });
        }
        return res.status(500).json('Unexpected error occurred, please try again');
      }
    },
    pathExtension: '/:id',
    type: 'put',
  },
  delete: {
    name: 'delete',
    handler: (Model) => async (req, res) => {
      try {
        const id = sanitize(req.params.id);

        validateIdOrThrow(id, Model.isValidObjectId);

        await Model.findByIdAndDelete(id);
        return res.status(204).end();
      } catch (err) {
        if (err instanceof ValidationError || err.name === 'ValidationError') {
          return res.status(400).json({ name: err.name, message: err.message });
        }
        return res.status(500).json('Unexpected error occurred, please try again');
      }
    },
    pathExtension: '/:id',
    type: 'delete',
  },
};

module.exports = endpoints;
