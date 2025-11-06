const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Silla', 'Mesa', 'Inflable'], required: true },
  description: { type: String },
  pricePerDay: { type: Number, default: 0 },
  stock: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', ItemSchema);