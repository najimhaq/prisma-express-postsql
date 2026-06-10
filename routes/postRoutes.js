const express = require('express');
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByUser,
} = require('../controller/postController');

// POST routes
router.post('/', createPost); // POST /api/posts
router.get('/', getAllPosts); // GET /api/posts
router.get('/:id', getPostById); // GET /api/posts/1
router.put('/:id', updatePost); // PUT /api/posts/1
router.delete('/:id', deletePost); // DELETE /api/posts/1
router.get('/user/:userId', getPostsByUser); // GET /api/posts/user/1

module.exports = router;
