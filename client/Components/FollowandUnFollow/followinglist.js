import React from "react";
import{List,Avatar,Button} from "antd";

function FollowingList({fpeople,haveImage,handleUnFollow}) {
    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body" style={{paddingRight:"35px",}}>
                                <List className="sm"
                                    itemLayout="horizontal"
                                    dataSource={fpeople}
                                    renderItem={(user) => (
                                    <List.Item>
                                        <List.Item.Meta
                                        avatar={<Avatar shape="square" size="large" src={haveImage(user)} />}
                                        title={<div className="d-flex justify-content-between py-2">
                                                <div>{user.name}</div>
                                                <Button type="primary" style={{cursor:"pointer",backgroundColor:"#B19CD9",border:"#B19CD9"}} onClick={()=>handleUnFollow(user)} >UnFollow</Button>
                                            </div>
                                            }
                                        
                                        />
                                    </List.Item>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    );
};

export default FollowingList;