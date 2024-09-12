const mongoose = require("mongoose");


function dbs() {
  
    const url = "mongodb://127.0.0.1:27017/testBackend"
    mongoose.connect(url).then(()=>{
        console.log("Database connected")
    }).catch((err)=>{
        console.log("Database erorr",err);
    })
}

module.exports = dbs;