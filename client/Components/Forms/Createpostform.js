import dynamic from "next/dynamic";
const ReactQuill = dynamic(()=>import("react-quill"),{ssr:false});
import 'react-quill/dist/quill.snow.css'; // ES6
import {Avatar} from "antd";
import { CameraOutlined , LoadingOutlined, SendOutlined } from "@ant-design/icons";
import {Button} from "antd";



function CreatePost({content,setcontent,contentextract,handleImage,loading,image,teditor,showteditor}) {
    return(
        

    <>
        {teditor ?
        
            (<div className="card ">
                <div className="card-body pb-1">
                    <div className="form-groop" style={{height:"150px",}}>
                        <ReactQuill theme="bubble"  onChange={(e)=>{setcontent(e)}} value={content} /> 
                    </div>
                </div>
                
                <div className="card-footer d-flex justify-content-between text-muted">
                    {content==="" && (
                    <>
                    <span >
                        <Button type="primary" disabled className="btn btn-primary mt-1 mb-1 ml-6 disabled" onClick={contentextract}>Post</Button> 	
                        <Button className="btn  mt-1 mb-1 ml-6 mx-2"  onClick={()=>{showteditor(false)}}>Cancel</Button>
                    </span>
                    
                    
                    
                    </>
                    )}
                    {content && 
                    (
                    <>
                        <span>
                            <Button type="primary" className="btn btn-primary mt-1 mb-1 ml-6 " onClick={contentextract}>Post</Button>
                            <Button className="btn  mt-1 mb-1 ml-6 mx-2" onClick={()=>{showteditor(false)}}>Cancel</Button>
                        </span>
                        
                    </>
                    )}
                    
                    <label className="mt-3 ">
                        {image && image.url ? (<Avatar size={30} src={image.url}/>) : loading ? (<LoadingOutlined/>) : (<CameraOutlined/>)}
                        <input onChange={handleImage} type="file" accept="images/*" hidden/>
                    </label>
                </div>
            </div>):
            <div><Button  onClick={()=>showteditor(true)} >Create &nbsp;	<SendOutlined style={{paddingBottom:"5px",}}/></Button></div>}
            
             
            
        
    </>)
};

export default CreatePost;