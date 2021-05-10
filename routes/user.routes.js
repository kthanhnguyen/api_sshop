const express = require('express');
const router = express.Router();

const authJwt = require('../middlewares/authJwt')

const UserControllers = require('../controller/user.controller');

router.post('/all', UserControllers.AllUser);

router.post('/', UserControllers.RegisterUser);

router.delete('/:id', UserControllers.DeleteUser);

router.patch('/:id', UserControllers.UpdateUser);

router.get('/:id', UserControllers.FindUser);

module.exports = router;