import { List, Avatar ,Button} from 'antd';
import { useContext, useEffect, useState } from 'react';
import {useRouter} from "next/router";


import { UserContext } from '../../context';
import axios from 'axios';
import { toast } from 'react-toastify';

function SearchResults({showSearch,results,haveImage,checkStatus}) {
    const[state,setstate] = useContext(UserContext)['state1'];
    const [cookiestate,setcookiestate] = useContext(UserContext)['cookies'];
    const router = useRouter();


    async function handleFollow(user){
        try {
            const follow = await axios.put("/followhandle",{_id:user});
            //localstorage
            
            window.localStorage.setItem("auth",JSON.stringify(follow.data.add));
            //rerender_list

            //context
            setstate(follow.data.add);
            
            
            toast("Following 💕");
            
            
        } catch (error) {
            console.log(error);
        }
        
    }



    async function handleUnFollow(user){
        try {
            const unfollow = await axios.put("/unfollowhandle",{_id:user});
            
            window.localStorage.setItem("auth",JSON.stringify(unfollow.data.rmvefollow));
            //rerender_list
            //context
            setstate(unfollow.data.rmvefollow);
            
            toast(`Unfollowed💔 `);
            

        } catch (err) {
            console.log(err);
        }
    }



    

    





    if(showSearch){

        return (
            <>
            <div className="col-md-4" style={{height:"0px",}}>
                <div className="card-body" style={{overflowY:"scroll",height:"330px",scrollbarWidth:"none",zIndex:"1",}}>
                    <List className="sm" style={{backgroundColor:"white",}}
                        itemLayout="horizontal"
                        dataSource={results}
                        renderItem={(user) => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={<Avatar shape="square" size="large" src={haveImage(user)} />}
                            title={<div className="d-flex justify-content-between py-2">
                                    <a onClick={()=>{router.push(`profile/${user._id}`)}} style={{fontStyle:"italic"}}>{user.name}</a>
                                    {state.following.includes(user._id)?
                                        (<Button id="fbtn" type="primary" onClick={()=>{handleUnFollow(user._id)}} style={{cursor:"pointer",backgroundColor:"#B19CD9",border:"#B19CD9"}}>{"Unfollow"}</Button>)
                                        :
                                        (<Button id="fbtn" type="primary" onClick={()=>{handleFollow(user._id)}} style={{cursor:"pointer",backgroundColor:"#B19CD9",border:"#B19CD9"}}>{"Follow"}</Button>)
                                    }
                                    
                                </div>
                                }
                            
                            />
                        </List.Item>
                        )}
                    />
                </div>
                
            </div>
            </>
        )
    }
    else{
        return <div> </div>
    }
   
    
};

export default SearchResults;