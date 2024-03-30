import express from 'express';
const Router = express.Router();

import CategoryController from '../controllers/CategoryController.js';
import authMiddleWare from '../middleware/authMiddleware.js'

Router.get('/', CategoryController.getAllCategory);
Router.post('/add-cate', authMiddleWare.verifyTokenAdmin, CategoryController.addCategory);
Router.patch('/update-cate/:cid', authMiddleWare.verifyTokenAdmin, CategoryController.updateCategory);
Router.delete('/delete-cate/:cid', authMiddleWare.verifyTokenAdmin,  CategoryController.deleteCategory);

export const CategoryRoute = Router;