import mongoose from 'mongoose';

const statusOrder = ['Pending', 'Processing', 'Delivered', 'Cancel'];
const statusPayment = ['COD', 'Paypal'];

const OrderSchema = new mongoose.Schema ({
    orderBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    paymentType: {type: String, enum: statusPayment, default: 'COD'},
    totalPrice: {type: String, required: true},
    status: {type: String, enum: statusOrder, default: 'Pending'},
    orderDetail: [
        {
            _id: false,
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
            quantity: { type: Number, required: true },
            totalPriceProduct: { type: String, required: true },
        }
    ],
    address: {
        street: {type: String, required: true},
        city: {type: String, required: true},
        province: {type: String, required: true}
    },
    isPaid: {type: Boolean},
    isReview: { type: Boolean, default: false }
}, {
    timestamps: true
})

export const Order = mongoose.model('Order', OrderSchema);
