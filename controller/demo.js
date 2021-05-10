// users model
const Users = require('../models/user.model');

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
    const newUser = new Users(req.body);
  
    try {
      const user = await newUser.save();
      if(!user) throw Error('Something went wrong while saving user');
      res.status(200).json(user);
    } catch(err) {
      res.status(400).json({ message: err });
    }
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
  },
}