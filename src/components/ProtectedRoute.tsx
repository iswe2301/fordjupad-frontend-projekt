import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

// Interface för props till ProtectedRoute
interface ProtectedRouteProps {
    children: ReactNode
}

// Komponent för skyddade rutter
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {

    // Hämta autentiseringskontexten
    const { user } = useAuth();

    // Kontrollera om användaren inte är inloggad
    if (!user) {
        return <Navigate to="/logga-in" replace /> // Ersätter den aktuella URL:en med /logga-in
    }

    return <>{children}</> // Rendera barnkomponenter
}

export default ProtectedRoute;