const passwordValidator = require("password-validator");

const schema = new passwordValidator();
schema
  .is()
  .min(6)
  .is()
  .max(20)
  .has()
  .lowercase()
  .has()
  .digits(3)
  .has()
  .not()
  .spaces()
  .has()
  .symbols(1);

module.exports = schema;
