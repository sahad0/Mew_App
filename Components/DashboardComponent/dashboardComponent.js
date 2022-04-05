import {UserOutlined,UsergroupAddOutlined,AliwangwangOutlined,HomeOutlined} from "@ant-design/icons";
import Link from "next/link";


function DashBoardComponent({img,state,handleImage}) {
    
    

    return (
        state &&
    (<div className="container" >

        <div className="row d-flex ">
            <div className="col-md-4">
                <div className="card dashcard"   >

                    <label className="card-header cardbdy"style={{
                        backgroundPosition:"center center",
                        backgroundImage:"url(" + img  + ")",
                        backgroundSize:"cover",
                        backgroundRepeat:"no-repeat",
                        height:"400px",}}>   
                        <input type="file"accept="images/*"  hidden onChange={handleImage}/>
                    </label>

                    <div className="card-body ">
                        <h1 className="display-6 text-center" style={{height:"25px",}}>{state ? state.name : ""}</h1>
                        <p className="text-center">{state.about? state.about:""}</p>
                    </div>
                    
                </div>
            </div>
            <div className="col-md-3"> </div>

            <div className="col-md-3 mt-5 " style={{height:"auto",border:"none",}}>
                <div className="card dashboardcard " style={{border:"none",}}>
                    <div className="card-body" >
                        <div className="row">
                            <div className="col-md-6">
                                <Link href="/following"><div className="div-container-1 "  style={{height:"100px",borderRadius:"3px"}}><UserOutlined style={{fontSize:"25px"}} />   <div>Following</div> </div></Link>
                                <Link href="/followers"><div className="div-container-1 my-3" style={{height:"100px",borderRadius:"3px"}}><UsergroupAddOutlined style={{fontSize:"25px"}}/><div>Followers</div></div></Link>
                            </div>
                            <div className="col-md-6">
                                <Link href="/newsfeed"><div className="div-container-1 " style={{height:"100px",borderRadius:"3px"}}><AliwangwangOutlined style={{fontSize:"25px"}} />   <div>Newsfeed</div></div></Link>
                                <Link href="/"><div className="div-container-1 my-3" style={{height:"100px",borderRadius:"3px"}}><HomeOutlined style={{fontSize:"25px"}} />   <div className="mx-2">Home</div></div></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>)
    )
};

export default DashBoardComponent;