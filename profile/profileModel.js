const mongoose=require('mongoose')
const profileSchema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
      },
    name:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        trim:true,
    },
    address:{
        type:String,
        trim:true,
    },
    phone:{
        type:Number,
        trim:true,
    }
    
})

const UserProfile=new mongoose.model('UserProfile',profileSchema)
module.exports=UserProfile