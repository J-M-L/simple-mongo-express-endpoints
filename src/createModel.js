const createModel = (name, schema, mongoose) => {
  if (!name) throw new Error('Name is not defined');
  if (!schema) throw new Error('Schema is not defined');
  if (!mongoose) throw new Error('Mongoose is not defined');

  const mongooseSchema = new mongoose.Schema(schema);
  mongooseSchema.statics.isValidObjectId = mongoose.Types.ObjectId.isValid;
  return mongoose.model(name, mongooseSchema);
};

module.exports = createModel;
