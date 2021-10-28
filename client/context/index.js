import {createContext,  useEffect,  useState} from "react";
import axios from "axios";


const UserContext = createContext();
axios.defaults.baseURL = process.env.NEXT_PUBLIC_MEWAPP;

function UserProvider({children}){
    
    const[state,setstate] = useState(null);
    const[cookiestate,setcookiestate] = useState(null);

    useEffect(()=>{
        const temp = JSON.parse(window.localStorage.getItem("auth"));
        setstate(temp);
        const temp1 = JSON.parse(window.localStorage.getItem("token"));
        setcookiestate(temp1);
    },[]);

    

    axios.interceptors.response.use(
        function (response) {
        
        return response;
      }, async function (error) {
        
        let res = error.response;                                                                     //axios.interceptors(seek git help)
        if(res.status === 401 && res.config && !res.config.__isRetryRequest){
            
            window.localStorage.removeItem('auth');
            window.localStorage.removeItem('token');

            setstate(null);

            await axios.get(`/logout`);
        }

        
      });
    
    return (
            
            <UserContext.Provider value={ {'state1' : [state,setstate],'cookies':[cookiestate,setcookiestate] }}>{children}</UserContext.Provider>
            
    )

}
export  {UserContext,UserProvider};