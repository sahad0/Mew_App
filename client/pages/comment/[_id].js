import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import renderHTML from "react-render-html";
import { toast } from "react-toastify";


function allComments() {

    const router = useRouter();

    const[pId,setPid] = useState("");
    const[post,setPost] = useState([]);




    useEffect(()=>{
        Post();
       
    },[]);

    



    async function Post(){
        const postId = router.query._id;

        if(postId !== undefined){
            window.localStorage.setItem("comment",postId);
            setPid(postId);
        }
        try{
            const val = await axios.post("/commentPosts",{cd : window.localStorage.getItem("comment")});
            setPost(val.data);
        }
        catch(err){
            toast.error("Not Authorised!");
        }


        
    }



    async function FetchedPost(){
        
    }


    return (
        <div className="container-fluid">
            <div className="row">
            <div className="col-md-6 mx-3 mt-4">
                <div className="card mt-3">
                    <div className="card-header"> 
                        <div className="row">
                            Preview 
                        </div>
                    </div>
                      {post.contents ? (<div className="card-body"> {renderHTML(post.contents) }</div>):(<></>)}      
                    
                     
                        {post.image   ? post.image.url != "" ?(
                            <>
                                <div className="card-footer">
                                    <div className="photos" style={
                                        {backgroundImage:"url(" + post.image.url + ")",
                                        backgroundSize:"cover",
                                        backgroundRepeat:"no-repeat",
                                        height:"400px",
                                        backgroundPosition:"center center"}}>
                                    </div>
                                </div>    
                            </>
                        ):(<>
                            <div className="card-footer">
                                    <div className="photos" style={
                                        {
                                        backgroundSize:"cover",
                                        backgroundRepeat:"no-repeat",
                                        height:"10px",
                                        backgroundPosition:"center center"}}>
                                    </div>
                            </div>   
                        
                        </>
                            
                        ):<></>}
                        
                    
                </div>
            </div>
        </div>
        </div>
    );
};

export default allComments;