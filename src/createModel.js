const { validateInputOrThrow } = require('./validate');

const createModel = (name, schema, mongoose) => {
  validateInputOrThrow('name', name, 'string');
  validateInputOrThrow('schema', schema, 'object');
  validateInputOrThrow('mongoose', mongoose, 'object');

  const mongooseSchema = new mongoose.Schema(schema);
  mongooseSchema.statics.isValidObjectId = mongoose.Types.ObjectId.isValid;
  return mongoose.model(name, mongooseSchema);
};

module.exports = createModel;
