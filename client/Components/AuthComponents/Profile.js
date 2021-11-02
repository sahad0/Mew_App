import {Input,Button} from "antd";

function ProfilePage({setID,id,name,setName,email,setAbout,about,saveProfile}) {
    const { TextArea } = Input;
    return(<>
        <div className="container">

        <div className="col">
            <h1 className="display-5 text-center p-5">Profile</h1>             {/*Header */}
        </div>

        <div className="row" >
            <div className="col-md-6" >
                <div className="card" style={{borderRadius:"8px",}}  >
                    <div className="card-body">
                        <Input size="large" className=" my-1" style={{fontStyle:"italic",}} placeholder="UserID" onChange={(e)=>{setID(e.target.value)}} value={id} />
                        <Input size="large" className=" my-1" style={{fontStyle:"italic",}} placeholder="Name" onChange={(e)=>{setName(e.target.value)}} value={name}/>
                        <Input size="large" className=" my-1" style={{fontStyle:"italic",}} placeholder="Email" disabled value={email}/>
                        
                        <TextArea rows={8} className=" my-1" placeholder="About Me" style={{resize:"none",}} onChange={(e)=>{setAbout(e.target.value)}} value={about}/>
                        <span>
                            <Button type="primary"  style={{backgroundColor:"#5CB85C",border:"#5CB85C",fontStyle:"italic"}} className="my-3" onClick={saveProfile}> Save</Button>
                            <Button type="primary"  className="my-3 mx-2" style={{backgroundColor:"#A020F0",border:"#A020F0",fontStyle:"italic",}} >Update Password</Button>
                        </span>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <img  src="./images/straw1.png" style={{marginLeft:"40%",position:"relative",width:"70%",height:"95%",}} />
            </div>
        </div>
        </div>
    </>);
};

export default ProfilePage;