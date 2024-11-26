const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  }
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '商品名称必填'],
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['炊具', '刀具', '餐具', '收纳', '小电器']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: String,
  images: [String],
  variants: [variantSchema]
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;