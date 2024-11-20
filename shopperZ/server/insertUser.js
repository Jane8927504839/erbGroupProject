const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); 

// 連接到 MongoDB
mongoose.connect('mongodb://localhost:27017/kitchen-shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB 連接成功');
  return insertUser();
}).catch(err => {
  console.error('MongoDB 連接失敗:', err);
});

// // 定義用戶模型
// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   role: {
//     type: String,
//     enum: ['user', 'admin'],
//     default: 'user'
//   }
// });

// const User = mongoose.model('User', userSchema);

// 插入用戶
async function insertUser() {
  try {
    const username = 'testuser';
    const email = 'testuser@example.com';
    const password = 'password123';

    // 檢查用戶名和電子郵件的唯一性
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      console.log('用戶名或電子郵件已存在');
      return;
    }

    // 哈希密碼
    const hashedPassword = await bcrypt.hash(password, 10);

    // 創建用戶
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    // 保存用戶
    await user.save();
    console.log('用戶插入成功:', user);
  } catch (error) {
    console.error('插入用戶失敗:', error);
  } finally {
    mongoose.connection.close();
  }
}