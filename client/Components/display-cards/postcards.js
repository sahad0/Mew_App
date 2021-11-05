
import moment  from "moment";
import {Avatar} from "antd";
import Cardstyle from "./cardwithstyle";
import { useContext,  useState } from "react";
import { UserContext } from "../../context";
import { DeleteTwoTone, EditTwoTone} from "@ant-design/icons"
import {useRouter} from "next/router";
import DeleteModal from "../Modals/DeleteModal";
import axios from "axios";
import { toast } from "react-toastify";

//react-render-html , moment


function PostCards({cards,deletehandleCancel,deletehandleOk,isDeleteModalVisible,setdeletedid,userPost}) {
    //context
    const[cookiestate,setcookiestate] = useContext(UserContext)['cookies'];

    const[state] = useContext(UserContext)['state1'];

    const router = useRouter();


    //modal states
    const [isModalVisible, setIsModalVisible] = useState(false); //postpreview _ modal
    const [displayurl,setdisplayurl] = useState('');
    const [displaycontents,setdisplaycontents] = useState('');

    
    //comment state
    const [comment,showComment] = useState(false);
     

    //modal on clicking image on post visibility
    const showModal = () => {
        setIsModalVisible(true);
    };
    //handling modal close
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    //default image or profile
    function imgavail(card){
        if(card.postedBy.image){
            return card.postedBy.image.url;
        }
        else{
            return "./images/avatar.jpg";
        }
    }
    //like function
    async function like(_id){
        try {
            const liked = await axios.put("/like",{_id:_id});
            if(liked){
                userPost();
                let audio = new Audio("./music/facebook_pop.mp3");
                audio.play();
            }
            
        } catch (err) {
            toast.error(err.response.data.err_msg);
        }
    } 
    //unlike function
    async function unlike(_id){
        try {
            const unliked = await axios.put("/unlike",{_id:_id});
            if(unliked){
                userPost();
                let audio = new Audio("./music/facebook_pop.mp3");
                audio.play();
                
            }
            
        } catch (err) {
            toast.error(err.response.data.err_msg);
        }
    } 



    if(cards){
        return cards.map((card)=>{
            return (
            <div key={card._id} className="card mb-5">
                <div className="card-header"> 
                    <div className="row" style={{display:"flex",justifyContent:"space-between",}}>
                        <div className="col-sm-10">
                            <span>{(<Avatar size={40} src={imgavail(card)}/>)} </span>   
                            <span className="m-2">{card.postedBy.name}</span>   
                            <span className="m-2">{moment(card.createdAt).fromNow()}</span> 
                        </div>
                        <div className="col-sm-2">
                            
                                <span className="m-2">{cookiestate===card.postedBy._id && (<EditTwoTone twoToneColor="#A9A9A9" onClick={()=>{router.push(`update/${card._id}`);}} className="mt-2 " style={{fontSize:"20px"}} />) } </span> 
                                <span className="m-2">{cookiestate===card.postedBy._id && (<DeleteTwoTone twoToneColor="000000" onClick={()=>{  setdeletedid(card._id)  }  } className="mt-2 " style={{fontSize:"21px"}} />)}</span>
                            
                        </div>
                    </div>
                </div>
                <Cardstyle card={card}   handleCancel={handleCancel}showModal={showModal}  isModalVisible={isModalVisible} setdisplayurl={setdisplayurl} displayurl={displayurl} displaycontents={displaycontents} setdisplaycontents={setdisplaycontents} like={like} unlike={unlike} state={state}comment={comment}showComment={showComment} />        
                
                {<DeleteModal deletehandleOk={deletehandleOk} deletehandleCancel={ deletehandleCancel  } isDeleteModalVisible={isDeleteModalVisible} />}
            </div>
            
            )
            
        
        })
    }
    else{
        return <>Hello</>
    }
}
export default PostCards;
