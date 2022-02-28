import { useEffect } from "react";

function DevSupport(){
    useEffect(()=>{
        window.localStorage.getItem("update") && window.localStorage.removeItem("update"); //for update removal
        window.localStorage.getItem("profile") && window.localStorage.removeItem("profile");
    },[]);
    return(
        <div className = "container">

            <div className = "row">
                <div className="column">
                    <h1 className="display-1 text-center py-5">Support</h1>
                </div>
            </div>

        </div>
    );
}
export default DevSupport;