import {Input,Button,SendOutlined } from "antd";

function Profile() {
    return (
    <>
        <div className="container">

            <div className="col">
                <h1 className="display-5 text-center p-5">Profile</h1>             {/*Header */}
            </div>

            <div className="row" >
                <div className="col-md-6">
                    <div className="card" style={{borderRadius:"8px",}}  >
                        <div className="card-body">
                            <Input size="large" className=" my-2" placeholder="UserID"/>
                            <Input size="large" className=" my-2" placeholder="Name"/>
                            <Input size="large" className=" my-2" placeholder="Email" disabled/>
                            <Input size="large" className=" my-2" placeholder="Password"/>
                            <Input size="large" className=" my-2" placeholder="About Me"/>
                            <Button type="primary" style={{backgroundColor:"#5CB85C",border:"#5CB85C"}} className="my-3"> Save</Button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <img  src="./images/straw1.png" style={{marginLeft:"40%",position:"relative",width:"70%",height:"95%",}} />
                </div>
            </div>
        </div>
    </>
    )
};

export default Profile;