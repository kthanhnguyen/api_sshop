const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductTypeSchema = new Schema({
  typeName: { type: String, required: true },
  typeImg: { type: String, default: "/files/type_dummny.jpg" }
});

module.exports = mongoose.model('ProductTypes', ProductTypeSchema);