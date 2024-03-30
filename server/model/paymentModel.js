import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    description: {type: String}
}, {
    timestamps: true
});


export const Payment = mongoose.model('Payment', PaymentSchema);
