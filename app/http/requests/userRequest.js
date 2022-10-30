const { check, body } = require('express-validator');

exports.createUserRequest = [
    body('name').not().isEmpty(),
    body('sex').not().isEmpty()
];