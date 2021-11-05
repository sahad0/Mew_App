import {Input} from "antd";

function Loginform({loginfunction,setLoginemail,setLoginpass,loginemail,loginpass,Button}) {
    return (
        <>
        <div className = "container">
            
            <div className = "row">
                <div className="col">
                    <h1 className="display-5  py-3 mt-3 ml-5"> Login Page </h1>    {/*Header */}
                </div>
            </div>

            <div className="row">   {/*Input fields*/}
                <div className="col-md-6 ">
                    <form onSubmit={loginfunction}>
                        <Input size="large" placeholder="Email" type="text" className="mt-2 col-sm-12"      onChange={(e)=>{setLoginemail(e.target.value)}}    value={loginemail}/>
                        <Input size="large" placeholder="Password" type="text" className="mt-2 col-sm-12"  type="password"    onChange={(e)=>{setLoginpass(e.target.value)}}   value={loginpass}/>
                
                        <br/><Button variant="contained" color="primary" type="submit"  className="mt-4"> Login </Button>
                    </form>
                           
                        
                    
                </div>
                <div className="col-md-4">
                    <img className=" candyimg img-responsive " draggable="false" src="./images/Screenshot_4.png" />
                    <figure className="text-end">
                        <blockquote className="blockquote">
                            <p>A well-known quote, contained in a blockquote element.</p>
                        </blockquote>
                        <figcaption className="blockquote-footer">
                            Someone famous in <cite title="Source Title">Source Title</cite>
                        </figcaption>
                    </figure>


                </div>
            </div>


        </div>
        </>
    )
};

export default Loginform;