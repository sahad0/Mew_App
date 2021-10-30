
import moment  from "moment";
import {Avatar} from "antd";
import Cardstyle from "./cardwithstyle";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";
import {EditFilled,DeleteOutlined} from "@ant-design/icons"
import {useRouter} from "next/router";
import DeleteModal from "../Modals/DeleteModal";
import axios from "axios";
//react-render-html , moment


function PostCards({cards,deletehandleCancel,deletehandleOk,isDeleteModalVisible,setdeletedid}) {

    const[cookiestate,setcookiestate] = useContext(UserContext)['cookies'];

    const router = useRouter();



    const [isModalVisible, setIsModalVisible] = useState(false); //postpreview _ modal
    const [displayurl,setdisplayurl] = useState('');
    const [displaycontents,setdisplaycontents] = useState('');

    
  
     


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };



    if(cards){
        return cards.map((card)=>{
            return (
            <div key={card._id} className="card mb-5">
                <div className="card-header"> 
                    <div className="row">
                        <div className="col-sm-10">
                            <span>{(<Avatar size={40}>{card.postedBy.name[0]}</Avatar>)} </span>   
                            <span className="m-2">{card.postedBy.name}</span>   
                            <span className="m-2">{moment(card.createdAt).fromNow()}</span> 
                        </div>
                        <div className="col-sm-2">
                            
                                <span className="m-2">{cookiestate===card.postedBy._id && (<EditFilled onClick={()=>{router.push(`update/${card._id}`);}} className="mt-2 " style={{fontSize:"20px"}} />) } </span> 
                                <span className="m-2">{cookiestate===card.postedBy._id && (<DeleteOutlined onClick={()=>{  setdeletedid(card._id)  }  } className="mt-2 " style={{fontSize:"21px"}} />)}</span>
                            
                        </div>
                    </div>
                </div>
                {card.image && (<Cardstyle card={card}   handleCancel={handleCancel}showModal={showModal}  isModalVisible={isModalVisible} setdisplayurl={setdisplayurl} displayurl={displayurl} displaycontents={displaycontents} setdisplaycontents={setdisplaycontents}/>        
                )}
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
