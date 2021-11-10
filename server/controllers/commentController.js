const PostSchema = require("../models/postModel");


const commentController = async(req,res)=>{
    try {
        const {comment,_cid} = req.body;
        
        const commentAdded = await PostSchema.findByIdAndUpdate(_cid,{
            $push : {comments : [{text:comment,postedBy:req._id}]}
        },{new:true}).populate("comments.postedBy","name _id image").populate("postedBy","name _id image");
        res.json(commentAdded);
    } catch (err) {
        res.status(500).json({err_msg:"Internal Server Error"});
    }
}

const removeCommentController = async(req,res)=>{
    try {
        const {comment,_cid} = req.body;
        const commentRemoved = await PostSchema.findByIdAndUpdate(_cid,{
            $pull : {comments : [{_id:comment._id}]}
        },{new:true});
        res.json(commentRemoved);

    } catch (err) {
        res.status(500).json({err_msg:"Internal Server Error"});
    }
}


module.exports = {commentController,removeCommentController};