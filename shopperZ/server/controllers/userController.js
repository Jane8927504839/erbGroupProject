const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {body, validationResult } = require('express-validator');

exports.register = [
    // 驗證用戶名
    body('username')
    .isLength({ min: 5 })
    .withMessage('用戶名至少為 5 個字'),

    // 驗證密碼
    body('password')
      .isLength({ min: 10 })
      .withMessage('密碼至少為 10 個字符')
      .matches(/\d/)
      .withMessage('密碼必須包含數字')
      .matches(/[a-zA-Z]/)
      .withMessage('密碼必須包含字母'),
    
    async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    // 檢查用戶是否已存在
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ message: '用戶已存在' });
    }

    // 創建新用戶
    user = new User({
      username,
      email,
      password
    });

    await user.save();

    // // 生成JWT
    // const token = jwt.sign(
    //   { userId: user._id, role: user.role },
    //   process.env.JWT_SECRET,
    //   { expiresIn: '24h' }
    // );

    res.status(201).json({
      // token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        // role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤' });
  }
}];

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 查找用戶
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: '用戶名或密碼錯誤' });
    }

    // 驗證密碼
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: '用戶名或密碼錯誤' });
    }

    // 生成JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤' });
  }
};