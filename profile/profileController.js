const profileService=require('./profileService');
const { message } = require('./validation');
const UserProfile=require('../profile/profileModel')
const User=require('../userRoutes/user.model')

 exports.createProfile=async (req,res)=>{
    try {
        const profileData=req.body;
        const profile=await profileService.createProfile(profileData)
        res.status(201).json({
            success: true,
            message: "Profile created successfully",
            profile,
        });
    } catch (error) {
        console.error("Error creating profile:", error);
        res.status(500).json({ message: `Error creating profile: ${error.message}` });
    }
 }

// Get all profiles
exports.getAllProfiles = async (req, res) => {
    try {
        const profiles = await profileService.getAllProfiles();
        res.status(200).json(profiles);
    } catch (error) {
        console.error("Error retrieving profiles:", error);
        res.status(500).json({ message: `Error retrieving profiles: ${error.message}` });
    }
 }
     


// Replace this line
// const Profile = require('../profile/profileModel'); // Comment this line if already present

// Use UserProfile directly instead of Profile in the getProfileById method
exports.getProfileById = async (req, res) => {
    try {
      const profileId = req.params.id;
      const profile = await UserProfile.findById(profileId).populate('user');
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.status(200).json(profile);
    } catch (error) {
      console.error('Error finding profile:', error);
      res.status(500).json({ message: `Error finding profile: ${error.message}` });
    }
  };
  
  

 