import mongoose from 'mongoose';

const PromotionSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    desc: {type: String, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    discount: {type: Number || String, required: true},
}, {
    timestamps: true
})

export const Promotion = mongoose.model('Promotion', PromotionSchema);
