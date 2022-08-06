const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerSchema, loginSchema } = require('../misc/validation');

const UserController = {
    register: async (req, res) => {
        const result = registerSchema.validate(req.body);
        if (result.error) {
            res.statusMessage = result.error.details[0].message;
            res.status(400).send();
        } else {

            const userE = await User.findOne({ email: req.body.email });
            if (userE) {
                res.statusMessage = 'User already exists';
                res.status(400).send();
            } else {

                //Hash password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);

                const user = new User({
                    email: req.body.email,
                    password: hashedPassword,
                });
                const savedUser = await user.save();
                res.json({user: user._id});
            }
        }
    },
    login: async (req, res) => {
        const result = loginSchema.validate(req.body);
        if (result.error) {
            res.statusMessage = result.error.details[0].message;
            res.status(400).send();
        } else {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                res.statusMessage = 'User does not exist';
                res.status(400).send();
            } else {
                const validPass = await bcrypt.compare(req.body.password, user.password);
                if (!validPass) {
                    res.statusMessage = 'Invalid password';
                    res.status(400).send();
                } else {

                    //create and assign token
                    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
                    res.header('auth-token', token).send(token);
                    //res.json({user: user._id});
                }
            }
        }
    }
};

module.exports = UserController;