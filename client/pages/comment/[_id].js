import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import renderHTML from "react-render-html";
import { toast } from "react-toastify";
import {MessageTwoTone} from "@ant-design/icons";
import{Avatar,Input,Button} from "antd";
import { UserContext } from "../../context";
import CommentComponent1 from "../../Components/CommentComponent/CommentComponent1";


function allComments() {

    const router = useRouter();
    const[state,setstate] = useContext(UserContext)['state1'];
    const[pId,setPid] = useState("");
    const[post,setPost] = useState([]);
    const[commented,setCommented] = useState([]);
    
    const[c,setC] = useState("");




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
            setCommented(val.data.comments.reverse());
        }
        catch(err){
            toast.error("Not Authorised!");
        }


        
    }

    async function handleComment(){
        try {
            const comment = c;
            const addedComment = await axios.put("/addComment",{comment:comment,_cid:window.localStorage.getItem("comment")});
            
             
            

            
            if(addedComment){
                setC(""); 
                Post(); 
            }
            
            
        } catch (err) {
            toast.error("error");
        }
    }





    


    return (
        <div className="container-fluid">
            <div className="row">
            <div className="col-md-6 mx-3 mt-4">
                <div className="card mt-3">
                    <div className="card-header"> 
                        <div className="row">
                            Comment View 
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

                                    <span><MessageTwoTone  className="mt-3 my-2" style={{fontSize:"22px",marginLeft:"1%"}}/></span><span style={{marginLeft:"2%",}}>{post.comments ? post.comments.length :<></> }</span> <em style={{marginLeft:"1%"}} ><a style={{marginTop:"20px",}}>Comments</a></em>
                                    <div>
                                    <span className="d-flex justify-content-between my-2 mx -4">
                                        <Avatar shape="circle" src={state.image.url? state.image.url : "./images/avatar.jpg"} ></Avatar>
                                        <Input placeholder="Comment"  onChange={(e)=>{setC(e.target.value)}} value={c} />
                                        <Button type="primary" onClick={handleComment} >Send</Button>
                                    </span>
                                    </div>
                                </div>  
                                <CommentComponent1 post={post} commented={commented} />  
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
                                    <span><MessageTwoTone  className="mt-3 my-2" style={{fontSize:"22px",marginLeft:"1%"}}/></span><span style={{marginLeft:"2%",}}>{post.comments ? post.comments.length :<></> }</span> <em style={{marginLeft:"1%"}} ><a style={{marginTop:"20px",}}>Comments</a></em>

                                    <span className="d-flex justify-content-between my-2 mx -4">
                                    <Input placeholder="Comment"  onChange={(e)=>{setC(e.target.value)}} value={c} />
                                        <Button type="primary" onClick={handleComment} >Send</Button>
                                    </span>
                                    <CommentComponent1  commented={commented}/>  
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