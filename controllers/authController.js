const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/userModel');
require('dotenv').config();

const authController = {
    register: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 8);

        User.create(username, hashedPassword, (err, results) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).send({ message: 'Username already exists' });
                }
                return res.status(500).send({ message: 'Server error' });
            }
            res.status(201).send({ message: 'User registered successfully!' });
        });
    },

    login: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        User.findByUsername(username, (err, results) => {
            if (err) return res.status(500).send({ message: 'Server error' });
            if (results.length === 0) return res.status(404).send({ message: 'User not found' });

            const user = results[0];
            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) return res.status(401).send({ message: 'Invalid password' });

            const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: 86400 });
            res.status(200).send({ auth: true, token });
        });
    }
};

module.exports = authController;