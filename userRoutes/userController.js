'use strict'; 
const userService = require("./userService");

// Register User
exports.register = async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;

    const { user, token } = await userService.registerUser({
      name,
      email,
      phone,
      address,
      password,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: token,
      user: user,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ message: `Error registering user: ${error.message}` });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all the data" });
    }

    const { user, token } = await userService.loginUser(email, password);

    res.status(200).json({
      message: "Login successfully",
      token: token,
      user: user,
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: `Error logging in user: ${err.message}` });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res
      .status(500)
      .json({ message: `Error retrieving users: ${error.message}` });
  }
};

// Get User by ID and populate profiles
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate('profiles'); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error finding user:', error);
    res.status(500).json({ message: `Error finding user: ${error.message}` });
  }
};


// Update User by ID
exports.updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { password, ...userUpdates } = req.body;

    const updatedUser = await userService.updateUserById(userId, {
      ...userUpdates,
      password,
    });
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: `Error updating user: ${error.message}` });
  }
};

// Delete User by ID
exports.deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    await userService.softDeleteUserById(userId);
    res.status(200).json({
      success: true,
      message: "User soft deleted successfully",
    });
  } catch (error) {
    console.error("Error soft deleting user:", error);
    res
      .status(500)
      .json({ message: `Error soft deleting user: ${error.message}` });
  }
};
