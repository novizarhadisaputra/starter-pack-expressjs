const { check, body } = require('express-validator');

exports.createUserRequest = [
    body('email').not().isEmpty().withMessage('required'),
    body('email').isEmail().withMessage('email'),
    body('name').not().isEmpty().withMessage('required'),
    body('sex').not().isEmpty().withMessage('required')
];