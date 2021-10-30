import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import UpdatePost from "../../Components/Forms/Updatepost";
import Autherntication from "../../Components/Authenication/authfile";


function EditPost() {
    const router = useRouter();

    const[editpost,seteditpost] = useState([]);         //from fetch

    const [content,setcontent] = useState("");          //contents
    const [image,setImage] = useState({                 //for image
        url:"",
        public_id: "",
    });
    const [loading,setLoading] = useState(false);       //loading
    const [postedby,setPostedby] = useState("");        //postedby



    useEffect(()=>{
        fetcheditpost();                                //mount fn
        
    },[]);


   


    useEffect(()=>{
        if(content === "<p><br></p>"){              //disable button when no contents on riche text editor
            setcontent("");
        }
    },[content]);


   




    async function fetcheditpost(){
        if(router.query._id!==undefined){
            window.localStorage.setItem("update",router.query._id); //special localstorage id for refresh failures
        }
        try{
            console.log(router);
            const {data} = await axios.get(`/editpost/${window.localStorage.getItem("update")}`);
            setcontent(data.contents);
            setImage({
                url:data.image.url,
                public_id:data.image.public_id,
            });
            seteditpost(data);
            setPostedby(data.postedBy);
           
        }
        catch(err){
            toast.error("Unauthorized");
        }
    }


    async function handleImage(e){

        const files = e.target.files[0];
        let formData = new FormData();
        formData.append("image",files);
        setLoading(true);

        try{
            const imageupload = await axios.post("/imageUpload",formData);
            setImage({
                url : imageupload.data.url,
                public_id : imageupload.data.public_id,
            });
            setLoading(false);
        }

        catch(err){
            setLoading(false);
            toast.error("Image updload Failed!Check with the Dev!");
        }

    }

    async function savechanges(e){
        e.preventDefault();
        try{
            
            
            const datas = {content,image};
            const updated = await axios.put(`/editsaved/${window.localStorage.getItem("update")}`,datas);
            if(updated){
                toast.success("Update Successfull!");
                router.push("/newsfeed");
            }
            
        }
        catch(err){
            toast.error("File Size too Big!");
        }
    }



    return (
    <>
        <Autherntication>
            <div className="editPost">
                <UpdatePost setcontent={setcontent} savechanges={savechanges} image={image} loading={loading} handleImage={handleImage} content={content}/>
            </div>
        </Autherntication>
    </>
    )
};

export default EditPost;
