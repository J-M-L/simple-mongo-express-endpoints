const validateInputOrThrow = (name, input, type = '') => {
  if (!input) throw new Error(`${name} is not defined`);
  // eslint-disable-next-line valid-typeof
  if ((type === 'array' && !Array.isArray(input)) || (type !== 'array' && typeof input !== type)) {
    throw new Error(`Type of ${name} is wrong, it should be ${type}`);
  }
};

module.exports = {
  validateInputOrThrow,
};
