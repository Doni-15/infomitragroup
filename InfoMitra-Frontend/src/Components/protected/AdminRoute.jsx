import { Navigate } from "react-router-dom";

export default function AdminRoute({ children, user, loading }){
    if (loading) return null; 

    if (!user) {
        return <Navigate to="/auth/sign-in" replace />;
    }

    if (user.role?.toLowerCase() !== 'admin') {
        return <Navigate to="*" replace />;
    }

    return children;
};