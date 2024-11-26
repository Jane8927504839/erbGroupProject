const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body;
    
    // 驗證送貨地址
    if (!shippingAddress || !shippingAddress.street || !shippingAddress.city || 
        !shippingAddress.state || !shippingAddress.zipCode) {
      return res.status(400).json({ message: '送貨地址信息不完整' });
    }

    // 驗證訂單項目
    if (!items || items.length === 0) {
      return res.status(400).json({ message: '訂單項目不能為空' });
    }

    // 驗證總金額
    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ message: '訂單金額無效' });
    }
    
    const order = new Order({
      userId: req.userData.userId,
      items: items.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        size: item.size,
        quantity: item.quantity,
        image: item.image
      })),
      totalAmount,
      shippingAddress: {
        street: shippingAddress.street,
        city: shippingAddress.city,
        state: shippingAddress.state,
        zipCode: shippingAddress.zipCode
      },
      status: 'pending',
      createdAt: new Date()
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('創建訂單失敗:', error);
    res.status(500).json({ message: '創建訂單失敗' });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userData.userId })
      .sort({ createdAt: -1 });
    
    // 格式化訂單數據
    const formattedOrders = orders.map(order => ({
      _id: order._id,
      items: order.items,
      totalAmount: order.totalAmount,
      shippingAddress: {
        street: order.shippingAddress.street,
        city: order.shippingAddress.city,
        state: order.shippingAddress.state,
        zipCode: order.shippingAddress.zipCode
      },
      status: order.status,
      createdAt: order.createdAt
    }));
    
    res.json(formattedOrders);
  } catch (error) {
    console.error('獲取訂單失敗:', error);
    res.status(500).json({ message: '獲取訂單失敗' });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.userData.userId
    });

    if (!order) {
      return res.status(404).json({ message: '訂單不存在' });
    }

    // 只允許刪除 pending 狀態的訂單
    if (order.status !== 'pending') {
      return res.status(400).json({ message: '只能刪除待處理的訂單' });
    }

    await Order.findByIdAndDelete(order._id);
    res.json({ message: '訂單已刪除' });
  } catch (error) {
    console.error('刪除訂單失敗:', error);
    res.status(500).json({ message: '刪除訂單失敗' });
  }
};