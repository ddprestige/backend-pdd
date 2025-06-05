import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productroutes.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authroutes.js';
import notifyRoutes from './routes/notify.js'
import contactRoute from './routes/contact.js'

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/notify', notifyRoutes)
app.use('/api/contact', contactRoute)

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
