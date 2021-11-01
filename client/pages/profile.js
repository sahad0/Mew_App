import {Input,Button} from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import {toast} from "react-toastify";
import {useRouter, UseRouter} from "next/router";



function Profile() {
    const { TextArea } = Input;
    
    
    const[state,setstate] = useContext(UserContext)['state1'];
    const[id,setID] = useState("");
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[about,setAbout] = useState("");

    const router = useRouter();

    
    useEffect(()=>{
    
        const ls = JSON.parse(window.localStorage.getItem("auth"));
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
    <>
        <div className="container">

            <div className="col">
                <h1 className="display-5 text-center p-5">Profile</h1>             {/*Header */}
            </div>

            <div className="row" >
                <div className="col-md-6" >
                    <div className="card" style={{borderRadius:"8px",}}  >
                        <div className="card-body">
                            <Input size="large" className=" my-1" style={{fontStyle:"italic",}} placeholder="UserID" onChange={(e)=>{setID(e.target.value)}} value={id} />
                            <Input size="large" className=" my-1" style={{fontStyle:"italic",}} placeholder="Name" onChange={(e)=>{setName(e.target.value)}} value={name}/>
                            <Input size="large" className=" my-1" style={{fontStyle:"italic",}} placeholder="Email" disabled value={email}/>
                            
                            <TextArea rows={4} className=" my-1" placeholder="About Me" style={{resize:"none",}} onChange={(e)=>{setAbout(e.target.value)}} value={about}/>
                            <span>
                                <Button type="primary"  style={{backgroundColor:"#5CB85C",border:"#5CB85C",fontStyle:"italic"}} className="my-3" onClick={saveProfile}> Save</Button>
                                <Button type="primary"  className="my-3 mx-2" style={{backgroundColor:"#A020F0",border:"#A020F0",fontStyle:"italic",}} >Update Password</Button>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <img  src="./images/straw1.png" style={{marginLeft:"40%",position:"relative",width:"70%",height:"95%",}} />
                </div>
            </div>
        </div>
    </>
    )
};

export default Profile;