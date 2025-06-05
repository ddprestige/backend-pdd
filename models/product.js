// backend/models/product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true } // image URL from Cloudinary
});

const Product = mongoose.model('Product', productSchema);
export default Product;
