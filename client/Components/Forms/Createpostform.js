import dynamic from "next/dynamic";
const ReactQuill = dynamic(()=>import("react-quill"),{ssr:false});
import 'react-quill/dist/quill.snow.css'; // ES6
import {Avatar} from "antd";
import { CameraOutlined , LoadingOutlined } from "@ant-design/icons";
import {Button} from "antd";



function CreatePost({content,setcontent,contentextract,handleImage,loading,image}) {
    return(
    <>
        <div className="card ">
            <div className="card-body pb-1">
                <div className="form-groop">
                    <ReactQuill theme="bubble"  onChange={(e)=>{setcontent(e)}} value={content} /> 
                </div>
            </div>
            
            <div className="card-footer d-flex justify-content-between text-muted">
                {content==="" && (<Button type="primary" className="btn btn-primary mt-1 mb-1 ml-6 disabled" onClick={contentextract}>Post</Button>)}
                {content && (<Button type="primary" className="btn btn-primary mt-1 mb-1 ml-6 " onClick={contentextract}>Post</Button>)}
                <label className="mt-3 ">
                    {image && image.url ? (<Avatar size={30} src={image.url}/>) : loading ? (<LoadingOutlined/>) : (<CameraOutlined/>)}
                    <input onChange={handleImage} type="file" accept="images/*" hidden/>
                </label>
            </div>
        </div>
    </>)
};

export default CreatePost;