import { Outlet } from "react-router-dom";
import Navbar from "../SharedComponent/Navbar/Navbar";

const Root = () => {
    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div className="">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Root;