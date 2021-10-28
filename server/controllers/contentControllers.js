const PostSchema = require("../models/postModel");
const cloudinary = require("cloudinary");


const contents = async(req,res)=>{
    const {contents,image} = req.body;
    if(!contents.length){
        return res.status(400).send();
    }
    try{
        const posts = new PostSchema({
            contents:contents,
            postedBy:req._id,
            image:{url:image.url , public_id:image.public_id},
        })
        posts.save();
        res.status(200).send();
    }
    catch(err){
        return res.status(500).send();
    }
    

}


const imageUpload = async(req,res)=>{
    try{
        const imgUrl = await cloudinary.uploader.upload(req.files.image.path);
        
        res.json({
            url : imgUrl.secure_url,
            public_id : imgUrl.public_id,
        });
    }
    catch(err){
        return res.status(500).send();
    }
}

const userPost = async(req,res)=>{
    try{
        const userpost = await PostSchema.find({postedBy : req._id}).populate("postedBy","_id name image").sort({createdAt: -1}).limit(10);
        res.status(200).json(userpost);
    }
    catch(err){
        return res.status(500).send();
    }
}



module.exports={contents ,imageUpload , userPost};