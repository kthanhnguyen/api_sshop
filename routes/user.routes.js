const express = require('express');
const router = express.Router();
const  { verifyToken } = require("../middlewares/authJwt");

const UserControllers = require('../controller/user.controller');

router.get('/all', verifyToken, UserControllers.AllUser);

router.post('/register', UserControllers.RegisterUser);

router.post('/login', UserControllers.LoginUser);

router.delete('/deleteUser/:id', UserControllers.DeleteUser);

router.patch('/updateUser/:id', UserControllers.UpdateUser);

router.get('/findUser/:id', verifyToken, UserControllers.FindUser);

router.post('/renewAccessToken', UserControllers.RenewAccessToken);

module.exports = router;