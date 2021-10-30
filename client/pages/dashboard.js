import Autherntication from "../Components/Authenication/authfile";

function Dashboard() {
    window.localStorage.removeItem("update"); //for update removal
    return (
        (
        <Autherntication>
            <div className = "row">
                <div className="col">
                    <h1 className="display-5 text-center p-5">DashBoard</h1>             {/*Header */}
                </div>
            </div>
        </Autherntication>
            )
        );
};

export default Dashboard;