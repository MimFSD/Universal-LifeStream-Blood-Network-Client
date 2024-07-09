import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({children}) => {
    const {user, loading} = useAuth();

    if(loading){
        return <p className="text-center mt-12"><span className="loading loading-spinner loading-lg"></span></p> 
    }

    if(user){
        return children;
    }

    return <Navigate to="/sign_in"></Navigate>
};

export default ProtectedRoute;