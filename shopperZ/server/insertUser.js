const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); 

// 連接到 MongoDB
// mongoose.connect('mongodb://localhost:27017/kitchen-shop', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('MongoDB 連接成功');
//   return insertAdminUser();
// }).catch(err => {
//   console.error('MongoDB 連接失敗:', err);
// });

mongoose.connect('mongodb://mongodb:27017/kitchen-shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB 連接成功');
  return insertAdminUser();
}).catch(err => {
  console.error('MongoDB 連接失敗:', err);
});

// 插入管理員用戶
async function insertAdminUser() {
  try {
    const adminData = {
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'  // 設置為管理員角色
    };

    // 檢查用戶名和電子郵件的唯一性
    const existingUser = await User.findOne({ 
      $or: [
        { username: adminData.username }, 
        { email: adminData.email }
      ] 
    });

    if (existingUser) {
      console.log('管理員用戶已存在');
      return;
    }

    // 哈希密碼
    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    // 創建管理員用戶
    const adminUser = new User({
      username: adminData.username,
      email: adminData.email,
      password: hashedPassword,
      role: adminData.role,
      addresses: [],  // 初始化空地址列表
      phone: ''      // 初始化空電話號碼
    });

    // 保存管理員用戶
    await adminUser.save();
    console.log('管理員用戶創建成功:', {
      username: adminUser.username,
      email: adminUser.email,
      role: adminUser.role
    });
  } catch (error) {
    console.error('創建管理員用戶失敗:', error);
  } finally {
    mongoose.connection.close();
  }
}
