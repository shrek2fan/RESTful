const { body, validationResult } = require('express-validator');

exports.validateProduct = [
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),
  body('category').isString().notEmpty().withMessage('Category is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error('Validation failed');
      err.status = 400;
      err.details = errors.array();
      return next(err);
    }
    next();
  }
];
