const LoginSchema = require("../models/loginModel");
const PostSchema = require("../models/postModel");

const addFollower = async(req,res,next)=>{
    try {
        const add = await LoginSchema.findByIdAndUpdate(req.body._id,
            {
                $addToSet : {
                    followers : req._id,
                },
            });
        next();

    } catch (err) {
        res.status(500).json({err_msg:"Internal Server Error"});
    }
    


}

const addFollow = async(req,res)=>{
    try {
        const add = await LoginSchema.findByIdAndUpdate(req._id,{
            $addToSet:{
                following: req.body._id,
            },
            
        },{new:true}).select("-pass -secret");
        res.json({add});

    } catch (err) {
        res.status(500).json({err_msg:"Internal Server Error"});
    }
}

const removeFollower = async(req,res,next)=>{
    try {
        const rmvefollower = await LoginSchema.findByIdAndUpdate(req.body._id,{
            $pull:{
                followers: req._id,
            }
        });
        next();
    } catch (err) {
        res.status(500).json({err_msg:"Internal Server Errorr"});
    }
}

const removeFollow = async(req,res)=>{
    try {
        const rmvefollow = await LoginSchema.findByIdAndUpdate(req._id,{
            $pull:{
                following : req.body._id,
            }
        },{new:true}).select("-pass -secret");
        res.json({rmvefollow});
    } catch (err) {
        res.status(500).json({err_msg:"Internal Server Errorrr"});
    }
}



const fetchFollowersPost = async(req,res)=>{
    try {
        const me = await LoginSchema.findById(req._id);
        let following = me.following;
        following.push(req._id);

        const userposts = await PostSchema.find({postedBy : {$in: following}}).populate("comments.postedBy","name _id image").populate("postedBy","name _id image").sort({createdAt : -1}).limit(20);
        res.json(userposts);
    } catch (err) {
        
    }
}

const fetchFollowing = async(req,res)=>{
    try {
        const me = await LoginSchema.findById(req._id);
        const following = me.following;
        const flwing = await LoginSchema.find({_id:{$in:following}}).select("-pass -secret -createdAt -updatedAt -following -followers -email");
        res.json(flwing);
    } catch (err) {
        res.status(500).json({err_msg:"Internal Server Error"}); 
    }
}
const fetchFollowers = async(req,res)=>{
    try {
        const me = await LoginSchema.findById(req._id);
        const followers = me.followers;
        const flwr = await LoginSchema.find({_id:{$in:followers}}).select("-pass -secret -createdAt -updatedAt -following -followers -email");
        res.json(flwr);
    } catch (err) {
        res.status(500).json({err_msg:"Internal Server Error"}); 
    }
}

module.exports = {addFollow,addFollower,fetchFollowersPost,fetchFollowing,removeFollower,removeFollow,fetchFollowers};