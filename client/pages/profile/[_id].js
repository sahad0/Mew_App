import { useContext, useEffect, useState } from "react";
import {useRouter} from "next/router";
import axios from "axios";
import { UserContext } from "../../context";
import {UserOutlined,UsergroupAddOutlined,AliwangwangOutlined,HomeOutlined} from "@ant-design/icons";
import Link from "next/link";
import { toast } from "react-toastify";


function ProfileSearch() {

    const[state,setstate] = useContext(UserContext)['state1'];
    const[cookiestate,setcookiestate] = useContext(UserContext)['cookies'];
    const[profiles,setProfiles] = useState("");
    const[img,setImg] = useState("");
    const[fl,setFl] = useState("");

    const router = useRouter();

    useEffect(()=>{
        if(router.query._id !== undefined){
            window.localStorage.setItem("profile",router.query._id);
        }
        findProfile();
        checkfollow();
    },[]);

    useEffect(()=>{
        imgCheck();
    },[profiles]);

    function checkfollow(){
        if(state){
            if(state.following.includes(window.localStorage.getItem("profile"))){
                setFl("Unfollow");
            }
            else{
                setFl("Follow");
            }
        }
        
    }
    

    function imgCheck(){
        if(profiles){
            if(profiles.image){
                setImg(profiles.image.url);
            }
            else{
                setImg("../images/avatar.jpg");
            }
            
        }
        else{
            setImg("../images/avatar.jpg");
        }
    }


    async function findProfile(){
        try {
            const prof = await axios.get(`/findProf/${window.localStorage.getItem("profile")}`);
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

    function handle(){
        if(fl=="Unfollow"){
                setFl("Follow");
                handleUnFollow(router.query._id)
        }
        else if(fl=="Follow"){
            setFl("Unfollow");
            handleFollow(router.query._id);
        }
    }


    return (
        state &&
        (<div className="container" >
    
            <div className="row d-flex my-5">
                <div className="col-md-4">
                    <div className="card dashcard"   >
    
                        <label className="card-header cardbdy"style={{
                            backgroundPosition:"center center",
                            backgroundImage:"url("+ img +")",
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
                                    
                                    <div className="div-container-1 " onClick={handle}  style={{height:"100px",borderRadius:"3px"}}><UserOutlined style={{fontSize:"25px"}} />  
                                     <div> {fl}</div> </div>
                                    
                                    
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