import express from 'express';
const Router = express.Router();

import OrderController from '../controllers/OrderController.js';
import authMiddleWare from '../middleware/authMiddleware.js'

Router.get('/get-all-order', authMiddleWare.verifyTokenAdmin, OrderController.getAllOrder);
Router.get('/get-all-order-user', authMiddleWare.verifyCustomer, OrderController.getAllOrderForUser);
Router.get('/search', authMiddleWare.verifyTokenStaff, OrderController.searchOrder);
Router.get('/search-for-customer', authMiddleWare.verifyCustomer, OrderController.searchOrderCustomer)
Router.get('/pending', authMiddleWare.verifyCustomer, OrderController.getAllOrderPendingForUser);
Router.get('/processing', authMiddleWare.verifyCustomer, OrderController.getAllProcessingOrderForUser);
Router.get('/delivered', authMiddleWare.verifyCustomer, OrderController.getAllDeliveredOrderForUser);
Router.get('/cancelled', authMiddleWare.verifyCustomer, OrderController.getAllCancelledOrderForUser);
Router.post('/create-order', authMiddleWare.verifyCustomer, OrderController.createOrder);
Router.get('/get-detail-order/:oid', authMiddleWare.verifyCustomer, OrderController.getDetailOrder);
Router.patch('/update-to-processing/:oid', authMiddleWare.verifyTokenStaff, OrderController.updateStatusToProcessing);
Router.patch('/update-to-delivered/:oid', authMiddleWare.verifyCustomer, OrderController.updateStatusToDeliverd);
Router.patch('/update-to-cancel/:oid', authMiddleWare.verifyTokenStaff, OrderController.updateStatusToCancel);
Router.patch('/update-order/:oid', authMiddleWare.verifyCustomer, OrderController.updateOrder);
Router.delete('/delete-order/:oid', authMiddleWare.verifyTokenStaff, OrderController.deleteOrder)
Router.get('/pending-for-admin', authMiddleWare.verifyTokenStaff, OrderController.getAllOrderPendingForAdmin);
Router.get('/processing-for-admin', authMiddleWare.verifyTokenStaff, OrderController.getAllProcessingOrderForAdmin);
Router.get('/delivered-for-admin', authMiddleWare.verifyTokenStaff, OrderController.getAllDeliveredOrderForAdmin);
Router.get('/cancelled-for-admin', authMiddleWare.verifyTokenStaff, OrderController.getAllCancelledOrderForAdmin);

export const OrderRoute = Router;
