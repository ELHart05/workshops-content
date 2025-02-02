const express = require('express');
const bcrypt = require('bcrypt');
const generateJWT = require('../utils');
const { check, validationResult } = require('express-validator');
const UserModel = require('../models/User');

const userRoutes = express.Router();

userRoutes.post('/register', [
    check('full_name').isLength({ min: 3 }),
    check('age').isNumeric(),
    check('email').isEmail(),
    check('password').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { full_name, age, email, password } = req.body;

    try {
        let user = await UserModel.findOne({
            email
        })

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new UserModel({
            full_name,
            age,
            email,
            password: hashedPassword
        });

        await user.save();

        const token = generateJWT({
            user: {
                id: user._id
            }
        })

        res.json({
            user,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

userRoutes.post('/login', [
    check('email').isEmail(),
    check('password').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await UserModel.findOne({
            email
        });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = generateJWT({
            user: {
                id: user._id
            }
        })

        res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

userRoutes.get('/', (req, res) => {
    res.send('Welcome to our platform');
});

userRoutes.use(require('../middleware'));

userRoutes.get('/profile', (req, res) => {
    res.json(req.user);
});

module.exports = userRoutes;
