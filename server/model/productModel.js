import mongoose from 'mongoose';

const statusProduct = ['Stock', 'SoldOut'];

const ProductSchema = new mongoose.Schema ({
    // options: {type: mongoose.Schema.Types.ObjectId, ref: 'Option'},
    images: {type: Array},
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    reviewId: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
    rate: {type: Number, default: 5},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    // title: {type: String},
    desc: {type: String},
    status: {type: String, enum: statusProduct, default: 'Stock'}
}, {
    timestamps: true
})

export const Product = mongoose.model('Product', ProductSchema);
