import axios from "axios";
import React, {  useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Autherntication from "../Components/Authenication/authfile";
import PostCards from "../Components/display-cards/postcards";
import CreatePost from "../Components/Forms/Createpostform";
import { UserContext } from "../context";


function Newsfeed() {

    
    const[state,setstate] = useContext(UserContext)['state1'];
    const [content,setcontent] = useState("");          //contents
    const [image,setImage] = useState({
        url:"",
        public_id: "",
    });
    const [loading,setLoading] = useState(false);

    const [cards,setCards] = useState([]);



    useEffect(()=>{
        if(content === "<p><br></p>"){              //disable button
            setcontent("")
        }
    },[content]);

     useEffect(()=>{
       userPost();
     },[state && state.token]);

     useEffect(()=>{
        window.localStorage.getItem("update") && window.localStorage.removeItem("update"); //for update removal
    },[]);


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
            setcontent("");
            setImage({
                url : "",
                public_id : "",
            });
            toast.success("Post Created!");
            userPost();
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
            const hello = await axios.get("/userpost");
            setCards(hello.data);
            
        }
        catch(err){
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
                        <PostCards cards={cards}/>
                    </div>
                </div>
            </div>
            

        </Autherntication>
    );
};

export default Newsfeed;