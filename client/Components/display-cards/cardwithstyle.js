
import {Avatar, Modal} from "antd";
import renderHTML from "react-render-html"
import {MessageTwoTone,HeartTwoTone, HeartFilled, SendOutlined,} from "@ant-design/icons"
import {Button,Input} from "antd"




function Cardstyle({state,card,handleCancel,isModalVisible,setdisplayurl,displayurl,showModal,setdisplaycontents,displaycontents,like,unlike,comment,showComment,commentid,setcommentid}) {
    
    const {TextArea} = Input;

    function displayed(){
        setdisplayurl(card.image.url);
        setdisplaycontents(card.contents);
        showModal();
    }

    function addcomments(_id){
        if(comment===false){
            showComment(true);
            setcommentid(_id);
        }
        else{
            showComment(false);
            setcommentid("");
        }
    }
    
    
    

    return(
        <>
        <div className="card-body"> {renderHTML(card.contents)}</div>
        <div className="card-footer"> 
            {card.image.url && (
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
                <span><MessageTwoTone onClick={()=>{addcomments(card._id)}} className="mt-3" style={{fontSize:"22px",marginLeft:"3%"}}/></span>
            </div>  
            {comment  && (commentid === card._id) && (
                <>
                    <span className="d-flex justify-content-between my-2"><Avatar shape="circle" src="./images/avatar.jpg" /><Input placeholder="Comment" style={{width:"80%",}} /><Button type="primary">Send</Button></span>
                    
                </>
            )}
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