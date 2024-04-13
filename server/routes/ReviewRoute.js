import express from 'express';
const Router = express.Router();

import authMiddleWare from '../middleware/authMiddleware.js'
import ReviewController from '../controllers/ReviewController.js';

Router.post('/', authMiddleWare.verifyCustomer, ReviewController.createOriginalReview);
Router.get('/get-detail/:id',  ReviewController.getDetailReview)
Router.get('/', authMiddleWare.verifyTokenAdmin, ReviewController.getAllReview)
Router.get('/recommendations', authMiddleWare.allowGuestAccess, ReviewController.recommendProducts);
Router.post('/response-text/:id', authMiddleWare.verifyCustomer, ReviewController.createReponseText);
Router.patch('/update-review/:id', authMiddleWare.verifyCustomer, ReviewController.updateOriginalReview);
Router.delete('/delete-review/:id', authMiddleWare.verifyTokenStaff, ReviewController.deleteOriginalReview);

export const ReviewRoute = Router;
