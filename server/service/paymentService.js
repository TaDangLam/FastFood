import { Payment } from '../model/paymentModel.js';

const paymentService = {
    getAllPayments: async () => {
        try {
            return await Payment.find();
        } catch (error) {
            throw new Error(error.message);
        }
    },
    createPayment: async (paymentData) => {
        try {
            const { name, description } = paymentData;
            return await Payment.create({ name, description });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getPaymentById: async (paymentId) => {
        try {
            return await Payment.findById(paymentId);
        } catch (error) {
            throw new Error(error.message);
        }
    },
    updatePayment: async (paymentId, newData) => {
        try {
            return await Payment.findByIdAndUpdate(paymentId, newData, { new: true });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    deletePayment: async (paymentId) => {
        try {
            await Payment.findByIdAndDelete(paymentId);
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default paymentService;
