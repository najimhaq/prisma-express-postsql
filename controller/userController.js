const asyncHandler = require('../middleware/asyncHandler');

// Prisma client
const prisma = require('../config/db');

// ইউজার তৈরি করুন (পোস্ট ছাড়া)
const createUser = asyncHandler(async (req, res) => {
  const { name, email,age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({
      success: false,
      message: 'Name, email and age are required',
    });
  }

  const user = await prisma.user.create({
    data: { name, email,age },
  });

  res.status(201).json({
    success: true,
    data: user,
    message: 'User created successfully',
  });
});

// ইউজার + পোস্ট একসাথে তৈরি করুন (optional)
const createUserWithPost = asyncHandler(async (req, res) => {
  const { name, email, title, content } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Name and email are required',
    });
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      ...(title &&
        content && {
          posts: {
            create: { title, content },
          },
        }),
    },
    include: { posts: true },
  });

  res.status(201).json({
    success: true,
    data: user,
    message: title ? 'User and post created' : 'User created',
  });
});

// সব ইউজার দেখুন
const getUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    include: { posts: true },
  });

  res.status(200).json({
    success: true,
    data: users,
  });
});

module.exports = { createUser, createUserWithPost, getUsers };
