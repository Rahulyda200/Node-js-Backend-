const User = require("../userRoutes/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Register a new user
const registerUser = async (userData) => {
  const { name, email, phone, address, password } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  // Create new user
  const newUser = new User({ name, email, phone, address, password });
  await newUser.save();

  // Generate auth token
  const token = await newUser.generateAuthToken();

  return { user: newUser, token };
};

// Login a user
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid Credentials");
  }

  // Compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }

  // Generate auth token
  const token = await user.generateAuthToken();

  return { user, token };
};

// Find all users
const getAllUsers = async () => {
  return await User.find();
};

// Find a user by ID
const getUserById = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid ID format");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// Update a user by ID
const updateUserById = async (userId, updateData) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid ID format");
  }

  // Handle password hashing if a new password is provided
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    throw new Error("User not found");
  }

  return updatedUser;
};

// Delete a user by ID
const softDeleteUserById = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid ID format");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.isDeleted) {
    throw new Error("User is already soft deleted");
  }

  user.isDeleted = true;
  await user.save();

  return user;
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUserById,
  softDeleteUserById,
};
