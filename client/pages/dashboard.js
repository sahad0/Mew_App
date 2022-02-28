import Autherntication from "../Components/Authenication/authfile";
import DashBoardComponent from "../Components/DashboardComponent/dashboardComponent";
import {  useContext, useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {UserContext} from "../context"



function Dashboard() {
    const[state,setstate] = useContext(UserContext)['state1'];
    const [img,setImg] = useState("");

    useEffect(()=>{
        imgCheck();
    },[state]);

    function imgCheck(){
        if(state){
            if(state.image){
                setImg(state.image.url);
            }
            else{
                setImg("./images/avatar.jpg");
            }
            
        }
        else{
            setImg("./images/avatar.jpg");
        }
    }
    async function handleImage(e){
        const files = e.target.files[0];
        let formData = new FormData();
        formData.append("image",files);
        
        try{
            const imageupload = await axios.put("/profileImg",formData);
            if(imageupload){
                window.localStorage.setItem("auth",JSON.stringify(imageupload.data.user));
                setstate(imageupload.data.user);
            }

        }
        catch(err){
            
            toast.error("Image Size too big!");
        }
    }

    useEffect(()=>{
        window.localStorage.getItem("update") && window.localStorage.removeItem("update"); //for update removal
        window.localStorage.getItem("profile") && window.localStorage.removeItem("profile");
    },[]);

    

    return (
        (
        <Autherntication>
            <div className="container-fluid ">
                <div className = "row">
                    <div className="col">
                        <h1 className="display-5 text-center p-2">DashBoard</h1>             {/*Header */}
                    </div>
                </div>
            </div>
            <DashBoardComponent state={state}  img={img}  handleImage={handleImage} />
            
        </Autherntication>
            )
        );
};

export default Dashboard;