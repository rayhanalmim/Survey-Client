import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../Component/HomePage/Home";
import Surveys from "../Component/Surveys/Surveys";
import UpgradePro from "../Component/MemberShip/UpgradePro";

const Route = createBrowserRouter([
    {
        path:'/',
        element:<Root></Root>,
        children: [
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'surveys',
                element:<Surveys></Surveys>
            },
            {
                path:'upgrade',
                element:<UpgradePro></UpgradePro>
            }
        ]
    }
])

export default Route;