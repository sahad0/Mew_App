import dynamic from "next/dynamic";
const ReactQuill = dynamic(()=>import("react-quill"),{ssr:false});
import {Avatar} from "antd";
import { CameraOutlined , LoadingOutlined } from "@ant-design/icons";

function UpdatePost({setcontent,savechanges,image,loading,handleImage,content}) {
    console.log(image.url);
    return (
    <>

        <div className="card ">
            <div className="card-body pb-1">
                <div className="form-groop">
                    <ReactQuill theme="bubble"  onChange={(e)=>{setcontent(e)}} value={content} /> 
                </div>
            </div>
            
            <div className="card-footer d-flex justify-content-between text-muted">
                {content==="" && (<button  type="submit" onClick={savechanges} className="btn btn-primary mt-1 mb-1 ml-6 disabled" >Save</button>)}
                {content && (<button  type="submit" onClick={savechanges} className="btn btn-primary mt-1 mb-1 ml-6 " >Save</button>)}
                <label className="mt-3 ">
                    { image.url ? (<Avatar size={30} src={image.url}/>) : loading ? (<LoadingOutlined/>) : (<CameraOutlined/>)}
                    <input onChange={handleImage}  type="file" accept="images/*" hidden/>
                </label>
            </div>
        </div>
    </>)
};

export default UpdatePost;