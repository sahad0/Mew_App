import { useContext, useEffect, useState } from "react";
import {useRouter} from "next/router";
import axios from "axios";
import Autherntication from "../../Components/Authenication/authfile";
import { UserContext } from "../../context";
import {UserOutlined,UsergroupAddOutlined,AliwangwangOutlined,HomeOutlined} from "@ant-design/icons";
import Link from "next/link";
import { toast } from "react-toastify";

function ProfileSearch() {

    const[state,setstate] = useContext(UserContext)['state1'];
    const[cookiestate,setcookiestate] = useContext(UserContext)['cookies'];
    const[profiles,setProfiles] = useState("");
    const[img,setImg] = useState("");

    const router = useRouter();

    useEffect(()=>{
        findProfile();
    },[]);

    useEffect(()=>{
        imgCheck();
    },[profiles]);

    function imgCheck(){
        if(profiles){
            if(profiles.image){
                setImg(profiles.image.url);
            }
            else{
                setImg("./images/avatar.jpg");
            }
            
        }
        else{
            setImg("./images/avatar.jpg");
        }
    }


    async function findProfile(){
        try {
            const prof = await axios.get(`/findProf/${router.query._id}`);
            if(prof){
                setProfiles(prof.data);
            }
            
        } catch (err) {
            console.log(err);
        }
        
    }

    function copyUserId(){
        navigator.clipboard.writeText(profiles.userid);
        
        toast.dark("💖 Copied USER TO clipboard");
    }



    return (
        state &&
        (<div className="container" >
    
            <div className="row d-flex my-5">
                <div className="col-md-4">
                    <div className="card dashcard"   >
    
                        <label className="card-header cardbdy"style={{
                            backgroundPosition:"center center",
                            backgroundImage:"url(" + img  + ")",
                            backgroundSize:"cover",
                            backgroundRepeat:"no-repeat",
                            height:"400px",}}>   
                            <input   hidden />
                        </label>
    
                        <div className="card-body ">
                            <h1 className="display-6 text-center" style={{height:"25px",}}>{profiles ? profiles.name : ""}</h1>
                            <p className="text-center">{profiles.about? profiles.about:""}</p>
                            <p className="text-center " ><kbd className="my-2" style={{cursor:"pointer"}} onClick={copyUserId} >{profiles.userid ? profiles.userid : "" }</kbd></p>
                        </div>
                        
                    </div>
                </div>
                <div className="col-md-3"> </div>
    
                <div className="col-md-3 mt-5 " style={{height:"auto",border:"none",}}>
                    <div className="card dashboardcard " style={{border:"none",}}>
                        <div className="card-body" >
                            <div className="row">
                                <div className="col-md-6">
                                    {profiles.followers ? profiles.followers.includes(cookiestate) ? 
                                    (<Link href="/following"><div className="div-container-1 "  style={{height:"100px",borderRadius:"3px"}}><UserOutlined style={{fontSize:"25px"}} />   <div>Unfollow</div> </div></Link>)
                                    : 
                                    (<Link href="/following"><div className="div-container-1 "  style={{height:"100px",borderRadius:"3px"}}><UserOutlined style={{fontSize:"25px"}} />   <div>Follow</div> </div></Link>)
                                    : <></>}
                                    <Link href="/followers"><div className="div-container-1 my-3" style={{height:"100px",borderRadius:"3px"}}><UsergroupAddOutlined style={{fontSize:"25px"}}/><div>Posts</div></div></Link>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>)
    
    )
};

export default ProfileSearch;