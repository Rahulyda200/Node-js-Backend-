const UserProfile=require('../profile/profileModel')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Create a new profile
const createProfile = async (profileData) => {
    const profile = new UserProfile(profileData);
    await profile.save();
    return profile;
};


// Get all profiles
const getAllProfiles = async () => {
    return await UserProfile.find();
};


// Get a profile by ID

const getProfileById = async (profileId) => {

    if (!mongoose.Types.ObjectId.isValid(profileId)) {
        console.log("first")
      throw new Error("Invalid ID format");
    }
  
    const profile = await UserProfile.findById(profileId);
    if (!UserProfile) {
        console.log("second")
      throw new Error("profile not found");
    }
  
    return profile;
  };



module.exports={createProfile,getAllProfiles,getProfileById}