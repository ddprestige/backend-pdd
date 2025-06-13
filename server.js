import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productroutes.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authroutes.js';
import notifyRoutes from './routes/notify.js';
import contactRoute from './routes/contact.js';

const app = express();

dotenv.config();
connectDB();


// ✅ Setup CORS properly
const allowedOrigins = [
  process.env.FRONTEND_URL, // e.g., https://www.prestigedreamdecor.in
  'http://localhost:3001',   // for development
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/notify', notifyRoutes);
app.use('/api/contact', contactRoute);

// ✅ Health check
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
