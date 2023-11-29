import { Outlet } from "react-router-dom";
import DashNavBar from "./DashNavBar";

const Dashboard = () => {
    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-2/6 lg:w-1/4 xl:w-1/5 bg-lime-200">
                <DashNavBar></DashNavBar>
            </div>
            <div className="flex-1 md:w-4/6 bg-[#F5FF90]">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;