const express = require("express");
const userRouter = express.Router();
const controller = require('./userController');
const { registerSchema, loginSchema, updateSchema } = require('./validation');

// Middleware to validate registration data
userRouter.post('/register', async (req, res, next) => {
  try {
    await registerSchema.validateAsync(req.body);
    next();
  } catch (err) {
    if (err.details && err.details.length > 0) {
      res.status(400).json({ error: err.details[0].message });
    } else {
      res.status(400).json({ error: 'Invalid request data' });
    }
  }
}, controller.register);

// Middleware to validate login data
userRouter.post('/login', async (req, res, next) => {
  try {
    await loginSchema.validateAsync(req.body);
    next();
  } catch (err) {
    if (err.details && err.details.length > 0) {
      res.status(400).json({ error: err.details[0].message });
    } else {
      res.status(400).json({ error: 'Invalid request data' });
    }
  }
}, controller.login);

// Middleware to validate update data
userRouter.put('/update/:id', async (req, res, next) => {
  try {
    await updateSchema.validateAsync(req.body);
    next();
  } catch (err) {
    if (err.details && err.details.length > 0) {
      res.status(400).json({ error: err.details[0].message });
    } else {
      res.status(400).json({ error: 'Invalid request data' });
    }
  }
}, controller.updateUserById);

// Other routes remain unchanged
userRouter.get('/find', controller.getAllUsers);
userRouter.get('/findById/:id', controller.getUserById);
userRouter.delete('/delete/:id', controller.deleteUserById);

module.exports = userRouter;
