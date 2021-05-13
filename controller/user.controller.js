// users model
const Users = require('../models/user.model');
const Role = require("../models/role.model");
var jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const { generateToken } = require("../middlewares/authJwt");

const { registerValidation, loginValidation } = require("../middlewares/validation");

module.exports = {
  AllUser: async (req, res) => {
    try {
      const users = await Users.find();
      if(!users) return res.status(400).json({ message: "No item!" });
      res.status(200).json(users);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  RegisterUser: async (req, res) => {
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).json({ message: error.details[0].message });

    const email = await Users.findOne({ email: req.body.email });
    if(email) return res.status(400).json({ message: "Email already exists" });

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new Users({
      email: req.body.email,
      password: hashPass,
      fullname: req.body.fullname,
      role: Role.User
    });

    try {
      const user = await newUser.save();
      if(!user) return res.status(400).json({ message: "Something went wrong while saving user" });
      res.status(200).json({ message: "Sign up Successfully." });
    } catch(err) {
      res.status(400).json({ message: err });
    }
  },
  LoginUser: async (req, res) => {
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).json({ message: error.details[0].message });

    const user = await Users.findOne({ email: req.body.email });
    if(!user) return res.status(400).json({ message: "Authentication failed" });

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).json({ message: "Invalid password!" });

    const accessToken = await generateToken(user, process.env.TOKEN_SECRET, process.env.TOKEN_ACCESS_TIME);

    const refreshToken = await generateToken(user, process.env.TOKEN_REFRESH, process.env.TOKEN_REFRESH_TIME);
  
    res.status(200).json({ 
      message: "Login Successfully.",
      accessToken, 
      refreshToken
    });

  },
  DeleteUser: async (req, res) => {
    try {
      const user = await Users.findByIdAndDelete(req.params.id);
      if(!user) return res.status(400).json({ message: "No user found!" });
      res.status(200).json({ success: true })
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  UpdateUser: async (req, res) => {
    try {
      const user = await Users.findByIdAndUpdate(req.params.id, req.body);
      if(!user) return res.status(400).json({ message: "Something went wrong while updating user" });
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  FindUser: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id);
      if(!user) return res.status(400).json({ message: "User not found!" });
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  RenewAccessToken: async (req, res) => {
    const refreshToken = req.body.token;
    if(!refreshToken || !refreshTokens.includes(refreshTokens)) {
      return res.status(403).json({ message: "User not authenticated." });
    }

    jwt.verify(refreshToken, process.env.TOKEN_REFRESH, (err, user) => {
      if(!err) {
        const accessToken = jwt.sign(user, process.env.TOKEN_REFRESH, { expiresIn: process.env.TOKEN_REFRESH_TIME });
        return res.status(201).json({ accessToken });
      }
      else {
        return res.status(403).json({ message: "User not authenticated." });
      }
    })
  }
}

