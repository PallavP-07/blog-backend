const { validationResult } = require('express-validator');
const Post = require('../models/postModel');

const postController = {
    create: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description } = req.body;
        Post.create(title, description, req.userId, (err, results) => {
            if (err) return res.status(500).send({ message: 'Server error' });
            res.status(201).send({ message: 'Post created successfully!' });
        });
    },

    getByUser: (req, res) => {
        Post.findByAuthor(req.userId, (err, results) => {
            if (err) return res.status(500).send({ message: 'Server error' });
            res.status(200).send(results);
        });
    },

    update: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { title, description } = req.body;
        Post.update(id, title, description, req.userId, (err, results) => {
            if (err) return res.status(500).send({ message: 'Server error' });
            if (results.affectedRows === 0) return res.status(404).send({ message: 'Post not found or not authorized' });
            res.status(200).send({ message: 'Post updated successfully!' });
        });
    },

    delete: (req, res) => {
        const { id } = req.params;
        Post.delete(id, req.userId, (err, results) => {
            if (err) return res.status(500).send({ message: 'Server error' });
            if (results.affectedRows === 0) return res.status(404).send({ message: 'Post not found or not authorized' });
            res.status(200).send({ message: 'Post deleted successfully!' });
        });
    }
};

module.exports = postController;