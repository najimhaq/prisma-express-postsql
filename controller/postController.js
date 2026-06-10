const asyncHandler = require('../middleware/asyncHandler');


const prisma = require('../config/db');

// ✅ CREATE post - নতুন পোস্ট তৈরি
const createPost = asyncHandler(async (req, res) => {
  const { title, content, authorId } = req.body;

  // Validation - সব ফিল্ড আছে কিনা চেক করুন
  if (!title || !content || !authorId) {
    return res.status(400).json({
      success: false,
      message: 'Title, content, and authorId are required',
    });
  }

  // চেক করুন author (user) আসলেই আছে কিনা
  const authorExists = await prisma.user.findUnique({
    where: { id: parseInt(authorId) },
  });

  if (!authorExists) {
    return res.status(404).json({
      success: false,
      message: 'Author not found with this ID',
    });
  }

  // পোস্ট তৈরি করুন
  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId: parseInt(authorId),
    },
    include: {
      author: true, // author এর তথ্যও দেখাবে
    },
  });

  res.status(201).json({
    success: true,
    data: post,
    message: 'Post created successfully',
  });
});

// ✅ GET all posts - সব পোস্ট দেখুন
const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc', // নতুন পোস্ট আগে দেখাবে
    },
  });

  res.status(200).json({
    success: true,
    count: posts.length,
    data: posts,
  });
});

// ✅ GET single post - একটি নির্দিষ্ট পোস্ট দেখুন
const getPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Post not found',
    });
  }

  res.status(200).json({
    success: true,
    data: post,
  });
});

// ✅ UPDATE post - পোস্ট আপডেট করুন
const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  // চেক করুন পোস্ট আছে কিনা
  const postExists = await prisma.post.findUnique({
    where: { id: parseInt(id) },
  });

  if (!postExists) {
    return res.status(404).json({
      success: false,
      message: 'Post not found',
    });
  }

  // পোস্ট আপডেট করুন
  const updatedPost = await prisma.post.update({
    where: { id: parseInt(id) },
    data: {
      title: title || postExists.title,
      content: content || postExists.content,
    },
    include: { author: true },
  });

  res.status(200).json({
    success: true,
    data: updatedPost,
    message: 'Post updated successfully',
  });
});

// ✅ DELETE post - পোস্ট ডিলিট করুন
const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // চেক করুন পোস্ট আছে কিনা
  const postExists = await prisma.post.findUnique({
    where: { id: parseInt(id) },
  });

  if (!postExists) {
    return res.status(404).json({
      success: false,
      message: 'Post not found',
    });
  }

  await prisma.post.delete({
    where: { id: parseInt(id) },
  });

  res.status(200).json({
    success: true,
    message: 'Post deleted successfully',
  });
});

// ✅ GET posts by specific user - নির্দিষ্ট ইউজারের সব পোস্ট
const getPostsByUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const posts = await prisma.post.findMany({
    where: { authorId: parseInt(userId) },
    include: { author: true },
    orderBy: { createdAt: 'desc' },
  });

  res.status(200).json({
    success: true,
    count: posts.length,
    data: posts,
  });
});

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByUser,
};
