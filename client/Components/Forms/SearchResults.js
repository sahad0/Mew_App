import { List, Avatar ,Button} from 'antd';


function SearchResults({showSearch,results,haveImage,checkStatus}) {

    if(showSearch){

        return (
            <>
            <div className="col-md-4" style={{height:"0px",}}>
                <div className="card-body" style={{overflowY:"scroll",height:"330px",scrollbarWidth:"none",zIndex:"1",}}>
                    <List className="sm" style={{backgroundColor:"white",}}
                        itemLayout="horizontal"
                        dataSource={results}
                        renderItem={(user) => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={<Avatar shape="square" size="large" src={haveImage(user)} />}
                            title={<div className="d-flex justify-content-between py-2">
                                    <div style={{fontStyle:"italic"}}>{user.name}</div>
                                    <Button type="primary" style={{cursor:"pointer",backgroundColor:"#B19CD9",border:"#B19CD9"}}>{checkStatus(user)}</Button>
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
    }
    else{
        return <div> </div>
    }
   
    
};

export default SearchResults;