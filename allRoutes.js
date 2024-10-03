const express = require("express");
const userRouter = require("./userRoutes/userRoute");
const profileRouter=require("./profile/profileRoute")

const allRoutes = express.Router();

allRoutes.use("/user", userRouter);
allRoutes.use("/profile", profileRouter);

module.exports = allRoutes;


/// trhis is for conflictttt 


///////////////Gaurav bhaiya changesssssss in rahulChanges branch