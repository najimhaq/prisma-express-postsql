const asyncHandler = require('../middleware/asyncHandler');

// Prisma client
const prisma = require('../config/db');

// ইউজার তৈরি করুন (পোস্ট ছাড়া)
const createUser = asyncHandler(async (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({
      success: false,
      message: 'Name, email and age are required',
    });
  }

  const user = await prisma.user.create({
    data: { name, email, age },
  });

  res.status(201).json({
    success: true,
    data: user,
    message: 'User created successfully',
  });
});

//create a single user
const getSingleUserById = asyncHandler(async (req, res) => {
  const { id } = req.params; // URL থেকে UUID আসবে

  try {
    const user = await prisma.user.findUnique({
      where: { id }, // UUID string 그대로 ব্যবহার করুন
      include: {
        posts: true, // চাইলে User-এর সাথে তার Posts-ও দেখাতে পারেন
        profile: true, // চাইলে Profile-ও দেখাতে পারেন
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found with this ID',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
      message: 'User fetched successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
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

//update user
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params; // এখানে id আসবে URL থেকে
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({
      success: false,
      message: 'Name, email and age are required',
    });
  }

  try {
    const user = await prisma.user.update({
      where: { id: id }, // এখানে parseInt নয়, সরাসরি UUID string দিন
      data: { name, email, age },
    });

    res.status(200).json({
      success: true,
      data: user,
      message: 'User updated successfully',
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found with this ID',
    });
  }
});

// সব ইউজার দেখুন
const getUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    include: { posts: true },
  });

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

module.exports = {
  createUser,
  updateUser,
  createUserWithPost,
  getUsers,
  getSingleUserById,
};
