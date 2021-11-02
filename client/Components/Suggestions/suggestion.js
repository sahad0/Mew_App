import{List,Avatar} from "antd";
import axios from "axios";




function Suggestions({people}) {
    

    const haveImage=(user)=>{
        if(user.image){
            return user.image.url;
        }
        else{
            return "./images/avatar.jpg";
        }
        
    }

    async function handleFollow(user){
        try {
            const follow = await axios.put("/followhandle",{_id:user._id});
            window.localStorage.setItem("auth",JSON.stringify(follow.data.add));
            
        } catch (error) {
            console.log(error);
        }
        
    }

    return (
        <>
        <div className="card">
            <div className="card-body" style={{paddingRight:"35px",}}>
                <List className="sm"
                    itemLayout="horizontal"
                    dataSource={people}
                    renderItem={(user) => (
                    <List.Item>
                        <List.Item.Meta
                        avatar={<Avatar shape="square" size="large" src={haveImage(user)} />}
                        title={<div className="d-flex justify-content-between py-2">
                                <div>{user.name}</div>
                                <div style={{cursor:"pointer"}} onClick={()=>handleFollow(user)}  >Follow</div>
                            </div>
                            }
                        
                        />
                    </List.Item>
                    )}
                />
            </div>
        </div>
        </>
    )
};

export default Suggestions;