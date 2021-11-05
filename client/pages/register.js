import { useContext, useState } from "react";
import axios from "axios";
import {useRouter } from "next/router";
import { toast } from "react-toastify";
import React from "react";

import Registerform from "../Components/AuthComponents/Registerform";
import { UserContext } from "../context";





function Register(){


   

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    const [rpass,setRpass] = useState("");
    const [secret,setSecret] = useState("");

    const [loading,setloading] = useState(false);

    const [state,setstate] = useContext(UserContext)['state1'];                       //context
    const [cookiestate,setcookiestate] = useContext(UserContext)['cookies'];
    


    const router = useRouter();

    async function registerfunction(e){
        e.preventDefault();
        const registerData = {
            name : name,
            email : email,
            pass : pass,
            rpass : rpass,
            secret :secret,
        }
        try{
            setloading(true);
             await axios.post(`/register`,registerData);

            const biscuit = await axios.get(`${process.env.NEXT_PUBLIC_MEWAPP}/loggedIn`);
            if(biscuit){
                setstate(JSON.stringify(biscuit.data.user));  
                window.localStorage.setItem('auth',JSON.stringify(biscuit.data.user));
                setcookiestate(biscuit.data._id);
                window.localStorage.setItem('token',JSON.stringify(biscuit.data._id));
            }
 
            
             

            
            toast.success("Successfully Registered");
            setName("");
            setEmail("");
            setPass("");
            setRpass("");
            setSecret("");
            setloading(false);
            router.push("/");
            
        }
        catch(err){
            console.log(err);
            toast.error(err.response.data.err_msg);
            setloading(false);
            
        }
        
    }

    state!==null && router.push("/");




    return(
        
        <div className = "container">
            
            <div className = "row">
                <div className="col">
                    <h1 className="display-1 text-center py-5">Sign Up</h1>             {/*Header */}
                </div>


            
                <div className="row">    {/*Input fields*/}

                    <div className="col-md-6 ">                                                             
                        <Registerform registerfunction={registerfunction} 
                        setName={setName} setEmail={setEmail} setPass={setPass} setRpass={setRpass} setSecret={setSecret} 
                        name={name} email={email} pass={pass} rpass={rpass} secret={secret} />

                    </div>


                    <div className="col-md-4">
                        <img className=" candyimg img-responsive " draggable="false" src="./images/Screenshot_5.png" />



                    </div>

                </div>
            </div>

        </div>
    );
}
export default Register;