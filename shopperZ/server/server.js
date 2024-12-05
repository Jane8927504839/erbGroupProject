const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// 导入路由
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();
const app = express();

// 中间件
app.use(cors({
  // origin: process.env.CORS_ORIGIN || 'http://frontend:8080',
  credentials: true
}));
app.use(express.json());

// 配置路由
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
 });

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: '服务器错误',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 数据库连接
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB 连接成功');
  const PORT = process.env.PORT || 5003; // 更改為其他未被佔用的端口號
  app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB 连接错误:', err);
  process.exit(1);
});

// 处理未捕获的异常
process.on('unhandledRejection', (err) => {
  console.error('未处理的 Promise 拒绝:', err);
  process.exit(1);
});

module.exports = app;