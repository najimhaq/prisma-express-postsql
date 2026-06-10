const express = require('express');
const router = express.Router();
const {
  createUser,
  createUserWithPost,
  getUsers,
} = require('../controller/userController');

// User routes > /api/users default
router.post('/', createUser); // POST /api/users - শুধু ইউজার তৈরি
router.post('/with-post', createUserWithPost); // POST /api/users/with-post - ইউজার+পোস্ট
router.get('/', getUsers); // GET /api/users - সব ইউজার দেখুন

module.exports = router;
