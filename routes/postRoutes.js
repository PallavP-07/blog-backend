const express = require('express');
const { body } = require('express-validator');
const postController = require('../controllers/postController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', [
    verifyToken,
    body('title').not().isEmpty().withMessage('Title is required'),
    body('description').not().isEmpty().withMessage('Description is required')
], postController.create);

router.get('/', verifyToken, postController.getByUser);

router.put('/:id', [
    verifyToken,
    body('title').not().isEmpty().withMessage('Title is required'),
    body('description').not().isEmpty().withMessage('Description is required')
], postController.update);

router.delete('/:id', verifyToken, postController.delete);

module.exports = router;