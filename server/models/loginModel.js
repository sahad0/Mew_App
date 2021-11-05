const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;


const loginSchema = mongoose.Schema({

    name : {
        type:String,
        required:true,
        trim:true
    },
    email: {
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    pass: {
        type:String,
        required:true,
        trim:true,
        min:6,
        max:35,
    },
    
    secret: {
        type:String,
        required:true,
        trim:true
    },
    userid:{
        type:String,
        unique:true,
    },

    about : {},
    image : {url:String , public_id:String},
    following : [{type : ObjectId ,ref:"User"}],
    followers : [{type : ObjectId ,ref:"User"}],
    verified: {type:Boolean},
},{
    timestamps :true,
});

const LoginSchema = mongoose.model("User",loginSchema);

module.exports=LoginSchema;