const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {body, validationResult } = require('express-validator');

exports.register = [
  body('username')
    .isLength({ min: 5 })
    .withMessage('用戶名至少為 5 個字'),
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

      let user = await User.findOne({ $or: [{ email }, { username }] });
      if (user) {
        return res.status(400).json({ message: '用戶已存在' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({
        username,
        email,
        password: hashedPassword,
        addresses: [],
        phone: ''
      });

      await user.save();
      res.status(201).json({ message: '註冊成功' });
    } catch (error) {
      res.status(500).json({ message: '伺服器錯誤' });
    }
  }
];

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: '用戶名錯誤' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: '密碼錯誤' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userData.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: '用戶不存在' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { phone, addresses } = req.body;
    
    // 驗證地址格式
    if (addresses) {
      for (let address of addresses) {
        if (!address.street || !address.city || !address.state || !address.zipCode) {
          return res.status(400).json({ message: '地址信息不完整' });
        }
      }
    }

    const user = await User.findByIdAndUpdate(
      req.userData.userId,
      { phone, addresses },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 更新密碼
exports.updatePassword = [
  body('currentPassword').notEmpty().withMessage('請輸入當前密碼'),
  body('newPassword')
    .isLength({ min: 10 })
    .withMessage('新密碼至少為 10 個字符')
    .matches(/\d/)
    .withMessage('新密碼必須包含數字')
    .matches(/[a-zA-Z]/)
    .withMessage('新密碼必須包含字母'),
    
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { currentPassword, newPassword } = req.body;
      
      // 獲取用戶
      const user = await User.findById(req.userData.userId);
      
      // 驗證當前密碼
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: '當前密碼錯誤' });
      }
      
      // 加密新密碼
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      // 更新密碼
      user.password = hashedPassword;
      await user.save();
      
      res.json({ message: '密碼更新成功' });
    } catch (error) {
      res.status(500).json({ message: '伺服器錯誤' });
    }
  }
];

