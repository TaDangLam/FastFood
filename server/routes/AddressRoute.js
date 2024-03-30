import express from 'express';
const Router = express.Router();

import authMiddleWare from '../middleware/authMiddleware.js'
import AddressController from '../controllers/AddressController.js';

Router.get('/', authMiddleWare.verifyCustomer, AddressController.getAllAddress);
Router.post('/add-address/:userId', authMiddleWare.verifyCustomer, AddressController.addAddress);
Router.patch('/update-address/:aid', authMiddleWare.verifyCustomer, AddressController.updateAddress);
Router.delete('/delete-address/:aid', authMiddleWare.verifyCustomer, AddressController.deleteAddress);
Router.get('/get-detail/:aid', authMiddleWare.verifyCustomer, AddressController.getDetailAddress);

export const AddressRoute = Router;
