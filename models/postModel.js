
const db = require('../config/db');

const Post = {
    create: (title, description, author, callback) => {
        const query = 'INSERT INTO posts (title, description, author) VALUES (?, ?, ?)';
        db.query(query, [title, description, author], callback);
    },
    findByAuthor: (author, callback) => {
        const query = 'SELECT * FROM posts WHERE author = ?';
        db.query(query, [author], callback);
    },
    update: (id, title, description, author, callback) => {
        const query = 'UPDATE posts SET title = ?, description = ? WHERE id = ? AND author = ?';
        db.query(query, [title, description, id, author], callback);
    },
    delete: (id, author, callback) => {
        const query = 'DELETE FROM posts WHERE id = ? AND author = ?';
        db.query(query, [id, author], callback);
    }
};

module.exports = Post;
