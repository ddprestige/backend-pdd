const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const router = express.Router();

// Secret Key
const JWT_SECRET = process.env.JWT_SECRET;

// Register Admin (Run once or secure this route)
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const admin = new Admin({ email, password: hash });
  await admin.save();
  res.json({ message: 'Admin created' });
});

// ✅ Login Admin
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1h' });

  // ✅ Set HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'strict',
    maxAge: 3600000, // 1 hour
  });

  res.json({ message: 'Login successful' });
});

// ✅ Auth check route (/api/auth/me)
router.get('/me', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ id: decoded.id }); // or any user info you want to return
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// ✅ Logout route
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
