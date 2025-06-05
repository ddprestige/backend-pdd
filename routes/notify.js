import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/', async (req, res) => {
  const { productId, productName, name, phone, email } = req.body;

  if (!name || !phone || !productName) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NOTIFY_EMAIL,
      pass: process.env.NOTIFY_EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.NOTIFY_EMAIL,
    to: process.env.NOTIFY_EMAIL_RECEIVER,
    subject: `New Booking Interest – ${productName}`,
    text: `
📢 New Booking Request

🪑 Product: ${productName}
🆔 Product ID: ${productId || 'N/A'}

👤 Name: ${name}
📞 Phone: ${phone}
📧 Email: ${email || 'Not provided'}

Please follow up with the customer as soon as possible.
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ message: 'Failed to send notification' });
  }
});

export default router;
