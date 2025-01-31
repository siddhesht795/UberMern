const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minLength: [3, "First Name must be at least 3 characters long"]
        },
        lastName: {
            type: String,
            minLength: [3, "Last Name must be at least 3 characters long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Inactive"
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minLength: [3, "Color must be at least 3 characters long"]
        },
        plate: {
            type: String,
            required: true,
            minLength: [3, "Plate must be at least 3 characters long"]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"]
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ["car", "motorcycle", "auto"]
        }
    },
    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number
        }
    }
}, { timestamps: true });

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    return token;
}

captainSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}

const captainModel = mongoose.model("Captain", captainSchema)

module.exports = captainModel;
