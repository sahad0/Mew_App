const { hashPass, verifyPass } = require("../helpers/authHelpers");
const LoginSchema = require("../models/loginModel");

const jwt = require("jsonwebtoken");

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

    const finalRegisterDetails = new LoginSchema({
      name,
      email,
      pass: hashedpass,
      secret,
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

module.exports = { register, login, logout, loggedIn ,authorised};
