const createModel = require('./createModel');

const SMEE = (name, schema, mongoose) => {
  const model = createModel(name, schema, mongoose);

  return {
    model,
  };
};

module.exports = {
  SMEE,
};
