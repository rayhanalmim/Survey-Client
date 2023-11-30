import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { AuthContext } from "../Authentication/AuthProvider";

const PrivateRoute = ({children}) => {
    const {user, looding} = useContext(AuthContext);
    const location = useLocation();

    if (looding) {
        return <div className="flex justify-center"><span className="loading loading-spinner loading-md"></span></div>;
    }
    

    if(user){
        return children;
    }

    return <Navigate state={location.pathname} to="/login"></Navigate>;
};

PrivateRoute.propTypes ={
    children: PropTypes.node,
}

export default PrivateRoute;