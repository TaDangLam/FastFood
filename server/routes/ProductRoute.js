import express from 'express';
const Router = express.Router();

import productController from '../controllers/ProductController.js';
import authMiddleWare from '../middleware/authMiddleware.js'
import upload from '../configs/multerConfig.js';

Router.get('/', productController.getAllProduct);
Router.get('/search', productController.searchProduct);
Router.post('/add-product', authMiddleWare.verifyTokenAdmin, upload.any(), productController.createProduct);
Router.get('/get-detail/:pid', productController.getDetailProduct);
Router.get('/getAll-product-cate/:cid', productController.getProductByCategory);
Router.get('/getFew-product-cate/:cid', productController.getFewProductByCategory);
Router.patch('/update-status-to-soldout/:pid', authMiddleWare.verifyTokenStaff, productController.updateStatusSoldoutProduct);
Router.patch('/update-status-to-stock/:pid', authMiddleWare.verifyTokenStaff, productController.updateStatusStockProduct);
Router.delete('/delete-product/:pid', authMiddleWare.verifyTokenAdmin, productController.deleteProduct);
Router.patch('/update-product/:pid', authMiddleWare.verifyTokenAdmin, upload.any(), productController.updateProduct);

export const ProductRoute = Router;
