import {Comment,Avatar} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";

function CommentComponent1({commented}) {

    

    
   
    
   
    if(commented && commented.length>0){
        // commented = commented.reverse();
        

        return(
            
            <div className="card" >

                
                {commented.map((c)=>{
                    return (
                        <div className="card-header" key={c._id}>
                            <Comment
                                
                                author={<div>{c.postedBy.name}</div>}
                                avatar={
                                    <>
                                       <Avatar src={c.postedBy.image ? c.postedBy.image.url : "../images/avatar.jpg"} alt="Image" />
                                        
                                    </>}
                                content={
                                    <p>
                                    {c.text}
                                    </p>
                                }
                                datetime={
                                    moment(c.created).fromNow()
                                    
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

export default CommentComponent1;