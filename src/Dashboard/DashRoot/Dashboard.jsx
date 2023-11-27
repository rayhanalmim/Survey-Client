import { Outlet } from "react-router-dom";
import DashNavBar from "./DashNavBar";

const Dashboard = () => {
    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/5 bg-lime-200">
                <DashNavBar></DashNavBar>
            </div>
            <div className="flex-1 bg-[#F5FF90]">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;