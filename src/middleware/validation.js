const { body, validationResult } = require('express-validator');

const productValidationRules = [
  body('name').exists().withMessage('name is required').isString(),
  body('price').exists().withMessage('price is required').isFloat(),
  body('category').exists().withMessage('category is required').isString()
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Validation Error');
    err.status = 400;
    err.details = errors.array();
    return next(err);
  }
  next();
};

module.exports = { productValidationRules, validate };
