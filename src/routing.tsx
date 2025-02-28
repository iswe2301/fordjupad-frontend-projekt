import { createBrowserRouter } from "react-router-dom"; // Importera createBrowserRouter
import HomePage from "./pages/HomePage"; // Importera HomePage
import LoginPage from "./pages/LoginPage"; // Importera LoginPage
import ProfilePage from "./pages/ProfilePage"; // Importera ProfilePage
import Layout from "./components/Layout"; // Importera Layout
import ProtectedRoute from "./components/ProtectedRoute";

// Skapa en router för webbplatsens sidor
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />, // Använd Layout som layout för sidorna
        children: [ // Lägg till sidor som barn till layouten
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/logga-in",
                element: <LoginPage />
            },
            {
                path: "/mina-sidor",
                element: (
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                )
            }
        ]
    }
]);

// Exportera routern
export default router;