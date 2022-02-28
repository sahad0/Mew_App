
import {Avatar, Modal} from "antd";
import renderHTML from "react-render-html"
import {MessageTwoTone,HeartTwoTone, HeartFilled, SendOutlined,} from "@ant-design/icons"
import {Button,Input} from "antd"
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CommentComponent from "../CommentComponent/CommentComponent";
import { useRouter } from "next/router";





function Cardstyle({state,card,setCards,cards,handleCancel,isModalVisible,setdisplayurl,displayurl,showModal,setdisplaycontents,displaycontents,like,unlike,comment,showComment,commentid,setcommentid,userPost}) {
    
    const router = useRouter();




    const [commentImage,setcommentImage] = useState("");
    const [grabComment,setGrabComment] = useState("");
    const [commentPosted,setCommentPosted] = useState(false);

    //effect to run on comment posted
    useEffect(()=>{
        if(true){
            userPost();
            setCommentPosted(false);
        }
    },[commentPosted]);
    
    //card modal
    function displayed(){
        setdisplayurl(card.image.url);
        setdisplaycontents(card.contents);
        showModal();
    }
    //profile toggler default and user image 
    function CommentProfileImage(){
        if(state.image){
            setcommentImage(state.image.url);
        }
        else{
            setcommentImage("./images/avatar.jpg");
        }
    }
    //comment toggler
    function addcomments(_id){
        if(comment===false){
            showComment(true);
            setcommentid(_id);
            CommentProfileImage();
        }
        else{
            showComment(false);
            setcommentid("");
        }
    }

    //handle comment on click
    async function handleComment(){
        try {
            const comment = grabComment;
            const addedComment = await axios.put("/addComment",{comment:comment,_cid:commentid});
            let carray = [...cards];
            
            let updated = carray.filter((p)=>{
                if(p._id==commentid){
                    p.comments = addedComment.data.comments
                }   
            })
            
            if(addedComment){
                setGrabComment("");
                showComment(false);
                setCommentPosted(true);
                setCards(updated);
                userPost();
                
            }
            
            
        } catch (err) {
            toast.error("error");
        }
    }
    
    
    
    

    return(
        <>
        <div className="card-body"> {renderHTML(card.contents)}</div>
        <div className="card-footer"> 
            {card.image && card.image.url && (
                <>
                    <div className="photos" onClick={displayed} style={
                        {backgroundImage:"url(" + card.image.url + ")",
                        backgroundSize:"cover",
                        backgroundRepeat:"no-repeat",
                        height:"400px",
                        backgroundPosition:"center center"}}>
                    </div>

                    
                </>
            )}
            <div>
                <span>{
                    card.likes.includes(state ? state._id : "" ) ? 
                    (<>
                        <HeartFilled  onClick={()=>unlike(card._id)}  className="mt-3" style={{color:"#eb2f96", fontSize:"24px",marginLeft:"3px",}}/><span style={{marginLeft:"2%",}}>{card.likes.length }</span> <em style={{marginLeft:"1%"}}>Likes</em>
                        
                    </>)
                    
                    
                    :
                    (<>
                        <HeartTwoTone twoToneColor="#eb2f96" onClick={()=>like(card._id)} className="mt-3" style={{fontSize:"24px",marginLeft:"3px"}} /><span style={{marginLeft:"2%",}}>{card.likes.length }</span> <em style={{marginLeft:"1%"}}>Likes</em>
                    </> )
                    
                    }
                </span> 
                <span><MessageTwoTone onClick={()=>{addcomments(card._id)}} className="mt-3" style={{fontSize:"22px",marginLeft:"3%"}}/></span><span style={{marginLeft:"2%",}}>{card.comments.length }</span> <em style={{marginLeft:"1%"}} ><a onClick={()=>{router.push(`comment/${card._id}`)}}>Comments</a></em>
            </div>  
            {comment  && (commentid === card._id) && (
                <>
                    <span className="d-flex justify-content-between my-2">
                        <Avatar shape="circle" src={commentImage} ></Avatar>
                        <Input placeholder="Comment" onChange={(e)=>{setGrabComment(e.target.value)}} value={grabComment} style={{width:"80%",}} />
                        <Button type="primary" onClick={handleComment}>Send</Button></span>
                    
                </>
            )}
            <div>
                <CommentComponent card={card} />
            </div>
        </div>


        <Modal title={renderHTML(displaycontents)} centered visible={isModalVisible}  onCancel={handleCancel} footer={null}  width={1000}>
            <div style={
            { backgroundPosition:"center center",
              backgroundImage:"url(" + displayurl + ")",
              backgroundSize:"contain",
              backgroundRepeat:"no-repeat",
              height:"500px",
            }}>

            </div>
        </Modal>
        </>
    )
};

export default Cardstyle;   