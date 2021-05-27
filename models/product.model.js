const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: Array, required: true },
  rating: { type: Number, default: 0 },
  sex: { type: String, required: true },
  color: { type: Array, required: true },
  poster: { type: Array, required: true },
  description: { type: String, required: true },
  collections: { type: String, required: true }, //Jordan, Air Max
  productType: { type: String, required: true }, //Nike, Puma,...
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Products', ProductSchema);