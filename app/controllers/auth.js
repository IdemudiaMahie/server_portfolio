const jwt = require('jsonwebtoken');
const User = require('../models/users');

const secret = process.env.SECRETKEY;

exports.signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) throw new Error("User not found");

        if (!user.authenticate(req.body.password))
            throw new Error("Invalid credentials");

        const token = jwt.sign(
            { id: user._id, username: user.username },
            secret,
            { expiresIn: "2h" }
        );

        res.json({
            success: true,
            token
        });

    } catch (err) {
        next(err);
    }
};


const requireSignin = expressjwt({
    secret: process.env.SECRETKEY,
    algorithms: ['HS256'],
    userProperty: 'auth'
});

module.exports = { requireSignin };