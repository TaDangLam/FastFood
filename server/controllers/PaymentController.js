import { StatusCodes} from 'http-status-codes';

import paymentService from '../service/paymentService.js';

const PaymentController = {
    getAllPayments: async(req, res) => {
        try {
            const payments = await paymentService.getAllPayments();
            res.status(StatusCodes.OK).json(payments);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    createPayment: async(req, res) => {
        try {
            const newPayment = await paymentService.createPayment(req.body);
            res.status(StatusCodes.CREATED).json(newPayment);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    getPaymentById: async(req, res) => {
        try {
            const { paymentId } = req.params;
            const payment = await paymentService.getPaymentById(paymentId);
            res.status(StatusCodes.OK).json(payment);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    updatePayment: async(req, res) => {
        try {
            const { paymentId } = req.params;
            const updatedPayment = await paymentService.updatePayment(paymentId, req.body);
            res.status(StatusCodes.OK).json(updatedPayment);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    deletePayment: async(req, res) => {
        try {
            const { paymentId } = req.params;
            await paymentService.deletePayment(paymentId);
            res.status(StatusCodes.OK).json({ message: 'Payment deleted successfully' });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
}

export default PaymentController;
