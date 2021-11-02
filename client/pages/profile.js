
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import ProfilePage from "../Components/AuthComponents/Profile";
import Autherntication from "../Components/Authenication/authfile";


function Profile() {
    
    
    
    const[state,setstate] = useContext(UserContext)['state1'];
    const[id,setID] = useState("");
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[about,setAbout] = useState("");

    const router = useRouter();

    
    useEffect(()=>{
    
        let ls = JSON.parse(window.localStorage.getItem("auth"));
        setID(ls.userid);
        setName(ls.name);
        setAbout(ls.about);
        setEmail(ls.email);
        
        
    },[])

    async function saveProfile(){
        
        const userData = {
            userid: id,
            name : name,
            about : about,
        }
        try {
            const UserProfile = await axios.put("/profileupdate",userData);
            if(UserProfile){
                
                window.localStorage.setItem('auth',JSON.stringify(UserProfile.data.user));

                
                    setstate(UserProfile.data.user);  
                
                toast.success("User Updated!");
                router.push("/newsfeed");
            }
        } catch (err) {
            toast.error(err.response.data.err_msg);
        }
        
        
    }
    
        


    return (
    <Autherntication>
        <ProfilePage setID={setID} id={id} name={name} setName={setName} email={email} setAbout={setAbout} about={about} saveProfile={saveProfile} />
    </Autherntication>
    )
};

export default Profile;