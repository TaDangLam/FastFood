import express from 'express';
const Router = express.Router();

import PaymentController from '../controllers/PaymentController.js';
import authMiddleWare from '../middleware/authMiddleware.js';

Router.get('/', authMiddleWare.verifyCustomer, PaymentController.getAllPayments);
Router.post('/create-payment', authMiddleWare.verifyTokenAdmin, PaymentController.createPayment);
Router.get('/get-detail/:paymentId', authMiddleWare.verifyCustomer, PaymentController.getPaymentById);
Router.patch('/update-payment/:paymentId', authMiddleWare.verifyTokenAdmin, PaymentController.updatePayment);
Router.delete('/delete-payment/:paymentId', authMiddleWare.verifyTokenAdmin, PaymentController.deletePayment);

export const PaymentRoute = Router;
