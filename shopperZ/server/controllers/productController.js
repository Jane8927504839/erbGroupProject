const Product = require('../models/Product');
const { validationResult } = require('express-validator');

// 獲取所有產品
exports.getAllProducts = async (req, res) => {
  try {
    const { category, sort, search } = req.query;
    
    // 構建查詢條件
    const query = {};
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // 排序選項
    const sortOptions = {};
    if (sort === 'price-asc') sortOptions.price = 1;
    if (sort === 'price-desc') sortOptions.price = -1;
    if (sort === 'newest') sortOptions.createdAt = -1;
    
    // 移除分頁限制，獲取所有產品
    const products = await Product.find(query).sort(sortOptions);
    
    res.json({
      products,
      total: products.length
    });
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 獲取單個產品
exports.getProduct = async (req, res) => {
  try {
    // const product = await Product.findById(req.params.id)
    //   .populate('ratings.user', 'username');
      const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: '產品未找到' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 創建產品
exports.createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // 驗證用戶權限
    if (req.userData.role !== 'admin') {
      return res.status(403).json({ message: '沒有權限執行此操作' });
    }

    const product = new Product(req.body);
    await product.save();
    
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 更新產品
exports.updateProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (req.userData.role !== 'admin') {
      return res.status(403).json({ message: '沒有權限執行此操作' });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: '產品未找到' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 刪除產品
exports.deleteProduct = async (req, res) => {
  try {
    if (req.userData.role !== 'admin') {
      return res.status(403).json({ message: '沒有權限執行此操作' });
    }

    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: '產品未找到' });
    }

    res.json({ message: '產品已刪除' });
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 添加產品評價
exports.addRating = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: '產品未找到' });
    }

    // 檢查用戶是否已經評價過
    const existingRating = product.ratings.find(
      r => r.user.toString() === req.userData.userId
    );

    if (existingRating) {
      return res.status(400).json({ message: '您已經評價過此產品' });
    }

    product.ratings.push({
      user: req.userData.userId,
      rating,
      comment
    });

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤' });
  }
};