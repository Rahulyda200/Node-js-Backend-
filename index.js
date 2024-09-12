const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const express = require("express");
const app = express();
const port =process.env.PORT || 8000
const database = require("./dbs/database");
const allRoutes = require("./allRoutes");

app.use(express.json());


app.use("/api",allRoutes);

database();






app.listen(port , ()=>{
    console.log("Your server is running on port ",port);
})


