import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


function allComments() {

    const router = useRouter();

    const[pId,setPid] = useState("");
    const[post,setPost] = useState([]);




    useEffect(()=>{
        Post();
       
    },[]);

    



    async function Post(){
        const postId = router.query._id;

        if(postId !== undefined){
            window.localStorage.setItem("comment",postId);
            setPid(postId);
        }
        try{
            const val = await axios.post("/commentPosts",{cd : window.localStorage.getItem("comment")});
            setPost(val.data);
        }
        catch(err){
            toast.error("Not Authorised!");
        }


        
    }



    async function FetchedPost(){
        
    }


    return (
        <>
            <div>Hello</div>
        </>
    );
};

export default allComments;