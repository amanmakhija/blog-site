const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isRestricted: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String
    },
    optExpireAt: {
        type: Date
    },
    forgetPasswordOTP: {
        type: String
    },
    forgetPasswordOTPExpireAt: {
        type: Date
    },
    blockedUsers: [
        {
            type: String
        }
    ],
    subscribedUsers: [
        {
            type: String
        }
    ]
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('User', userSchema);