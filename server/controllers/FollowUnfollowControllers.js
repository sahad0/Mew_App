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
                following: req.body._id
            },
            
        },{new:true}).select("-pass -secret");
        res.json({add});

    } catch (err) {
        res.status(500).json({err_msg:"Internal Server Error"});
    }
}


const fetchFollowersPost = async(req,res)=>{
    try {
        const me = await LoginSchema.findById(req._id);
        let following = me.following;
        following.push(req._id);

        const userposts = await PostSchema.find({postedBy : {$in: following}}).populate("postedBy","name _id image").sort({createdAt : -1}).limit(20);
        res.json(userposts);
    } catch (err) {
        
    }
}

module.exports={addFollow,addFollower,fetchFollowersPost};