import { createContext, useState, useContext, ReactNode, useEffect } from "react"; // Importera nödvändiga moduler
import { User, RegisterCredentials, LoginCredentials, AuthResponse, AuthContextType } from "../types/auth.types"; // Importera nödvändiga typer

// Skapa en kontext för autentisering
const AuthContext = createContext<AuthContextType | null>(null);

const URL = "https://fordjupad-frontend-projekt-api.onrender.com/api/auth"; // URL till API

// Interface för autentiseringskontextens provider
export interface AuthProviderProps {
    children: ReactNode
}

// Funktion för att skapa en autentiseringsprovider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    // States
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    // Funktion för att registrera en användare
    const register = async (credentials: RegisterCredentials) => {
        setLoading(true); // Sätt loading till true
        try {
            // Gör ett anrop till API:et för att registrera användaren
            const res = await fetch(`${URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            // Kasta ett fel om registreringen misslyckades
            if (!res.ok) {
                const errorData = await res.json(); // Hämta felmeddelandet från svaret
                throw new Error(errorData.message || "Registreringen misslyckades. Försök igen.");
            }
        }
        catch (error) {
            throw error; // Kasta ett fel om något gick fel
        } finally {
            setLoading(false); // Sätt loading till false
        }
    }

    // Funktion för att logga in
    const login = async (credentials: LoginCredentials) => {
        setLoading(true); // Sätt loading till true
        try {
            // Gör ett anrop till API:et för att logga in
            const res = await fetch(`${URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            // Kasta ett fel om inloggningen misslyckades
            if (!res.ok) {
                throw new Error("Inloggningen misslyckades");
            }

            // Konvertera svaret till JSON
            const data: AuthResponse = await res.json();

            // Spara användaren i staten och token i localStorage
            setUser(data.user);
            localStorage.setItem("token", data.token);
        }
        catch (error) {
            throw error; // Kasta ett fel om något gick fel
        } finally {
            setLoading(false); // Sätt loading till false
        }
    }

    // Funktion för att logga ut
    const logout = () => {
        // Ta bort användaren och token från state och localStorage
        setUser(null);
        localStorage.removeItem("token");
    };

    // Validera token
    const checkToken = async () => {
        setLoading(true); // Sätt loading till true

        // Hämta token från localStorage
        const token = localStorage.getItem("token");

        // Kontrollera om token finns
        if (!token) {
            setLoading(false); // Sätt loading till false
            return; // Avsluta funktionen om token saknas
        }

        try {
            // Gör ett anrop till API:et för att validera token
            const res = await fetch(`${URL}/checkToken`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Skicka med token
                }
            });

            // Kontrollera om token är giltig
            if (res.ok) {
                const data = await res.json(); // Konvertera svaret till JSON
                setUser(data.user); // Spara användaren i state
            }

        } catch (error) {
            localStorage.removeItem("token"); // Ta bort token om valideringen misslyckades
            setUser(null); // Ta bort användaren från state
        } finally {
            setLoading(false); // Sätt loading till false
        }
    };

    // Kör checkToken när komponenten renderas
    useEffect(() => {
        checkToken();
    }, []);

    // Returnera autentiseringskontexten
    return (
        // Användaren och funktionerna för inloggning och utloggning skickas som värde till kontexten
        <AuthContext.Provider value={{ user, register, login, logout, loading }}>
            {children} {/* Rendera barnkomponenter */}
        </AuthContext.Provider>
    );
}

// Hook för att använda autentiseringskontexten
export const useAuth = (): AuthContextType => {

    // Hämta autentiseringskontexten
    const context = useContext(AuthContext);

    // Kasta ett fel om kontexten inte hittades
    if (!context) {
        throw new Error("useAuth måste användas inuti en AuthProvider");
    }

    return context; // Returnera kontexten
}


