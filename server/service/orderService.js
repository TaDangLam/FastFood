import mongoose from 'mongoose';

import { io } from '../index.js';
import { Order } from '../model/orderModel.js';
import { Product } from '../model/productModel.js';
import { User } from '../model/userModel.js';

const orderService = {
    getAllOrder: async() => {
        try {
            const order = await Order.find()
                .populate({path: 'orderBy', select: '_id name email phone'})
                .populate({path: 'paymentType', select: '_id name'})
                .populate({path: 'address', select: '_id street city province'})
                .populate('orderDetail.productId');
            return ({
                status: 'OK',
                data: order,
            })
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getAllOrderForUser: async(userId) => {
        try {
            const order = await Order.find({ orderBy: userId })
                .populate({path: 'paymentType', select: '_id name'})
                .populate({path: 'address', select: '_id street city province'})
                .populate('orderDetail.productId');
            return ({
                status: 'OK',
                data: order
            })
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getDetailOrder: async(oid) => {
        try {
           const order = await Order.findById(oid)
            .populate({path: 'orderBy', select: 'email name fullName phone'})
            .populate('address')
            .populate('orderDetail.productId');
           return({
            status: 'OK',
            data: order
           }) 
        } catch (error) {
            throw new Error(error.message);
        }
    },
    searchOrder: async(keyword) => {
        try {
            let orders;
            
            const isValidObjectId = mongoose.Types.ObjectId.isValid(keyword);
            
            if (isValidObjectId) {
                orders = await Order.find({ _id: keyword }).populate({path: 'orderBy', select: '_id name email phone'})
                                                            .populate('orderDetail.productId');
            } else {
                throw new Error('Search No Data Order');
            }
            
            return {
                status: 'OK',
                data: orders
            };
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getAllProcessingOrderForUser: async(userId) => {
        try {
            const orders = await Order.find({ orderBy: userId, status: 'Processing' })
                .populate({path: 'orderBy', select: '_id name email phone'})
                .populate({path: 'paymentType', select: '_id name'})
                .populate({path: 'address', select: '_id street city province'})
                .populate('orderDetail.productId');
            return ({
                status: 'OK',
                data: orders
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getAllDeliveredOrderForUser: async(userId) => {
        try {
            const orders = await Order.find({ orderBy: userId, status: 'Delivered' })
                .populate({path: 'orderBy', select: '_id name email phone'})
                .populate({path: 'paymentType', select: '_id name'})
                .populate({path: 'address', select: '_id street city province'})
                .populate('orderDetail.productId');
            return ({
                status: 'OK',
                data: orders
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getAllOrderPendingForUser: async(userId) => {
        try {
            const orders = await Order.find({ orderBy: userId, status: 'Pending' })
                .populate({path: 'orderBy', select: '_id name email phone'})
                .populate({path: 'paymentType', select: '_id name'})
                .populate({path: 'address', select: '_id street city province'})
                .populate('orderDetail.productId');
            return ({
                status: 'OK',
                data: orders
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getAllCancelledOrderForUser: async(userId) => {
        try {
            const orders = await Order.find({ orderBy: userId, status: 'Cancel' })
                .populate({path: 'orderBy', select: '_id name email phone'})
                .populate({path: 'paymentType', select: '_id name'})
                .populate({path: 'address', select: '_id street city province'})
                .populate('orderDetail.productId');
            return ({
                status: 'OK',
                data: orders
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    createOrder: async(orderData) => {
        try {
            const { orderBy, paymentType, totalPrice, orderDetail, address, isPaid } = orderData;
            const user = await User.findById(orderBy);

            if (!user) {
                throw new Error('User not found');
            }

            const newOrder = await Order.create({ orderBy, paymentType, totalPrice, orderDetail, address, isPaid });
            // await User.updateMany({ role: 'staff' }, { notification: `${user.name} placed an order. Please go to accept the order` });
            const newNotification = {
                message: `${user.name} placed an order. Please go to accept the order`,
                isSeen: false,
                isNew: true
            };
            await User.updateMany({ role: 'staff' }, { $push: { notification: newNotification } });
            // io.emit('newOrderNotification', { message: `${user.name} placed an order. Please go to accept the order` });
            io.emit('newOrderNotification', newNotification);
            return ({
                message: 'Create Order is success',
                status: 'OK',
                data: newOrder
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    updateOrder: async(oid, newData) => {
        try {
            const oldOrder = await Order.findById(oid);
            if(!oldOrder){
                return({ message: 'Order is not found'});
            }
            const { orderBy, paymentType, orderDetail, address } = newData;
            const newOrder = await Order.findByIdAndUpdate(oid, 
                { 
                    orderBy: orderBy || oldOrder.orderBy, 
                    paymentType: paymentType || oldOrder.paymentType, 
                    orderDetail: orderDetail || oldOrder.orderDetail, 
                    address: address || oldOrder.address
                }, 
                {new: true});
            return ({
                status: 'OK',
                message: 'Update Order is Success',
                data: newOrder
            })
        } catch (error) {
            throw new Error(error.message);
        }
    },
    updateStatusToProcessing: async(oid, newData) => {
        try {
            const oldOrder = await Order.findById(oid);
            if(!oldOrder) {
                throw new Error('Order is not found');
            }
            oldOrder.status = newData;
            const newOrder = await oldOrder.save();
            return({
                status: 'OK',
                message: 'Update Status is Successfully',
                data: newOrder
            })
        } catch (error) {
            throw new Error(error.message);
        }
    },
    updateStatusToDeliverd: async(oid, newData) => {
        try {
            const oldOrder = await Order.findById(oid);
            if(!oldOrder) {
                throw new Error('Order is not found');
            }
            for(const item of oldOrder.orderDetail){
                const { productId, quantity } = item;
                const product = await Product.findById(productId);
                product.sold = (product.sold || 0) + quantity;
                await product.save();
            }
            oldOrder.status = newData;
            const newOrder = await oldOrder.save();
            return({
                status: 'OK',
                message: 'Update Status is Successfully',
                data: newOrder
            })
        } catch (error) {
            throw new Error(error.message);
        }
    },
    updateStatusToCancel: async(oid, newData) => {
        try {
            const oldOrder = await Order.findById(oid);
            if(!oldOrder) {
                throw new Error('Order is not found');
            }
            oldOrder.status = newData;
            const newOrder = await oldOrder.save();
            return({
                status: 'OK',
                message: 'Update Status is Successfully',
                data: newOrder
            })
        } catch (error) {
            throw new Error(error.message);
        }
    },
    deleteOrder: async(oid) => {
        try {
            await Order.findByIdAndDelete(oid);
            return ({
                status: 'OK',
                message: 'Delete Order is Success'
            })
        } catch (error) {
            throw new Error(error.message);
        }        
    },
    getAllProcessingOrderForAdmin: async() => {
        try {
            const orders = await Order.find({ status: 'Processing' })
                .populate({path: 'orderBy', select: '_id name email phone'})
                .populate({path: 'paymentType', select: '_id name'})
                .populate({path: 'address', select: '_id street city province'})
                .populate('orderDetail.productId');
            return ({
                status: 'OK',
                data: orders
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getAllDeliveredOrderForAdmin: async() => {
        try {
            const orders = await Order.find({ status: 'Delivered' })
                .populate({path: 'orderBy', select: '_id name email phone'})
                .populate({path: 'paymentType', select: '_id name'})
                .populate({path: 'address', select: '_id street city province'})
                .populate('orderDetail.productId');
            return ({
                status: 'OK',
                data: orders
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getAllOrderPendingForAdmin: async() => {
        try {
            const orders = await Order.find({ status: 'Pending' })
                .populate({path: 'orderBy', select: '_id name email phone'})
                .populate({path: 'paymentType', select: '_id name'})
                .populate({path: 'address', select: '_id street city province'})
                .populate('orderDetail.productId');
            return ({
                status: 'OK',
                data: orders
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getAllCancelledOrderForAdmin: async() => {
        try {
            const orders = await Order.find({ status: 'Cancel' })
                .populate({path: 'orderBy', select: '_id name email phone'})
                .populate({path: 'paymentType', select: '_id name'})
                .populate({path: 'address', select: '_id street city province'})
                .populate('orderDetail.productId');
            return ({
                status: 'OK',
                data: orders
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default orderService;
