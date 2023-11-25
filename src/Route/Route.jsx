import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../Component/HomePage/Home";
import Surveys from "../Component/Surveys/Surveys";
import UpgradePro from "../Component/MemberShip/UpgradePro";
import SurveyDetails from "../Component/Surveys/SurveyDetails";
import SingIn from "../Authentication/SingIn";
import SingUp from "../Authentication/SingUp";

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
            },
            {
                path:'details/:id',
                element:<SurveyDetails></SurveyDetails>
            },
            {
                path:'login',
                element:<SingIn></SingIn>
            },
            {
                path:'registration',
                element:<SingUp></SingUp>
            }
        ]
    }
])

export default Route;