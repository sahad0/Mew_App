import { useContext, useState } from "react";
import {TextField ,Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../context";
import {useRouter} from"next/router";
import Loginform from "../Components/AuthComponents/Loginform";


function Login(){

    const [loginemail,setLoginemail] = useState("");
    const [loginpass,setLoginpass] = useState("");

    const [state,setstate] = useContext(UserContext)['state1'];                       //context
    const [cookiestate,setcookiestate] = useContext(UserContext)['cookies'];
    const router = useRouter();                                             //router

    async function loginfunction(e){
        e.preventDefault();
        try{
            const loginData = {
                email : loginemail,
                pass : loginpass,
            }
            const loginsuccess = await axios.post(`/login`,loginData);
            

            const biscuit = await axios.get(`/loggedIn`);
            if(biscuit){
                setstate(biscuit.data.user);  
                window.localStorage.setItem('auth',JSON.stringify(biscuit.data.user));
                setcookiestate(biscuit.data._id);
                window.localStorage.setItem('token',JSON.stringify(biscuit.data._id));
            }

            toast.success("Welcome to Mew!");
            router.push("/newsfeed");
        }
        catch(err){
            
            toast.error("Internal Server Error!");
        }
    }
    state!==null && router.push("/newsfeed");

    return(
        <Loginform loginfunction={loginfunction} setLoginemail={setLoginemail} setLoginpass={setLoginpass} loginemail={loginemail} loginpass={loginpass} TextField={TextField} Button={Button} />
    );
}
export default Login;