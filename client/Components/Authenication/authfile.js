
import {SyncOutlined} from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-toastify"
import {useRouter} from "next/router";

function Autherntication({children}) {
    const[auth,setauth] = useState(false);
    const router = useRouter();
    useEffect(()=>{
        authenticated();
    },[]);
    async function authenticated(){
        try{
        const authsuccess = await axios.get(`/authorised`);
        if(authsuccess){
            setauth(true);
        }
        }
        catch(err){
            toast.error("Not Authorised");
            router.push("/login");
        }
    }
    return(
        !auth ? (<SyncOutlined spin className="d-flex justify-content-center display-3 p-5"/>) : (<>{children}</>)
    )


};

export default Autherntication;