const mongoose = require('mongoose');
const Product = require('./models/Product'); // 假設 Product 模型定義在 Product.js 文件中

mongoose.set('strictQuery', true);

// 連接到 MongoDB
mongoose.connect('mongodb://localhost:27017/kitchen-shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB 連接成功');
  return queryProductById('673d52b194a982542ccb9070');
}).catch(err => {
  console.error('MongoDB 連接失敗:', err);
});

// 查詢產品信息
async function queryProductById(productId) {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      console.log('產品未找到');
    } else {
      console.log('產品信息:', product);
    }
  } catch (error) {
    console.error('查詢產品失敗:', error);
  } finally {
    mongoose.connection.close();
  }
}