const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  idUser: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: Number, required: true },
  totalSum: { type: Number, required: true },
  timeCart: { type: String, required: true },
  listProduct: { type: Array, required: true },
  payment: { type: String, required: true },
  success: { type: Boolean, required: true },
  statusOrder: { type: Boolean, required: true }
});

module.exports = mongoose.model('Cart', CartSchema);