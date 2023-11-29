import { FaHome } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import './navLink.css';
import { BiSolidGroup } from "react-icons/bi";
import { RiBarChartGroupedLine } from "react-icons/ri";
import useUserRole from "../../Hook/useUserRole";

const DashNavBar = () => {
    const [userFromDb] = useUserRole()
    console.log(userFromDb)
    return (
        <div className="pl-5 pt-4 min-h-screen z-50">
            {
                userFromDb.role === 'Admin' && <ul className="space-y-2 pb-2">
                    <div className="w-11/12">
                <NavLink className='' to='/dashboard/adminhome'><li className="border-2 bg-gray-200 tracking-widest  px-4 py-1 p-2 rounded-md" to="/dashboard/temp"><FaHome className="inline-block pr-1 text-2xl"></FaHome>Admin Home</li></NavLink>
                </div>

                <div className="w-11/12">
                <NavLink className='' to='/dashboard/member'><li className="border-2 bg-gray-200 tracking-widest px-4 py-1 p-2 rounded-md" to="/dashboard/temp"><BiSolidGroup className="inline-block pr-1 text-2xl"></BiSolidGroup>Pro Member</li></NavLink>
                </div>

                <div className="w-11/12">
                <NavLink className='' to='/dashboard/manageusers'><li className="border-2 bg-gray-200 tracking-widest px-4 py-1 p-2 rounded-md" to="/dashboard/temp"><GrGroup className="inline-block pr-1 text-2xl"></GrGroup>Manage Users</li></NavLink>
                </div>

                {/* --------------------adminRes----------- */}
                <div className="w-11/12">
                <NavLink className='' to='/dashboard/survey'><li className="border-2 bg-gray-200 tracking-widest px-4 py-1 p-2 rounded-md" to="/dashboard/temp"><RiBarChartGroupedLine className="inline-block pr-1 text-2xl"></RiBarChartGroupedLine>Survey Response</li></NavLink>
                </div>
                </ul>
            }
            <ul className="space-y-2">

                <div className="w-11/12">
                <NavLink className='' to='/dashboard/create'><li className="border-2 bg-gray-200 tracking-widest px-4 py-1 p-2 rounded-md"><FaHome className="inline-block pr-1 text-2xl"></FaHome>Create Survey</li></NavLink>
                </div>

                <div className="w-11/12">
                <NavLink className='' to='/dashboard/mypostedsurvey'><li className="border-2 bg-gray-200 tracking-widest px-4 py-1 p-2 rounded-md" ><FaHome className="inline-block pr-1 text-2xl"></FaHome>My Posted Survey</li></NavLink>
                </div>

                {/* ----------------------userRes----------------------- */}
                <div className="w-11/12">
                <NavLink className='' to='/dashboard/response'><li className="border-2 bg-gray-200 tracking-widest px-4 py-1 p-2 rounded-md" ><FaHome className="inline-block pr-1 text-2xl"></FaHome>Survey Response</li></NavLink>
                </div>

                <div className="divider w-11/12"></div>
                
                <div className="w-11/12">
                <NavLink className='' to='/'><li className="border-2 bg-gray-200 tracking-widest px-4 py-1 p-2 rounded-md" to="/"><FaHome className="inline-block pr-1 text-2xl"></FaHome>Back to Home</li></NavLink>
                </div>
                

            </ul>
        </div>
    );
};

export default DashNavBar;