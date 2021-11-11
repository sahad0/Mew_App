import {  useContext, useEffect, useState } from "react";
import {toast} from "react-toastify";
import { UserContext } from "../context";



function Home(){
    
    const[cookiestate,setcookiestate] = useContext(UserContext)['cookies'];


    useEffect(()=>{
        window.localStorage.getItem("update") && window.localStorage.removeItem("update"); //for update removal
        
        !cookiestate && cleartokens();
        
    },[]);


     

    function cleartokens(){
        window.localStorage.removeItem('auth');
        window.localStorage.removeItem('token');
    } 
    

    return(
        <div className = "container-fluid" >
        
        {!cookiestate && (
            <>
            <div className = "row">
                <h1 className="display-1 text-center py-5">Welcome to Mew</h1>
                <div className="col-md-6">
                    
                 

                </div>
                <div className="col-md-6">
                    
                    <img className="imgmew" src="./images/mew.png" />
                    
                </div>
                
            </div>
            </>)}
            
        </div>
    );
}
export default Home;