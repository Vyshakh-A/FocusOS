import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function PrivateRoute({ children }) {
    const { token } = useAuth();

    if (!token) return <Navigate to="/" replace />;

    return children;
}