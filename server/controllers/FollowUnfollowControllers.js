const LoginSchema = require("../models/loginModel");

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

module.exports={addFollow,addFollower};