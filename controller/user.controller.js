// users model
const Users = require('../models/user.model');
var jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const { registerValidation } = require("../middlewares/validation");

module.exports = {
  AllUser: async (req, res) => {
    try {
      const users = await Users.find();
      if(!users) throw Error('No Items');
      res.status(200).json(users);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  RegisterUser: async (req, res) => {
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new Users({
      username: req.body.username,
      password: hashPass,
      email: req.body.email
    });

    try {
      const user = await newUser.save();
      if(!user) throw Error('Something went wrong while saving user');
      res.status(200).json(user);
    } catch(err) {
      res.status(400).json({ message: err });
    }
  },
  LoginUser: async (req, res) => {
    const user = await Users.findOne({ username: req.body.username });
    if(!user) return res.status(400).json({ message: "Authentication failed" });

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password!');

    //Create and assign token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('Authorization', token).send(token);
  
  },
  DeleteUser: async (req, res) => {
    try {
      const user = await Users.findByIdAndDelete(req.params.id);
      if(!user) throw Error('No user found!');
      res.status(200).json({ success: true })
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  UpdateUser: async (req, res) => {
    try {
      const user = await Users.findByIdAndUpdate(req.params.id, req.body);
      if(!user) throw Error('Something went wrong while updating user');
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  FindUser: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id);
      if(!user) throw Error('No Items');
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
}