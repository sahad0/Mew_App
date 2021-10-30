const {register,login,logout,loggedIn,authorised,} = require("../controllers/authControllers");
const { contents, imageUpload, userPost, updatePost, saveEdit, deletePost } = require("../controllers/contentControllers");
const auth = require("../middleware/authentication");
const formidable = require("express-formidable");
const canupdate = require("../middleware/canupdate");

const router = require("express").Router();

//register Router
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/loggedIn", auth, loggedIn);
router.get("/authorised", auth, authorised);




//PostContents Routers
router.post("/contentpost",auth,contents);
router.post("/imageUpload",auth,formidable({maxFileSize: 8 * 1024 * 1024}),imageUpload) ;   //npm i cloudinary ,npm i express-formidable
router.get("/userpost",auth,userPost); //userposts
router.get(`/editpost/:_id`,auth,updatePost);   //fetch to update
router.put(`/editsaved/:_id`,auth,canupdate,saveEdit);  //update fetched along with image
router.delete(`/deletethepost/:_id`,auth,canupdate,deletePost);



module.exports = router;
