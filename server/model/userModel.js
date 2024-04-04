import mongoose from 'mongoose';

const userEnum = ['admin', 'staff', 'customer'];
const UserSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    fullName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    confirmPassword: {type: String, required: true},
    phone: {type: String, required: true},
    role: {type: String, enum: userEnum, default: 'customer'},
    address: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
    notification: [{
        _id: false,
        message: {type: String},
        isSeen: {type: Boolean, default: false},
        isNew: {type: Boolean, default: true}
    }]
}, {
    timestamps: true
})

export const User = mongoose.model('User', UserSchema);
