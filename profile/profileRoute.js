const express = require("express");
const profileRouter = express.Router();
const controller = require('./profileController');

// Create a profile
profileRouter.post('/create', controller.createProfile);

// Get all profiles
profileRouter.get('/get', controller.getAllProfiles);

// Get profile by ID
profileRouter.get('/getId/:id',controller.getProfileById)



module.exports = profileRouter;
