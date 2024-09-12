const express = require("express");
const userRouter = require("./userRoutes/userRoute");

const allRoutes = express.Router();

allRoutes.use("/user", userRouter);

module.exports = allRoutes;


/// trhis is for conflictttt 


///////////////Gaurav bhaiya changesssssss in rahulChanges branch