const { nanoid } = require("nanoid");

const generateShortId = () => {
  return nanoid(6);
};

module.exports = generateShortId;
