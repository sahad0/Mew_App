import axios from "axios";
import React, {  useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Autherntication from "../Components/Authenication/authfile";
import PostCards from "../Components/display-cards/postcards";
import CreatePost from "../Components/Forms/Createpostform";
import { UserContext } from "../context";
import Suggestions from "../Components/Suggestions/suggestion";
import {useRouter} from "next/router";
import SearchForm from "../Components/Forms/SearchForm";


function Newsfeed() {
    //Context
    const[state,setstate] = useContext(UserContext)['state1'];

    
    //post contents-- Text editor
    const [content,setcontent] = useState("");   
    //post images   -- Text Editor  
    const [image,setImage] = useState({
        url:"",
        public_id: "",
    });
    //---Image loading symbol state
    const [loading,setLoading] = useState(false);



    //posts array state
    let [cards,setCards] = useState([]);
    //ROUTER
    const router = useRouter();

    //delete states
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);//delete okay or not modal
    const [deletedid,setdeletedid] = useState("");
    const [okdelete,setokaydelete] = useState(false);


    //Suggestion State
    const[people,setpeople] = useState([]);

    //show and hide text editor
    const[teditor,showteditor] = useState(false);

    //infinity scroll
    const[getinfinity,setinfinity] = useState(false);
    //page no infinity scroll
    const[page,setPage] = useState(1);
    //restrict page
    const[restrict,setRestrict] = useState(true);


    

    //fixing  button on rich editor empty content
    useEffect(()=>{
        if(content === "<p><br></p>"){              
            setcontent("")
        }
    },[content]);
    

     useEffect(()=>{
         setTimeout(()=>{
            infinityPost();
            setPage(page+1);
         },1000);
        
        //friend Suggestion
        findSuggestions();           
     },[state && state.token]);

    //on return from update page removes update key from local storage (toggling post keys)
    useEffect(()=>{
        window.localStorage.getItem("update") && window.localStorage.removeItem("update"); 
    },[]);



    //Modal appearing before delete
    useEffect(()=>{
        if(deletedid.length>0){
            setIsDeleteModalVisible(true);
        }
    },[deletedid]);
    //takes effect when set okay on modal
    useEffect(()=>{
        if(okdelete === true){
            deletethepost();
            
            setokaydelete(false);
        }
        
    },[okdelete]);

    //infinity scroll
    useEffect(()=>{
        if(getinfinity){
            if(restrict!==false){
                setPage(page+1);
            }
            
            infinityPost();
            setinfinity(false);
        }
        
        
    },[getinfinity]);




//Part One Functions

//Making a post in text editor
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
                setPage(1);
                setTimeout(()=>{
                    router.reload(window.location.pathname);
                },2000);
                
            }
            setcontent("");
            setImage({
                url : "",
                public_id : "",
            });
            showteditor(false);
            toast.success("Post Created!");
            
        }
        catch(err){
            return toast.error("Internal Server Error");
        }
    }


    //handling image and getting url and setting up in state
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

    //refetching posts for certain constions like update and delete
    async function userPost(){
        try{
            // const {data} = await axios.get("/followerspost");     //refetch posts especialy for after delete and update !important
            setCards(cards);
            
        }
        catch(err){
            console.log(err);
        }
    }
    //infinite scroll call
    async function infinityPost(){
        if(restrict!==false)
        {    try{
                
                    const {data} = await axios.get(`/infinitypost/${page}`);     //refetch posts especialy for after delete and update !important

                    if(data.length==0){
                        setRestrict(false);
                    }
                
                
                if(data){
                    setTimeout(()=>{

                    },500);
                    setCards([...cards,...data]); 
                    
                }
                
            }
            catch(err){
                console.log(err);
            }}
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
                setPage(0);
                setTimeout(()=>{
                    router.reload(window.location.pathname);
                },3000);
                
            }
             toast.warning("Post Deleted");
             
          
         } 
         catch (err) {
             console.log(err);
         }
     }




//Part Two functions 
    async function findSuggestions(){
        try{
            const {data} = await axios.get("/suggest");
            setpeople(data);
        }
        catch(err){
            toast.error(err.response.data.err_msg);
        }
        
    }
    
    
    //infinity scroll
    const onscroll = function(){
        var difference = document.documentElement.scrollHeight - window.innerHeight;
        var scrollposition = document.documentElement.scrollTop;
        
        if (difference - scrollposition <= 2)
        { 
            
            setinfinity(true);
            
            
        }
        else{
            setinfinity(false);
        }
    }
           
        
    
    
    
    
    return(
        <Autherntication>
            <div className="container-fluid" onPointerOver={onscroll} >
                 <SearchForm />
                <div className="row py-3 ">
                    <div className="col-md-7">
                        <div><CreatePost content={content} setcontent={setcontent} contentextract={contentextract} handleImage={handleImage} loading={loading} image={image} teditor={teditor}showteditor={showteditor} /></div>
                        <div><img src="./images/mew_news.png" draggable="false" className="unicorn"></img></div>
                    </div>
                    <div className="col-md-2"> </div>
                    <div className="col-md-3 wow" >
                        <h5 style={{fontStyle:"italic"}} align="center">Friends You may Know!</h5>
                        <Suggestions  people={people}  setstate={setstate} setpeople={setpeople} userPost={userPost}/>
        
                    </div>
                </div>
                <div className="row py-3 " >
                    <div className="col-md-6">
                        <PostCards  cards={cards} setCards={setCards} deletehandleCancel={deletehandleCancel} deletehandleOk={deletehandleOk} isDeleteModalVisible={isDeleteModalVisible} setdeletedid={setdeletedid} userPost={userPost}/>
                    </div>
                    <div className="col-md-3">
                        </div>

                    

                </div>
            </div>
            

        </Autherntication>
    );
};

export default Newsfeed;