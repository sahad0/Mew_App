import {Input} from "antd";
import {Button} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import SearchResults from "./SearchResults";
import axios from "axios";
import { UserContext } from "../../context";

function SearchForm() {
    
    const [cookiestate,setcookiestate] = useContext(UserContext)['cookies'];
    const [searchName,setSearchName] = useState("");
    const [showSearch,setShowSearch] = useState(false);
    const [results,setResults] = useState([]);

    useEffect(()=>{
        showSearch ? fetchSearch() : "";
    },[showSearch]);
    useEffect(()=>{
        
            setShowSearch(false);
            setResults([]);
    },[searchName])


    async function fetchSearch(){
        try {
            
            const {data} = await axios.post("/fetchSearch",{searchName:searchName});
            if(data){
                setResults(data);
            }
            
            
        } 
        catch (err) {
            console.log(err);
        }
        
    }
    const haveImage=(user)=>{
        if(user.image){
            return user.image.url;
        }
        else{
            return "./images/avatar.jpg";
        }
        
    }
    function checkStatus(user){
        if(user.followers.includes(cookiestate)){
            return "Unfollow";
        }
        else{
            return "Follow";
        }
    }

    return(
        
        <>
            <div className="row">
                <div className="col-md-4" >   <Input style={{width:"100%",}} onChange={(e)=>{setSearchName(e.target.value)}} /></div> 
                <div className="col-md-1"> <Button type="primary" onClick={()=>{setShowSearch(true)}} shape="circle" size="middle" icon={<SearchOutlined />} /> </div>
            </div>
            <SearchResults showSearch={showSearch} haveImage={haveImage} results={results} checkStatus={checkStatus}/>
        </>


        

        
            
        
        
    )
};

export default SearchForm;