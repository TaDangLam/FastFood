import mongoose from 'mongoose';

const optionSizes = [Small, Medium, Big];

const ProductOptionSchema = new mongoose.Schema ({
    optioneName: {type: String},
    optionSize: {type: String, enum: optionSizes, default: 'Small'},
    optionPrice: {type: Number}
}, {
    timestamps: true
})

export const Option = mongoose.model('Option', ProductOptionSchema);
