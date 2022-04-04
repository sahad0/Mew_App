const UserSchema = require("../models/postModel");

const liked = async(req,res)=>{
    try {
        const {_id} = req.body;
        const post = await UserSchema.findByIdAndUpdate({_id:_id},{
            $addToSet:{likes:req._id},
        },{new:true});
        res.json({post});
    } catch (err) {
        res.send(500).json({err_msg:"Internal Server Error!"});
    }
}


const unliked = async(req,res)=>{
    try {
        const {_id} = req.body;
        const post = await UserSchema.findByIdAndUpdate({_id:_id},{
            $pull:{likes:req._id},
        },{new:true});
        res.json({post});
    } catch (err) {
        res.send(500).json({err_msg:"Internal Server Error!"});
    }
}


module.exports={liked,unliked};