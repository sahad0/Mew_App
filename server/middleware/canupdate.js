const PostSchema = require("../models/postModel");


async function canupdate(req,res,next){
    
    try{
     
      const findpost = await PostSchema.findById(req.params._id);
      res.status(200).json(findpost);
      if(findpost.postedBy!=req._id){
        
        res.status(401).json({err_msg:req.id,value:findpost.postedBy});
      }
      else{
        next();
      }
    }
    catch(err){
      res.status(500).send({err_msg:"Internal"});
    }
    
  }

module.exports=canupdate;