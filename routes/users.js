const express = require('express');
const router = express.Router();
const userController = require('../app/http/controllers/userController');
const authenticateToken = require('../app/http/middlewares/authenticateToken');
const { createUserRequest } = require('../app/http/requests/userRequest');

router.get('/', [], userController.index);
router.post('/', [createUserRequest], userController.store);

module.exports = router;
