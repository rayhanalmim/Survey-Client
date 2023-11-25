import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from 'prop-types';
import './navLink.css';
import { AuthContext } from "../../Authentication/AuthProvider";

const Navbar = ({toggleMode}) => {
    const { user, logOut, looding } = useContext(AuthContext);

    if (looding) {
        return <div className="flex justify-center"><span className="loading loading-spinner loading-md"></span></div>;
    }

    const navLink = <>
        <li className=''><NavLink to='/'>Home</NavLink></li>
        <li className=''><NavLink to='/surveys'>Survey</NavLink></li>
        <li className=''><NavLink to='/upgrade'>Upgrade to PRO</NavLink></li>
        
    </>

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.error('log Out successfully', {
                    position: "top-left",
                    theme: "dark",
                });
            })
            .catch(error => {
                const errorMessage = error.message;
                console.error(errorMessage);
                toast.error(errorMessage, {
                    position: "top-left",
                    theme: "dark",
                });
            })
    }

    return (
        <div className='navbar pb-2 bg-[#D6FFB7]'>
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow   rounded-box w-52`}>
                        {navLink}
                    </ul>
                </div>
                <div className="flex gap-3">
                    <img className="w-24 xl:w-40" src="https://i.ibb.co/F05hTwh/Ordnance-Survey-Logo-700x171.png" alt="" />
                    <div className="flex justify-center items-center">
                    <h3 className="font-bold text-2xl xl:text-3xl hidden md:block">Survey-Sphere</h3>
                    </div>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLink}
                </ul>
            </div>
            <div className="navbar-end">
            <button onClick={toggleMode} className={`mode-toggle ${user ? 'pr-2 lg:pr-0' : 'pr-5'}`}>

                </button>
                <div className="hidden md:block">
                    {
                        user && <a className="btn btn-ghost normal-case text-xl">{user.displayName}</a>
                    }
                </div>
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar mr-2">
                    <div className="w-10 rounded-full">
                        {
                            user ? <img src={user.photoURL} alt="" /> : <img src="https://i.ibb.co/v1FKW31/user.png" alt="" />
                        }
                    </div>
                </label>
                {
                    user ? <Link onClick={handleLogOut} className={`btn w-28 btn-outline btn-sm`}>Logout</Link> : <Link to='/login' className={`btn w-28 btn-outline btn-sm`}>Login</Link>
                }
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};
Navbar.propTypes = {
    toggleMode: PropTypes.func,
};
export default Navbar;