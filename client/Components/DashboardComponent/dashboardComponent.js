
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
                    <div className="card-footer" style={{fontStyle:"italic",}}>
                        <div className="d-flex justify-content-between">
                            <span className="ffont">Following : {state.following? + state.following.length  : ""}</span>
                            <span className="ffont">Followers : {state.followers? + state.followers.length  : ""}</span> 
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>)
    )
};

export default DashBoardComponent;