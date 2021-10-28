import {  useContext, useEffect, useState } from "react";
import {toast} from "react-toastify";
import { UserContext } from "../context";



function Home(){
    const [cookieinfo,setcookieinfo] = useState(false);                             //Toastify fn
    const[cookiestate,setcookiestate] = useContext(UserContext)['cookies'];


    useEffect(()=>{
        setcookieinfo(true);
        !cookiestate && cleartokens();
        cookiefn();
    },[]);


     function cookiefn(){
        if(cookieinfo){                                                             //Toastify fn
            toast.info(`This site uses Cookies!`);
        }
    }

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