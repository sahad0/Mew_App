const LoginSchema = require("../models/loginModel");



const SearchUsers = async(req,res)=>{
    const searchName = req.body.searchName;
    if(!searchName){
        return res.status(400).send();
    }
    try {
        const users = await LoginSchema.find({
            $or:[
                {name: {$regex:searchName, $options:'i'}},
                {userid: {$regex:searchName, $options:'i'}},
            ]
            
        }).select("name image followers following");
        res.send(users);
    } catch (err) {
        return res.status(500).json({ err_msg: "Internal server Error" });
    }
    
}

module.exports={SearchUsers};