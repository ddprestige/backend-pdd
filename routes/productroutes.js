import express from 'express';
import upload from '../middleware/multer.js'; 
import authMiddleware from '../middleware/authmiddleware.js'; // ✅ Correct path with .js
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js'; // ✅ ES Module import

const router = express.Router();

// Only admin can add, update, and delete products
router.post('/add',  upload.single('image'), createProduct);
router.put('/update/:id',  upload.single('image'), updateProduct);
router.delete('/delete/:id',deleteProduct);

// Public route to display all products
router.get('/display', getAllProducts);

export default router;
