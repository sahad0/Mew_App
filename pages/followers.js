import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {UserContext} from "../context";
import Authentication from "../Components/Authenication/authfile";
import FollowersList from "../Components/FollowandUnFollow/followerslist";

function Followers() {

    const[state,setstate] = useContext(UserContext)['state1'];
    const[followers,setFollowers] = useState([]);

    useEffect(()=>{
        followerslist();
    },[])

    async function followerslist(){
        try {
            const followers = await axios.get("/fetchfollowers");
            if(followers){
                setFollowers(followers.data);
            }
            console.log(followers);
        } catch (err) {
            toast.error(err.response.data);
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
    

    return (
        <>
            <Authentication>
            <h1 className="display-5 text-center p-5">Followers</h1>
                {state ? (<FollowersList haveImage={haveImage} followers={followers} />) : ""}
            </Authentication>
        </>
    )
};

export default Followers;