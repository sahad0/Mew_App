const jwt = require("jsonwebtoken");


function auth(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Not Authorised" });
    const userlogin = jwt.verify(token, process.env.SECRET_STRING);
    req._id = userlogin._id;
    req.auth = true;
    next();
  } catch (err) {
    res.status(401).json({ error: "Not Authorised" });
  }
}




module.exports =auth;
