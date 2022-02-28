const LoginSchema = require("../models/loginModel")


const findProfile = async (req,res)=>{
    try {
        const profile = await LoginSchema.findById(req.params._id).select('image _id following followers name about userid');
        res.send(profile);
    } catch (err) {
        return res.status(500).send("Not Found");
    }
}

module.exports={findProfile};