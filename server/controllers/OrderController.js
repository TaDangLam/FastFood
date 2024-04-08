import { StatusCodes} from 'http-status-codes';
import orderService from '../service/orderService.js';

const OrderController = {
    getAllOrder: async(req, res) => {
        try {
            const response = await orderService.getAllOrder();
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    getAllOrderForUser: async(req, res) => {
        try {
            const userId = req.user.payload.id;
            const response = await orderService.getAllOrderForUser(userId);
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    getDetailOrder: async(req, res) => {
        try {
            const { oid } = req.params;
            const response = await orderService.getDetailOrder(oid);
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    searchOrder: async(req, res) => {
        try {
            const { keyword } = req.query;
            const response = await orderService.searchOrder(keyword);
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    getAllProcessingOrderForUser: async(req, res) => {
        try {
            const userId = req.user.payload.id;
            const response = await orderService.getAllProcessingOrderForUser(userId);
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    getAllDeliveredOrderForUser: async(req, res) => {
        try {
            const userId = req.user.payload.id;
            const response = await orderService.getAllDeliveredOrderForUser(userId);
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    getAllCancelledOrderForUser: async(req, res) => {
        try {
            const userId = req.user.payload.id;
            const response = await orderService.getAllCancelledOrderForUser(userId);
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    getAllOrderPendingForUser: async(req, res) => {
        try {
            const userId = req.user.payload.id;
            const response = await orderService.getAllOrderPendingForUser(userId);
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    createOrder: async(req, res) => {
        try {
            const { orderBy, paymentType, totalPrice, orderDetail, address, isPaid } = req.body;
            if (!orderBy || !paymentType || !totalPrice || !orderDetail || !address) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide all required fields.' });
            }
            const newOrder = await orderService.createOrder(req.body);
            res.status(StatusCodes.CREATED).json(newOrder)
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    updateOrder: async(req, res) => {
        try {
            const { oid } = req.params;
            const response = await orderService.updateOrder(oid, req.body);
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    updateStatusToProcessing: async(req, res) => {
        try {
            const { oid } = req.params;
            const data = "Processing"
            const response = await orderService.updateStatusToProcessing(oid, data);
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    updateStatusToDeliverd: async(req, res) => {
        try {
            const { oid } = req.params;
            const data = "Delivered"
            const response = await orderService.updateStatusToDeliverd(oid, data);
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    updateStatusToCancel: async(req, res) => {
        try {
            const { oid } = req.params;
            const data = "Cancel"
            const response = await orderService.updateStatusToCancel(oid, data);
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    deleteOrder: async(req, res) => {
        try {
            const { oid } = req.params;
            const response = await orderService.deleteOrder(oid);
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    getAllProcessingOrderForAdmin: async(req, res) => {
        try {
            const response = await orderService.getAllProcessingOrderForAdmin();
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    getAllDeliveredOrderForAdmin: async(req, res) => {
        try {
            const response = await orderService.getAllDeliveredOrderForAdmin();
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    getAllCancelledOrderForAdmin: async(req, res) => {
        try {
            const response = await orderService.getAllCancelledOrderForAdmin();
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    getAllOrderPendingForAdmin: async(req, res) => {
        try {
            const response = await orderService.getAllOrderPendingForAdmin();
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
}

export default OrderController;
