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


const updatePost = async(req,res)=>{
    try{
        const editPost = await PostSchema.findById(req.params._id);
        res.status(200).json(editPost);
    }
    catch(err){
        return res.status(500).send();
    }
}

const saveEdit = async(req,res)=>{
    try{
        const {content,image} = req.body;
        const data ={
            contents : content,
            image : {
                url:image.url,
                public_id:image.public_id,
            },
        }
        const saveEdit = await PostSchema.findByIdAndUpdate(req.params._id,data,{new:true});
        res.status(200).send();
    }
    catch{
        return res.status(500).json({err_msg:"File size too Large!"});
    }
}


const deletePost = async(req,res)=>{
    try {
        const deleted = await PostSchema.findByIdAndDelete(req.params._id);
        if(deleted.image && deleted.image.public_id){
            const deleteimgurl = await cloudinary.uploader.destroy(deleted.image.public_id);
        }
        res.status(200).send();
        
    } 
    catch (err) {
        return res.status(500).json({err_msg:"Internal Server Error"});
    }
}



module.exports={contents ,imageUpload , userPost ,updatePost ,saveEdit,deletePost};