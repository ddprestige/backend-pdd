// routes/contact.js or contact.ts
import express from 'express'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

router.post('/', async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NOTIFY_EMAIL,
      pass: process.env.NOTIFY_EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.NOTIFY_EMAIL_RECEIVER,
    subject: 'New Contact Form Submission - Prestige Dream Decor',
    text: `You've received a new message:\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
  }

  try {
    await transporter.sendMail(mailOptions)
    res.status(200).json({ message: 'Your message has been sent successfully!' })
  } catch (err) {
    console.error('Email sending failed:', err)
    res.status(500).json({ message: 'Something went wrong. Please try again later.' })
  }
})

export default router
