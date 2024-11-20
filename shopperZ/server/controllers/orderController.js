const Order = require('../models/Order');
const Product = require('../models/Product');
const { validationResult } = require('express-validator');

exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    
    // 驗證庫存並計算總價
    let totalAmount = 0;
    for (let item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `產品 ${item.product} 未找到` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `產品 ${product.name} 庫存不足` });
      }
      totalAmount += product.price * item.quantity;
      
      // 更新庫存
      product.stock -= item.quantity;
      await product.save();
    }

    const order = new Order({
      user: req.userData.userId,
      items,
      totalAmount,
      shippingAddress
    });

    await order.save();
    
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userData.userId })
      .populate('items.product')
      .sort('-createdAt');
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    if (req.userData.role !== 'admin') {
      return res.status(403).json({ message: '沒有權限執行此操作' });
    }

    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: '訂單未找到' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤' });
  }
};