import axios from "axios";
import React, {  useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Autherntication from "../Components/Authenication/authfile";
import PostCards from "../Components/display-cards/postcards";
import CreatePost from "../Components/Forms/Createpostform";
import { UserContext } from "../context";


function Newsfeed() {

    //fetch states and set card
    const[state,setstate] = useContext(UserContext)['state1'];
    const [content,setcontent] = useState("");          //contents
    const [image,setImage] = useState({
        url:"",
        public_id: "",
    });
    const [loading,setLoading] = useState(false);

    const [cards,setCards] = useState([]);



    //delete states
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);//delete okay or not modal
    const [deletedid,setdeletedid] = useState("");
    const [okdelete,setokaydelete] = useState(false);



    useEffect(()=>{
        if(content === "<p><br></p>"){              //disable button on rich editor empty content
            setcontent("")
        }
    },[content]);
    

     useEffect(()=>{
       userPost();                  //fetch on mount
     },[state && state.token]);

     useEffect(()=>{
        window.localStorage.getItem("update") && window.localStorage.removeItem("update"); //for update removal 
    },[]);



    //delete useeffects
    useEffect(()=>{
        if(deletedid.length>0){
            setIsDeleteModalVisible(true);
        }
    },[deletedid]);

    useEffect(()=>{
        if(okdelete === true){
            deletethepost();
            
            setokaydelete(false);
        }
        
    },[okdelete]);




//fetch post  and create post functions
    async function contentextract(e){
        e.preventDefault();
        try{
            const datacontents = {
                contents : content,
                image:image,
            }
            const createpost = await axios.post("/contentpost",datacontents);
            if(!createpost){
               return toast.error("Contents are required");
            }
            if(createpost){
                setTimeout(()=>{
                    userPost();
                },2000)
                
            }
            setcontent("");
            setImage({
                url : "",
                public_id : "",
            });
            
            toast.success("Post Created!");
            
        }
        catch(err){
            return toast.error("Internal Server Error");
        }
    }
    async function handleImage(e){
        const files = e.target.files[0];
        let formData = new FormData();
        formData.append("image",files);
        setLoading(true);
        try{
            const imageupload = await axios.post("/imageUpload",formData);
            setImage({
                url : imageupload.data.url,
                public_id : imageupload.data.public_id,
            });
            setLoading(false);
        }
        catch(err){
            setLoading(false);
            toast.error("Image updload Failed!Check with the Dev!");
        }
    }


    async function userPost(){
        try{
            const hello = await axios.get("/userpost");     //refetch posts especialy for after delete and update !important
            setCards(hello.data);
            
        }
        catch(err){
            console.log(err);
        }
    }



    //delete functions
    function deletehandleOk(){
         
        setIsDeleteModalVisible(false);
        setokaydelete(true);
    };

    function deletehandleCancel(){
        setdeletedid("");
        setIsDeleteModalVisible(false);
    };
     async function deletethepost(){
         try {
         
             const deleted = await axios.delete(`/deletethepost/${deletedid}`);
             setdeletedid("");
             if(deleted){
                setTimeout(()=>{
                    userPost();
                },2000)
                
            }
             toast.warning("Post Deleted");
             
          
         } 
         catch (err) {
             console.log(err);
         }
     }



    
    
    
    return(
        <Autherntication>
            <div className="container">
                <div className="row py-3 ">
                    <div className="col-md-7"><CreatePost content={content} setcontent={setcontent} contentextract={contentextract} handleImage={handleImage} loading={loading} image={image}/>
                    </div>
                    <div className="col-md-4">Sidebar</div>
                </div>
                <div className="row py-3 ">
                    <div className="col-md-6">
                        <PostCards cards={cards} deletehandleCancel={deletehandleCancel} deletehandleOk={deletehandleOk} isDeleteModalVisible={isDeleteModalVisible} setdeletedid={setdeletedid}/>
                    </div>
                </div>
            </div>
            

        </Autherntication>
    );
};

export default Newsfeed;