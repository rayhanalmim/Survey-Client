import { Outlet } from "react-router-dom";
import Navbar from "../SharedComponent/Navbar/Navbar";

const Root = () => {
    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;