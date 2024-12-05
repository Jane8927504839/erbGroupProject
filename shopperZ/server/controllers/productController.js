const Product = require('../models/Product');

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

// 添加健康檢查端點
exports.healthCheck = async (req, res) => {
  try {
    // 可以添加數據庫連接測試
    await Product.findOne();
    res.status(200).json({ 
      status: 'success',
      message: '服務器運行正常',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({ 
      status: 'error',
      message: '服務器異常',
      error: error.message 
    });
  }
};
