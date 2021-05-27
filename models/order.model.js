const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ItemSchema = new Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true }
});

const OrderSchema = new Schema({
  idUser: { type: String, required: true },
  billingAddress: { 
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true }
  },
  grandTotal: { type: Number, required: true },
  shippingMethod: { type: String, default: 'free' },
  paymentMethod: { type: String, required: true },
  items: [ItemSchema],
  sucess: { type: Boolean, required: true },
  statusOrder: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Orders', OrderSchema);