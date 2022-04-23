import { Navigate, useLocation } from "react-router";
import { useAuthContext } from "../../contexts/auth-context";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { user } = useAuthContext();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children;
}