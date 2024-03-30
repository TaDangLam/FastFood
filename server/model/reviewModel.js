import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema ({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    productID: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    orderID: {type: mongoose.Schema.Types.ObjectId, ref: 'Order'},
    text: {type: String, required: true},
    rating: {type: Number, required: true},
    responseText: [{
        userIDResponse: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        textResponse: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }],
}, {
    timestamps: true
})

export const Review = mongoose.model('Review', ReviewSchema);
