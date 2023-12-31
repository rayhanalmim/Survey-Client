import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../Component/HomePage/Home";
import Surveys from "../Component/Surveys/Surveys";
import UpgradePro from "../Component/MemberShip/UpgradePro";
import SurveyDetails from "../Component/Surveys/SurveyDetails";
import SingIn from "../Authentication/SingIn";
import SingUp from "../Authentication/SingUp";
import Dashboard from "../Dashboard/DashRoot/Dashboard";
import AdminHome from "../Dashboard/DashboardChildren/Admin/AdminHome";
import ProMember from "../Dashboard/DashboardChildren/Admin/ProMember";
import ManageUser from "../Dashboard/DashboardChildren/Admin/ManageUser";
import ManageSurvey from "../Dashboard/DashboardChildren/Admin/ManageSurvey";
import CreateSurvey from "../Dashboard/DashboardChildren/Surveyor/CreateSurvey";
import MyPostedSurvey from "../Dashboard/DashboardChildren/Surveyor/MyPostedSurvey";
import SurveysResponse from "../Dashboard/DashboardChildren/Surveyor/SurveysResponse";
import UpdateSurvey from "../Dashboard/DashboardChildren/Surveyor/UpdateSurvey";
import ErrorPage from "./ErrorPage";
import PrivateRoute from "./PrivateRoute";

const Route = createBrowserRouter([
    {
        path:'/',
        element:<Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
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
                element: <PrivateRoute><SurveyDetails></SurveyDetails></PrivateRoute>
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
    },
    {
        path:'dashboard',
        element:<Dashboard></Dashboard>,
        children: [
            {
                path:'adminhome',
                element: <AdminHome></AdminHome>
            },
            {
                path:'member',
                element:<ProMember></ProMember>
            },
            {
                path:'manageusers',
                element:<ManageUser></ManageUser>
            },
            {
                path:'survey',
                element:<ManageSurvey></ManageSurvey>
            },
            {
                path:'create',
                element: <CreateSurvey></CreateSurvey>
            },
            {
                path:'mypostedsurvey',
                element: <MyPostedSurvey></MyPostedSurvey>
            },
            {
                path:'response',
                element: <SurveysResponse></SurveysResponse>
            },
            {
                path:'/dashboard/mypostedsurvey/:id',
                element:<UpdateSurvey></UpdateSurvey>
            }
        ]
    }
])

export default Route;