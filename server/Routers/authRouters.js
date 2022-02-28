const {register,login,logout,loggedIn,authorised, saveProfile, profileImage,} = require("../controllers/authControllers");
const { contents, imageUpload, userPost, updatePost, saveEdit, deletePost,} = require("../controllers/contentControllers");
const auth = require("../middleware/authentication");
const formidable = require("express-formidable");
const canupdate = require("../middleware/canupdate");

const { addFollow, addFollower, fetchFollowersPost, fetchFollowing, removeFollower, removeFollow, fetchFollowers, fetchInfinityPost } = require("../controllers/FollowUnfollowControllers");
const { liked, unliked } = require("../controllers/likeandUnlikeControllers");
const Suggestions = require("../controllers/suggestionControllers");
const { commentController, removeCommentController, commentPosts } = require("../controllers/commentController");
const { SearchUsers } = require("../controllers/SearchControllers");
const { findProfile } = require("../controllers/ProfileControllers");



const router = require("express").Router();

//register Router
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/loggedIn", auth, loggedIn);
router.get("/authorised", auth, authorised);
router.put("/profileupdate",auth,saveProfile);




//PostContents Routers
router.post("/contentpost",auth,contents);
router.post("/imageUpload",auth,formidable({maxFileSize: 8 * 1024 * 1024}),imageUpload) ;   //npm i cloudinary ,npm i express-formidable
router.get("/userpost",auth,userPost); //userposts
router.get(`/editpost/:_id`,auth,updatePost);   //fetch to update
router.put(`/editsaved/:_id`,auth,canupdate,saveEdit);  //update fetched along with image
router.delete(`/deletethepost/:_id`,auth,canupdate,deletePost); //delete a post made

//ProfileImage router
router.put("/profileImg",auth,formidable({maxFileSize: 8 * 1024 * 1024}),profileImage);


//Basic Routers
router.get("/suggest",auth,Suggestions);
router.put("/followhandle",auth,addFollower,addFollow);
router.put("/unfollowhandle",auth,removeFollower,removeFollow);
router.get("/followerspost",auth,fetchFollowersPost);
router.get("/fetchfollowing",auth,fetchFollowing);
router.get("/fetchfollowers",auth,fetchFollowers);
router.get("/infinitypost/:page",auth,fetchInfinityPost);





//Like and Unlike Routers
router.put("/like",auth,liked);
router.put("/unlike",auth,unliked);



//Comment Router
router.put("/addComment",auth,commentController);
router.put("/addComment",auth,removeCommentController);
router.post("/commentPosts",auth,commentPosts);






//search Router
router.post("/fetchSearch",auth,SearchUsers);



//findProfile Rouets

router.get("/findProf/:_id",auth,findProfile);

module.exports = router;
