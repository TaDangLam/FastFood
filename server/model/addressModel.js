import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema ({
    street: {type: String, required: true},
    city: {type: String, required: true},
    province: {type: String, required: true},
}, {
    timestamps: true
})

export const Address = mongoose.model('Address', AddressSchema);
