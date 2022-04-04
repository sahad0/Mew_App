const { hashPass, verifyPass } = require("../helpers/authHelpers");
const LoginSchema = require("../models/loginModel");

const jwt = require("jsonwebtoken");
const {nanoid} = require("nanoid");

const cloudinary = require("cloudinary");

const register = async (req, res) => {
   
  try {                                                                                             //Register
    const { name, email, pass, rpass, secret } = req.body;
    if (!name && !email && !pass && !rpass && !secret) {
      return res
        .status(400)
        .json({ err_msg: "Fill up the required fields to Sign Up!" })
        .send();
    }
    if (!name) {
      return res.status(400).json({ err_msg: "Name is Required" }).send();
    }
    if (!email) {
      return res.status(400).json({ err_msg: "Email is Required" }).send();
    }
    if (!pass) {
      return res.status(400).json({ err_msg: "Password is Required" }).send();
    }
    if (!rpass) {
      return res.status(400).json({ err_msg: "Password is Required" }).send();
    }
    if (!secret) {
      return res
        .status(400)
        .json({ err_msg: "Security Answer is required" })
        .send();
    }
    if (pass !== rpass) {
      return res
        .status(400)
        .json({ err_msg: "Password Don't Match , Please Check it Out!" })
        .send();
    }
    if (pass.length < 6) {
      return res
        .status(400)
        .json({ err_msg: "Password Must be atleast of 6 Characters" })
        .send();
    }

    const userExist = await LoginSchema.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ err_msg: "Email Aldready Exist" }).send();
    }

    const hashedpass = await hashPass(pass);

    if (!hashedpass) {
      return res.status(500).json({ err: "Internal Server Error" }).send();
    }

    const userid = nanoid(7);
    const verified = false;

    const finalRegisterDetails = new LoginSchema({
      name,
      email,
      pass: hashedpass,
      secret,
      userid,
      verified,
    });

    const registered = await finalRegisterDetails.save();
    const tokendetails = {
      _id: registered._id,
    };
    const token = jwt.sign(tokendetails, process.env.SECRET_STRING,{expiresIn:"1d"});

    res.cookie("token", token, { httpOnly: true }).send();
  } catch (err) {
    res.status(500).json({ err_msg: "Internal server Error" });
  }
};





const login = async (req, res) => {                                                                         //login
  try {
    const { email, pass } = req.body;
    if (!email && !pass) {
      return res
        .status(400)
        .json({ err_msg: "Fill up the required fields to Sign Up!" })
        .send();
    }

    if (!email) {
      return res.status(400).json({ err_msg: "Email is Required" }).send();
    }
    if (!pass) {
      return res.status(400).json({ err_msg: "Password is Required" }).send();
    }

    const userExist = await LoginSchema.findOne({ email: email });
    if (!userExist) {
      return res.status(400).json({ err_msg: "No User Exist Sign Up!" }).send();
    }

    const passverify = await verifyPass(pass, userExist.pass);
    if (!passverify) {
      return res.status(400).json({ err_msg: "Wrong Password!" }).send();
    }

    if (passverify) {
      const token = jwt.sign({ _id: userExist._id }, process.env.SECRET_STRING,{expiresIn:"1d"});

      res.cookie("token", token, { httpOnly: true }).send();
    }
  } catch (err) {
    return res.status(500).json({ err_msg: "Internal server Error" });
  }
};




const loggedIn = async (req, res) => {                                                                      //loggedi auth
  try {
    const userExist = await LoginSchema.findById({ _id: req._id });
    if (userExist) {
      userExist.pass = undefined;
      userExist.secret = undefined;
      return res
        .status(200)
        .json({ _id: req._id, user: userExist, auth: req.auth });
    }
  } catch (err) {
    return res.status(500).json({ err_msg: "Not Authorised" });
  }
};

const authorised = async (req, res) => {                                                            //authorisation
  try {
    const userExist = await LoginSchema.findById({ _id: req._id });
    if (userExist) {
      return res.status(200).json({ auth: req.auth });
    }
  } catch (err) {
    return res.status(401).json({ err_msg: "Not Authorised" });
  }
};

const logout = async (req, res) => {                                                                //logout
  try {
    const token = req.cookies.token;
    if (token) {
      res.cookie("token", "", { httpOnly: true,expires: new Date(0),}).send();
    }
  } 
  catch (err) {
    res.status(500).json({
      err_msg: "Internal Server Error",
    });
  }
};



const saveProfile = async (req,res)=>{
  try {
    const {userid,name,about} = req.body;
    const find = await LoginSchema.findById({_id:req._id});
      if(!name){
        return res.status(400).json({err_msg:"Name is Required!"});
      }
      if(userid == find.userid){
        const userdata = {
          name:name,
          about:about,
        }
        const userUpdate = await LoginSchema.findByIdAndUpdate(req._id,userdata,{new:true});
        userUpdate.secret = undefined;
        userUpdate.pass = undefined;

        return res.json({user:userUpdate});
      }

      if(userid != find.userid){
        if(!userid){
          return res.status(400).json({err_msg:"Username is Required!"});
        }
        if(!name){
          return res.status(400).json({err_msg:"Name is Required!"});
        }
        const findanid = await LoginSchema.findOne({userid:userid});
        
        
        if(findanid){
          return res.status(400).json({err_msg:"UserName Aldready Picked!"});
        }
        const userdata = {
          name:name,
          userid:userid,
          about:about,
        }
        const userUpdate = await LoginSchema.findByIdAndUpdate(req._id,userdata,{new:true});
        userUpdate.secret = undefined;
        userUpdate.pass = undefined;

        return res.json({user:userUpdate});
      }
    
    
    
  } catch (err) {
    res.status(500).json({
      err_msg: "Internal Server Error",
    });
  }
}

const profileImage = async(req,res)=>{
  try{
      const imgUrl = await cloudinary.uploader.upload(req.files.image.path);
      const profileImage = await LoginSchema.findByIdAndUpdate(req._id,{image:{url:imgUrl.url,public_id:imgUrl.public_id}},{new:true}).select("-pass -secret");
      if(profileImage){
        res.json({user:profileImage});
      }
        
  }
  catch(err){
      return res.status(500).json({err_msg:"File Size too Big!"});
  }
}

module.exports = { register, login, logout, loggedIn ,authorised,saveProfile,profileImage};
