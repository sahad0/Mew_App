
import moment  from "moment";
import {Avatar} from "antd";
import Cardstyle from "./cardwithstyle";
import { useContext, useState } from "react";
import { UserContext } from "../../context";
import {EditFilled,DeleteOutlined} from "@ant-design/icons"
//react-render-html , moment
function PostCards({cards}) {

    const[cookiestate,setcookiestate] = useContext(UserContext)['cookies'];

    const [isModalVisible, setIsModalVisible] = useState(false);
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
            <div key={card.public_id} className="card mb-5">
                <div className="card-header"> 
                    <span>{(<Avatar size={40}>{card.postedBy.name[0]}</Avatar>)} </span>   
                    <span className="m-2">{card.postedBy.name}</span>   
                    <span className="m-2">{moment(card.createdAt).fromNow()}</span> 
                    <span>{cookiestate===card.postedBy._id && (<EditFilled className="mt-4 " style={{fontSize:"20px",marginLeft:"35%"}} />) } </span> 
                    <span>{cookiestate===card.postedBy._id && (<DeleteOutlined className="mt-4 " style={{fontSize:"21px",marginLeft:"2%"}} />)}</span>
                </div>
                {card.image && (<Cardstyle card={card}   handleCancel={handleCancel}showModal={showModal}  isModalVisible={isModalVisible} setdisplayurl={setdisplayurl} displayurl={displayurl} displaycontents={displaycontents} setdisplaycontents={setdisplaycontents}/>        
                )}
            </div>
            
            )
            
        
        })
    }
    else{
        return <>Hello</>
    }
}
export default PostCards;
