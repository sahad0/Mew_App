import { useContext, useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import Autherntication from "../Components/Authenication/authfile"
import FollowingList from "../Components/FollowandUnFollow/followinglist";
import { UserContext } from "../context";



function Following() {

    const [state,setstate] = useContext(UserContext)['state1'];
    const [fpeople,setfpeople] = useState([]);


    useEffect(()=>{
        fetchFollowing();
    },[]);

    async function fetchFollowing(){
        try {
            const following = await axios.get("/fetchFollowers");
            setfpeople(following.data);
        } catch (err) {
            toast.error(err.response.data.err_msg);
        }
        
    }
    const haveImage=(user)=>{
        if(user.image){
            return user.image.url;
        }
        else{
            return "./images/avatar.jpg";
        }
        
    }

    async function handleUnFollow(user){
        try {
            const unfollow = await axios.put("/unfollowhandle",{_id:user._id});
            
            window.localStorage.setItem("auth",JSON.stringify(unfollow.data.rmvefollow));
            //rerender_list
            
            let updatelist = fpeople.filter((p)=>
            {
                if(p._id !== user._id){
                    return p;
                }
                
                 
            });
            
            
            setfpeople(updatelist);
            //context
            setstate(unfollow.data.rmvefollow);
            toast(`Unfollowed💔 ${user.name}`);
            

        } catch (err) {
            toast.error(err.response.data.err_msg);
        }
    }





    return (
        <Autherntication>
            <h1 className="display-5 text-center p-5">Following</h1>
            <FollowingList fpeople={fpeople} haveImage={haveImage} handleUnFollow={handleUnFollow} />
        </Autherntication>
    )
};

export default Following;