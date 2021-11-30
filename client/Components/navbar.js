import Link from "next/link"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import {useRouter} from "next/router";
import axios from "axios";
import {toast} from "react-toastify";

function Navbar(){
    const [state,setstate] = useContext(UserContext)['state1'];
    const [cookiestate,setcookiestate] = useContext(UserContext)['cookies'];

    const[current,setCurrent] = useState("");
    const router = useRouter();

    useEffect(()=>{
        state && window.localStorage.getItem("update") && window.localStorage.removeItem("update"); //for update removal
    },[]);
    useEffect(()=>{
        process.browser && setCurrent(window.location.pathname);
    },[process.browser && window.location.pathname]);
    

    async function logBack(){

        

        try{
            await axios.get(`/logout`);
            window.localStorage.removeItem('auth');
            window.localStorage.removeItem('token');
            
            setstate(null);
            setcookiestate(null);
            toast.info("LogOut Successful");
            router.push("/login");
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <div className="container">
            <nav className="nav d-flex  justify-content-center">
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                    <Link href="/"><a className="nav-link" >Home</a></Link>
                    </li>
                    {!state &&  (
                        <> 
                            <li className="nav-item">
                            <Link href="/login"><a className="nav-link" >Login</a></Link>
                            </li>
                            <li className="nav-item">
                            <Link href="/register"><a className="nav-link" >Sign Up</a></Link>
                            </li>
                        </>)
                    }
                    {state &&  (
                        <>
                        <li className="nav-item">
                            <Link href="/profile"><a className="nav-link" >Profile</a></Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/dashboard"><a className="nav-link" >DashBoard</a></Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/newsfeed"><a className="nav-link" >NewsFeed</a></Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " onClick={logBack}>Log-Out</a>
                        </li>
                        
                        </>)
                    }

                    <li className="nav-item">
                    <Link href="/support"><a className="nav-link" >Dev-Support</a></Link>
                    </li>
                </ul>
            </nav> 
        </div>

    );
}
export default Navbar;