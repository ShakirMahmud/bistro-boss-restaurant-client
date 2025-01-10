import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import Loading from "../pages/Loading";

const AdminRoute = ({children}) => {
    const { user, loading } = useAuth();
    const [isAdmin, refetch, isAdminLoading] = useAdmin();
    const location = useLocation();
    if(loading || isAdminLoading){
        return <Loading/>
    }
    if(user && user?.email && isAdmin){
        return children;
    }
    return <Navigate state={location.pathname} to={'/'}></Navigate>
};

export default AdminRoute;