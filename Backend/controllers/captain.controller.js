const blacklistModel = require("../models/blacklistModel.model.js");
const captainModel = require("../models/captain.model.js");
const captainService = require("../services/captain.service.js");
const { validationResult, cookie } = require("express-validator");

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, vehicle } = req.body;

    const isCaptainExisting = await captainModel.findOne({ email });

    if (isCaptainExisting) {
        return res.status(400).json({ message: 'Captain already exists' });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');

    if (!captain) {
        return res.status(401).json({ message: "Invalid E-mail or Password" });
    }

    const isMatch = await bcrypt.compare(password, captain.password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, captain });
}

module.exports.logOutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    await blacklistModel.create({ token });

    res.clearCookie('token');

    res.status(200).json({ message: "Logged out successfully" });
}

module.exports.getCaptain = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
}