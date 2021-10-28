const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const postSchema = mongoose.Schema({

    contents : {type:{} , required:true},

    postedBy : {type:ObjectId , ref:"User"},

    image:     {url:String , public_id:String},

    likes:     [{type:ObjectId , ref:"User"}],

    comments:  [{text:String , created:{type:Date,default:Date.now()} , postedBy: {type:ObjectId , ref:"User"}}],



},{timestamps:true});

const PostSchema = mongoose.model("Post",postSchema);

module.exports=PostSchema;