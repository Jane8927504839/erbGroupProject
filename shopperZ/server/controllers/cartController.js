const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
  try {
    const { productId, name, price, image, size, quantity = 1 } = req.body;
    const userId = req.userData.userId;

    // 檢查產品是否存在
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: '產品不存在' });
    }

    // 檢查庫存
    const variant = product.variants.find(v => v.size === size);
    if (!variant || variant.stock < quantity) {
      return res.status(400).json({ message: '庫存不足' });
    }

    // 獲取或創建購物車
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // 檢查購物車是否已有該商品
    const existingItem = cart.items.find(
      item => item.productId.toString() === productId && item.size === size
    );

    if (existingItem) {
      // 更新數量
      existingItem.quantity += quantity;
    } else {
      // 添加新商品，包含完整的產品信息
      cart.items.push({
        productId,
        name,
        price,
        image,
        size,
        quantity
      });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userData.userId })
      .populate('items.productId');
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤' });
  }
}; 