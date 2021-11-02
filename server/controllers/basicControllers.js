const LoginSchema = require("../models/loginModel");


const Suggestions = async(req,res)=>{
    try {
        const me = await LoginSchema.findById(req._id);
        let followers = me.following;
        followers.push(me._id);
        const nonfollowers = await LoginSchema.find({_id: { $nin:followers }}).select("name userid image").limit(10);
        res.json(nonfollowers);
    } catch (err) {
        res.status(500).json({err_msg:"Internal Server Error"});
    }
    

}

module.exports=Suggestions;