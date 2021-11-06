import {Comment,Avatar,Tooltip} from "antd";
import moment from "moment";

function CommentComponent({card}) {


    
   
    if(card.comments && card.comments.length>0){
        return(
            
            <div className="card" >
                
                {card.comments.slice(-2).map((c,i)=>{
                    return (
                        <div className="card-header" key={c._id}>
                            <Comment
                                
                                author={<div>{c.postedBy.name}</div>}
                                avatar={
                                    <>
                                        <Avatar src={c.postedBy.image ? c.postedBy.image.url : "./images/avatar.jpg"} alt="Image" />
                                        
                                    </>}
                                content={
                                    <p>
                                    {c.text}
                                    </p>
                                }
                                datetime={
                                    <Tooltip title={moment().format('HH:mm:ss')}>
                                    <span>{moment(c.createdAt).fromNow()}</span>
                                    </Tooltip>
                                }
                                
                            />
                        </div>
                    );
                })}
                
            </div>
            
        )
    }
    else{
        return (
            <div></div>
        )
    }
    
};

export default CommentComponent;