import { body } from 'express-validator';

const createUserValidation = [
  body('empId')
    .trim()
    .notEmpty()
    .withMessage('Employee ID is required'),

  body('email')
    .isEmail()
    .withMessage('Invalid email')
];